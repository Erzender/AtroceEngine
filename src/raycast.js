const raycast = (x = 0, y = 0, world = {}, source = [0, 3, 0]) => {
  let angle = (1 - x) * 2 * Math.PI / window.settings.width + 3 * Math.PI / 2;
  let pos2 = {
    x: Math.cos(angle),
    y: (window.settings.height + y) / window.settings.height * 6 - 3,
    z: Math.sin(angle)
  };
  return [255, 0, 255];
};
