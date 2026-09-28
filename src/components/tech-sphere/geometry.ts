import type { Tech } from "./data";

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface TechPoint extends Point3D {
  tech: Tech;
}

export type Mat3 = number[];

export function seedRand(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function fibonacciSphere(n: number, r: number): Point3D[] {
  const pts: Point3D[] = [];
  const off = 2 / n;
  const inc = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const y = i * off - 1 + off / 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * inc;
    pts.push({
      x: Math.cos(phi) * rad * r,
      y: y * r,
      z: Math.sin(phi) * rad * r,
    });
  }

  return pts;
}

// Rotations are pre-multiplied so pointer drags stay screen-relative.
export function matMul(a: Mat3, b: Mat3): Mat3 {
  const result = new Array(9).fill(0);
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let sum = 0;
      for (let k = 0; k < 3; k++) {
        sum += a[row * 3 + k] * b[k * 3 + col];
      }
      result[row * 3 + col] = sum;
    }
  }
  return result;
}

export function rotY(angle: number): Mat3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [cos, 0, sin, 0, 1, 0, -sin, 0, cos];
}

export function rotX(angle: number): Mat3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [1, 0, 0, 0, cos, -sin, 0, sin, cos];
}

export function computeNeighbors(
  points: Point3D[],
  count: number,
): [number, number][] {
  const pairs = new Set<string>();

  for (let i = 0; i < points.length; i++) {
    const distances: [number, number][] = [];

    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;

      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dz = points[i].z - points[j].z;
      distances.push([j, dx * dx + dy * dy + dz * dz]);
    }

    distances.sort((a, b) => a[1] - b[1]);
    for (let neighbor = 0; neighbor < count; neighbor++) {
      const j = distances[neighbor][0];
      pairs.add(i < j ? `${i}_${j}` : `${j}_${i}`);
    }
  }

  return Array.from(pairs).map(
    (pair) => pair.split("_").map(Number) as [number, number],
  );
}
