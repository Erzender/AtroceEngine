const setPixel = (pix, x = 0, y = 0, color = [0, 0, 0]) => {
  const cursor = y * 4 * window.settings.width + x * 4;

  pix[cursor] = color[0];
  pix[cursor + 1] = color[1];
  pix[cursor + 2] = color[2];
  pix[cursor + 3] = 255;
  return pix;
};
