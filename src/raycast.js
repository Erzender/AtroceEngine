const NORMS = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];

const raycast = (x = 0, y = 0, world = {}, pos = [0, 2, 0]) => {
  let angle = (1 - x) * 2 * Math.PI / window.settings.width + 3 * Math.PI / 2;
  let pos2 = [
    Math.cos(angle),
    (window.settings.height - y) * 4 / window.settings.height,
    Math.sin(angle)
  ];
  let ray = {
    t: [pos2[0] - pos[0], pos2[1] - pos[1], pos2[2] - pos[2]],
    A: [...pos]
  };

  let inter;
  for (let mesh of world.meshes) {
    inter = intersect(ray, mesh);
    if (inter !== null) {
      return [255, 0, 255];
    }
  }
  console.log(ray, inter);
  return [0, 0, 0];
};

const intersect = (ray = {}, mesh = {}) => {
  // ax + by + cz + d = 0
  // x = x0 - tA
  // y = y0 - tB
  // z = z0 - tC
  let dem =
    NORMS[mesh.type][0] * ray.t[0] +
    NORMS[mesh.type][1] * ray.t[1] +
    NORMS[mesh.type][2] * ray.t[2];
  if ((dem > -0.00001 && dem < 0, 00001)) {
    return null;
  }

  let t =
    -(
      NORMS[mesh.type][0] * ray.A[0] +
      NORMS[mesh.type][1] * ray.A[1] +
      NORMS[mesh.type][2] * ray.A[2] +
      mesh.d
    ) / dem;

  let result = [
    ray.A[0] + ray.t[0] * t,
    ray.A[1] + ray.t[1] * t,
    ray.A[2] + ray.t[2] * t
  ];

  let projection;
  switch (mesh.type) {
    case 0:
      projection = [result[0] - mesh.A[0], result[1] - mesh.A[1]];
      break;
    case 1:
      projection = [result[0] - mesh.A[0], result[2] - mesh.A[2]];
      break;
    case 2:
      projection = [result[2] - mesh.A[2], result[1] - mesh.A[1]];
      break;
  }
  if (
    projection[0] < 0 ||
    projection[0] > mesh.dim[0] ||
    projection[1] > 0 ||
    projection[1] < -dim[1]
  ) {
    return null;
  }
  return [result, projection];
};
