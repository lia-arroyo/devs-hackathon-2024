export const convertToRGBA = (hex: string, opacity: number) => {
  // Remove '#' if it's included
  const cleanedHex = hex.replace('#', '');

  // Convert hex to RGB
  const bigint = parseInt(cleanedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  console.log(r, g, b, hex);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
