const canvas = elemByID("canvas");
const ctx = canvas.getContext("2d");
const fovSlider = elemByID("fov");
const scaleSlider = elemByID("scale");
const thetaSlider = elemByID("theta");
const zOffsetSlider = elemByID("zOffset");
var scale = scaleSlider.value;
var fov = fovSlider.value;
var theta = thetaSlider.value;
var zOffset = -zOffsetSlider.value;
var spin = 0;

//elemByID function
function elemByID(id) {
  return document.getElementById(id);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoint(x, y) {
  var dotRadius = 3; // Radius of the dot
  var dotColor = "red"; // Color of the dot
  // Draw the dot
  ctx.beginPath();
  ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
  ctx.fillStyle = dotColor;
  ctx.fill();
  ctx.closePath();
}

function render(theta) {
  if (theta === null || theta === undefined) {
    theta = thetaSlider.value;
  }
  scale = scaleSlider.value;
  fov = fovSlider.value;
  zOffset = -zOffsetSlider.value;
  clearCanvas();

  let projectedPoints = threeDToTwoD(points, theta);
  for (let i = 0; i < verticies.length; i++) {
    let vertex = verticies[i];
    let xa = projectedPoints[vertex.a].x;
    let ya = projectedPoints[vertex.a].y;
    let xb = projectedPoints[vertex.b].x;
    let yb = projectedPoints[vertex.b].y;

    drawLine(xa, ya, xb, yb);
    // ctx.fillText(vertex.a, xa, ya);
    // ctx.fillText(vertex.b, xb, yb);
  }
  
  for (let i = 0; i < projectedPoints.length; i++) {
    let point = projectedPoints[i];
    drawPoint(point.x, point.y);
    // ctx.fillText(i, point.x, point.y);
  }

}

function threeDToTwoD(points, theta) {
  let twoDPoints = [];
  points.forEach((point) => {
    // Rotate the point around the y-axis by angle theta
    let rotatedX = point.x * Math.cos(theta) - point.z * Math.sin(theta);
    let rotatedY = point.y;
    let rotatedZ = point.x * Math.sin(theta) + point.z * Math.cos(theta) + zOffset;

    // Project the 3D point onto the 2D plane
    let projectedY = (canvas.height / 2) + rotatedY / rotatedZ * scale;
    let projectedX = (canvas.width / 2) + rotatedX / rotatedZ * scale;

    twoDPoints.push({ x: projectedX, y: projectedY });
  });

  return twoDPoints;
}





function drawLine(x1, y1, x2, y2) {
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}



render(theta);

setInterval(() => {
  if (elemByID("spinToggle").checked) {
    spin += 0.01;
    render(spin);
  }
}, 1000 / 60);

//fovSlider.addEventListener("input", render);
scaleSlider.addEventListener("input", render);
zOffsetSlider.addEventListener("input", render);
