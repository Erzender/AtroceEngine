function onfullscreen() {
  document.documentElement.requestFullscreen();
}

window.settings = {
  width: 6640,
  height: 3320
};

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.settings.width;
canvas.height = window.settings.height;

const imgData = ctx.getImageData(
  0,
  0,
  window.settings.width,
  window.settings.height
);
const pix = imgData.data;

const height = window.innerHeight;
const width = window.innerWidth;

let physics = {
  position: {
    direction: { x: 0, y: 0 } // -180/+180 ; -90/+90
  }
};

let world = {
  player: { x: 0, y: 0, z: 0 }
};
let color;

for (let y = 0; y < window.settings.height / 2; y++) {
  for (let x = 0; x < window.settings.width; x++) {
    setPixel(pix, x, y, [50, 150, 230]);
  }
}

// for (let y = window.settings.height / 2; y < window.settings.height; y++) {
for (
  let y = window.settings.height / 2;
  y < window.settings.height / 2 + 10;
  y++
) {
  // for (let x = 0; x < window.settings.width; x++) {
  for (
    let x = window.settings.width / 2;
    x < window.settings.width / 2 + 3;
    x++
  ) {
    color = raycast(x, y, world);
    setPixel(pix, x, y, color);
  }
}

ctx.putImageData(imgData, 0, 0);

const screen = canvas.toDataURL();

let images = document.getElementsByClassName("image-screen");
for (let i = 0; i < images.length; i++) {
  images[i].src = screen;
  images[i].height = window.settings.height;
  images[i].width = window.settings.width;
}

document.getElementById("screen").style.height = window.settings.height;
document.getElementById("screen").style.width = window.settings.width;

let joystick = {
  left: null,
  right: null,
  up: null,
  down: null
};

document.body.onkeydown = e => {
  switch (e.keyCode) {
    case 37:
      joystick.left = true;
      joystick.right = joystick.right ? false : null;
      break;
    case 38:
      joystick.up = true;
      joystick.down = joystick.down ? false : null;
      break;
    case 39:
      joystick.right = true;
      joystick.left = joystick.left ? false : null;
      break;
    case 40:
      joystick.down = true;
      joystick.up = joystick.up ? false : null;
      break;
  }
};

document.body.onkeyup = e => {
  switch (e.keyCode) {
    case 37:
      joystick.left = null;
      joystick.right = joystick.right === false ? true : joystick.right;
      break;
    case 38:
      joystick.up = null;
      joystick.down = joystick.down === false ? true : joystick.down;
      break;
    case 39:
      joystick.right = null;
      joystick.left = joystick.left === false ? true : joystick.left;
      break;
    case 40:
      joystick.down = null;
      joystick.up = joystick.up === false ? true : joystick.up;
      break;
  }
};

let timer = new Date().getTime();
let lock = false;
setInterval(() => {
  if (lock) {
    return;
  }
  lock = true;
  let newtimer = new Date().getTime();
  let diff = newtimer - timer;
  timer = newtimer;

  if (joystick.right || joystick.left) {
    physics.position.direction.x =
      (joystick.right ? 0.1 : -0.1) * diff + physics.position.direction.x;
    if (physics.position.direction.x > 180)
      physics.position.direction.x = physics.position.direction.x - 360;
    if (physics.position.direction.x < -180)
      physics.position.direction.x = 360 + physics.position.direction.x;
  }
  if (joystick.up || joystick.down) {
    physics.position.direction.y =
      (joystick.up ? 0.1 : -0.1) * diff + physics.position.direction.y;
    if (physics.position.direction.y > 90) physics.position.direction.y = 90;
    if (physics.position.direction.y < -90) physics.position.direction.y = -90;
  }

  const shift = {
    x:
      (physics.position.direction.x + 180) /
        360 *
        (-window.settings.width + width) -
      window.settings.width,
    y:
      (physics.position.direction.y - 90) /
      180 *
      (window.settings.height - height)
  };

  document.getElementById(
    "screen"
  ).style.transform = `translate(${shift.x}px, ${shift.y}px)`;
  lock = false;
}, 0.02);
