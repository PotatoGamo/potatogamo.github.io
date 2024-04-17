// const points = [
//   { x: -1, y: -1.5, z: -1 },
//   { x: 1, y: -1.5, z: -1 },
//   { x: 1, y: 1.5, z: -1 },
//   { x: -1, y: 1.5, z: -1 },

//   { x: -1, y: -1.5, z: 1 },
//   { x: 1, y: -1.5, z: 1 },
//   { x: 1, y: 1.5, z: 1 },
//   { x: -1, y: 1.5, z: 1 },

//   { x: -1, y: -0.5, z: 2 },
//   { x: 1, y: -0.5, z: 2 },
//   { x: 1, y: 1.5, z: 2 },
//   { x: -1, y: 1.5, z: 2 },

//   { x: -1, y: -1, z: -2 },
//   { x: 1, y: -1, z: -2 },
//   { x: 1, y: 1, z: -2 },
//   { x: -1, y: 1, z: -2 },
// ];

const points = [];
const verticies = [];

const numVerticalSegments = 10;
const numHorizontalSegments = 20;
const radius = 1;

for (let i = 0; i <= numVerticalSegments; i++) {
    const rho = Math.PI * i / numVerticalSegments; // Pitch angle
    const cosRho = Math.cos(rho);
    const sinRho = Math.sin(rho);

    for (let j = 0; j <= numHorizontalSegments; j++) {
        const phi = 2 * Math.PI * j / numHorizontalSegments; // Rotation around vertical axis
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);

        const x = radius * sinRho * cosPhi;
        const y = radius * sinRho * sinPhi;
        const z = radius * cosRho;

        points.push({ x, y, z });
    }
}

for (let i = 0; i < numVerticalSegments; i++) {
    for (let j = 0; j < numHorizontalSegments; j++) {
        const a = i * (numHorizontalSegments + 1) + j;
        const b = a + numHorizontalSegments + 1;

        verticies.push({ a, b });
        verticies.push({ a: a + 1, b });
        verticies.push({ a: a + 1, b: b + 1 });

        verticies.push({ a, b });
        verticies.push({ a: a + 1, b: b + 1 });
        verticies.push({ a, b: b + 1 });
    }
}
