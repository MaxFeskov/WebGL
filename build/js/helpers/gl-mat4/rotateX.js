/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

export default function rotateX(out, a, rad) {
  const s = Math.sin(rad);
  const c = Math.cos(rad);

  const {
    4: a10, 5: a11, 6: a12, 7: a13, 8: a20, 9: a21, 10: a22, 11: a23,
  } = a;

  if (a !== out) {
    ({
      0: out[0],
      1: out[1],
      2: out[2],
      3: out[3],
      12: out[12],
      13: out[13],
      14: out[14],
      15: out[15],
    } = a);
  }

  out[4] = (a10 * c) + (a20 * s);
  out[5] = (a11 * c) + (a21 * s);
  out[6] = (a12 * c) + (a22 * s);
  out[7] = (a13 * c) + (a23 * s);
  out[8] = (a20 * c) - (a10 * s);
  out[9] = (a21 * c) - (a11 * s);
  out[10] = (a22 * c) - (a12 * s);
  out[11] = (a23 * c) - (a13 * s);

  return out;
}
