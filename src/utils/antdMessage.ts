import { message as staticMessage } from 'antd';
import type { MessageInstance } from 'antd/es/message/interface';

let messageApi: MessageInstance = staticMessage;

export const setGlobalMessageApi = (api: MessageInstance): void => {
  messageApi = api;
};

export const message = {
  success: (...args: Parameters<MessageInstance['success']>) => messageApi.success(...args),
  error: (...args: Parameters<MessageInstance['error']>) => messageApi.error(...args),
  info: (...args: Parameters<MessageInstance['info']>) => messageApi.info(...args),
  warning: (...args: Parameters<MessageInstance['warning']>) => messageApi.warning(...args),
  loading: (...args: Parameters<MessageInstance['loading']>) => messageApi.loading(...args),
  open: (...args: Parameters<MessageInstance['open']>) => messageApi.open(...args),
};

export default message;
