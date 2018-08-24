/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */

export default function rotate(out, a, rad, axis) {
  let [x, y, z] = axis;
  let len = Math.sqrt((x * x) + (y * y) + (z * z));

  if (Math.abs(len) < 0.000001) {
    return null;
  }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const t = 1 - c;

  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23] = a;

  const b00 = (x * x * t) + c;
  const b01 = (y * x * t) + (z * s);
  const b02 = (z * x * t) - (y * s);
  const b10 = (x * y * t) - (z * s);
  const b11 = (y * y * t) + c;
  const b12 = (z * y * t) + (x * s);
  const b20 = (x * z * t) + (y * s);
  const b21 = (y * z * t) - (x * s);
  const b22 = (z * z * t) + c;

  out[0] = (a00 * b00) + (a10 * b01) + (a20 * b02);
  out[1] = (a01 * b00) + (a11 * b01) + (a21 * b02);
  out[2] = (a02 * b00) + (a12 * b01) + (a22 * b02);
  out[3] = (a03 * b00) + (a13 * b01) + (a23 * b02);
  out[4] = (a00 * b10) + (a10 * b11) + (a20 * b12);
  out[5] = (a01 * b10) + (a11 * b11) + (a21 * b12);
  out[6] = (a02 * b10) + (a12 * b11) + (a22 * b12);
  out[7] = (a03 * b10) + (a13 * b11) + (a23 * b12);
  out[8] = (a00 * b20) + (a10 * b21) + (a20 * b22);
  out[9] = (a01 * b20) + (a11 * b21) + (a21 * b22);
  out[10] = (a02 * b20) + (a12 * b21) + (a22 * b22);
  out[11] = (a03 * b20) + (a13 * b21) + (a23 * b22);

  if (a !== out) {
    ({
      12: out[12], 13: out[13], 14: out[14], 15: out[15],
    } = a);
  }
  return out;
}
