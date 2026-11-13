import React, { useState, useRef } from 'react';
import { Button, Tooltip, Progress, Tag } from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileZipOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  DeleteOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import { renderInputWrapper } from './AppInput';

export interface AppUploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  formattedSize: string;
  progress?: number;
  status: 'uploading' | 'done' | 'error';
  errorMessage?: string;
  file?: File;
  previewUrl?: string;
}

export interface FileInputProps {
  /**
   * Field label displayed above the file input
   */
  label?: React.ReactNode;

  /**
   * Required field asterisk (*)
   */
  required?: boolean;

  /**
   * Helper text or validation message displayed below
   */
  helperText?: React.ReactNode;

  /**
   * Tooltip icon with informative message
   */
  tooltip?: React.ReactNode;

  /**
   * Accepted file extensions or MIME types (e.g. '.pdf,.png,.jpg' or 'image/*')
   */
  accept?: string;

  /**
   * Maximum allowed file size per file in megabytes (e.g. 5 or 10)
   */
  maxSizeMB?: number;

  /**
   * Maximum number of files allowed
   */
  maxCount?: number;

  /**
   * Allows selecting and uploading multiple files at once
   */
  multiple?: boolean;

  /**
   * Renders an interactive drag-and-drop dropzone instead of a simple button
   */
  dragger?: boolean;

  /**
   * Button text when dragger is false
   */
  buttonText?: React.ReactNode;

  /**
   * Dropzone main headline text
   */
  draggerTitle?: React.ReactNode;

  /**
   * Dropzone description text
   */
  draggerSubtitle?: React.ReactNode;

  /**
   * Controlled array of uploaded files
   */
  value?: AppUploadedFile[];

  /**
   * Default initial files list
   */
  defaultValue?: AppUploadedFile[];

  /**
   * Callback fired when files are added or removed
   */
  onChange?: (files: AppUploadedFile[]) => void;

  /**
   * Callback fired when a file fails validation
   */
  onError?: (errorMessage: string) => void;

  /**
   * Whether to display the uploaded file preview cards
   */
  showFileList?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Outer container style
   */
  containerStyle?: React.CSSProperties;

  /**
   * Outer container class name
   */
  containerClassName?: string;
}

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') {
    return <FilePdfOutlined style={{ color: '#ef4444', fontSize: 22 }} />;
  }
  if (['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'bmp'].includes(ext || '')) {
    return <FileImageOutlined style={{ color: '#10b981', fontSize: 22 }} />;
  }
  if (['zip', 'rar', 'tar', 'gz', '7z'].includes(ext || '')) {
    return <FileZipOutlined style={{ color: '#f59e0b', fontSize: 22 }} />;
  }
  if (['doc', 'docx'].includes(ext || '')) {
    return <FileWordOutlined style={{ color: '#2563eb', fontSize: 22 }} />;
  }
  if (['xls', 'xlsx', 'csv'].includes(ext || '')) {
    return <FileExcelOutlined style={{ color: '#059669', fontSize: 22 }} />;
  }
  return <FileOutlined style={{ color: '#1677ff', fontSize: 22 }} />;
};

/**
 * Enterprise File & Document Upload Component
 *
 * Supports:
 * - Single and Multiple file upload (`multiple={true}`)
 * - Drag & Drop dropzone or sleek Button trigger
 * - Client-side size & type verification
 * - Interactive file queue cards with type icons, preview thumbnails, and delete actions
 */
export const FileInput: React.FC<FileInputProps> = ({
  label,
  required,
  helperText,
  tooltip,
  accept,
  maxSizeMB = 10,
  maxCount = 5,
  multiple = false,
  dragger = false,
  buttonText = 'Choose Files',
  draggerTitle = 'Click or drag files here to upload',
  draggerSubtitle = 'Supports documents, images, and archives',
  value: controlledFiles,
  defaultValue = [],
  onChange,
  onError,
  showFileList = true,
  disabled = false,
  containerStyle,
  containerClassName,
}) => {
  const [innerFiles, setInnerFiles] = useState<AppUploadedFile[]>(defaultValue);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const files = controlledFiles !== undefined ? controlledFiles : innerFiles;

  const validateAndProcessFiles = (rawFiles: FileList | null) => {
    if (!rawFiles || rawFiles.length === 0 || disabled) return;
    setErrorMessage('');

    const newFiles: AppUploadedFile[] = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < rawFiles.length; i++) {
      const file = rawFiles[i];

      // Check maxCount
      if (!multiple && (files.length > 0 || newFiles.length > 0)) {
        // Single file mode replaces existing file
      } else if (files.length + newFiles.length >= maxCount) {
        const msg = `Maximum upload limit is ${maxCount} file(s).`;
        setErrorMessage(msg);
        onError?.(msg);
        break;
      }

      // Check file size
      if (file.size > maxSizeBytes) {
        const msg = `"${file.name}" exceeds the maximum allowed size of ${maxSizeMB} MB.`;
        setErrorMessage(msg);
        onError?.(msg);
        continue;
      }

      // Check accept types if provided
      if (accept) {
        const allowedExtensions = accept
          .split(',')
          .map((ext) => ext.trim().toLowerCase());
        const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const isMimeMatch = allowedExtensions.some((ext) => {
          if (ext.endsWith('/*')) {
            const prefix = ext.replace('/*', '');
            return file.type.startsWith(prefix);
          }
          return ext === fileExt || ext === file.type;
        });

        if (!isMimeMatch) {
          const msg = `"${file.name}" has an unsupported format. Allowed: ${accept}`;
          setErrorMessage(msg);
          onError?.(msg);
          continue;
        }
      }

      const uploadedItem: AppUploadedFile = {
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        formattedSize: formatBytes(file.size),
        status: 'done',
        progress: 100,
        file,
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };

      newFiles.push(uploadedItem);
    }

    if (newFiles.length > 0) {
      const updated = multiple ? [...files, ...newFiles] : newFiles;
      if (controlledFiles === undefined) {
        setInnerFiles(updated);
      }
      onChange?.(updated);
    }
  };

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndProcessFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    validateAndProcessFiles(e.dataTransfer.files);
  };

  const handleRemove = (id: string) => {
    if (disabled) return;
    const updated = files.filter((f) => f.id !== id);
    if (controlledFiles === undefined) {
      setInnerFiles(updated);
    }
    onChange?.(updated);
  };

  const triggerClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const inputNode = (
    <div style={{ width: '100%' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={handleNativeChange}
      />

      {dragger ? (
        <div
          className={`app-file-dragger ${isDragOver ? 'drag-over' : ''}`}
          onClick={triggerClick}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
          }}
        >
          <InboxOutlined
            style={{
              fontSize: 38,
              color: 'var(--primary-color, #1677ff)',
              marginBottom: 8,
            }}
          />
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ant-color-text, #1e293b)' }}>
            {draggerTitle}
          </div>
          <div style={{ fontSize: 12, color: 'var(--ant-color-text-secondary, #64748b)', marginTop: 4 }}>
            {draggerSubtitle} • Max {maxSizeMB} MB {multiple ? '(Multiple files supported)' : '(Single file)'}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <Button
            icon={<UploadOutlined />}
            onClick={triggerClick}
            disabled={disabled}
          >
            {buttonText} {multiple ? '(Multiple)' : ''}
          </Button>
          <span style={{ fontSize: 12, color: 'var(--ant-color-text-secondary, #64748b)' }}>
            {accept ? `Formats: ${accept}` : `Max size: ${maxSizeMB} MB`}
            {multiple ? ` • Up to ${maxCount} files` : ''}
          </span>
        </div>
      )}

      {/* Validation Error Notice */}
      {errorMessage && (
        <div style={{ color: '#ef4444', fontSize: 12, marginTop: 6, fontWeight: 500 }}>
          {errorMessage}
        </div>
      )}

      {/* Uploaded Files Queue List */}
      {showFileList && files.length > 0 && (
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#94a3b8' }}>
            <span>SELECTED FILES ({files.length}{multiple ? ` / ${maxCount}` : ''})</span>
            {files.length > 1 && !disabled && (
              <Button
                type="link"
                size="small"
                danger
                onClick={() => {
                  if (controlledFiles === undefined) setInnerFiles([]);
                  onChange?.([]);
                }}
                style={{ padding: 0, height: 'auto', fontSize: 11 }}
              >
                Clear All
              </Button>
            )}
          </div>

          {files.map((file) => (
            <div key={file.id} className="app-file-preview-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
                {file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    style={{ width: 34, height: 34, borderRadius: 6, objectFit: 'cover' }}
                  />
                ) : (
                  getFileIcon(file.name)
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: 'var(--ant-color-text, #1e293b)',
                    }}
                  >
                    {file.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--ant-color-text-tertiary, #94a3b8)' }}>
                    {file.formattedSize} • <span style={{ color: '#10b981' }}>Ready to upload</span>
                  </div>
                </div>
              </div>

              {!disabled && (
                <Button
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(file.id)}
                  title="Remove file"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return renderInputWrapper(
    inputNode,
    label,
    required,
    tooltip,
    helperText,
    errorMessage ? 'error' : undefined,
    containerStyle,
    containerClassName
  );
};

export default FileInput;
