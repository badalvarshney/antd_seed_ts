/**
 * Helper to adjust hex color brightness (lighter/darker)
 * @param hex - e.g. '#673ab7'
 * @param percent - e.g. +20 for lighter, -20 for darker
 */
export const adjustColor = (hex: string, percent: number): string => {
  if (!hex || typeof hex !== 'string') return '#673ab7';
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }

  const num = parseInt(cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = ((num >> 8) & 0x00ff) + amt;
  let B = (num & 0x0000ff) + amt;

  R = R < 255 ? (R < 1 ? 0 : R) : 255;
  G = G < 255 ? (G < 1 ? 0 : G) : 255;
  B = B < 255 ? (B < 1 ? 0 : B) : 255;

  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
};

/**
 * Convert Hex color to RGBA string
 */
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  if (!hex || typeof hex !== 'string') return `rgba(103, 58, 183, ${alpha})`;
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
