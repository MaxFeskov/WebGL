/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

export default function rotateY(out, a, rad) {
  const s = Math.sin(rad);
  const c = Math.cos(rad);
  const {
    0: a00, 1: a01, 2: a02, 3: a03, 8: a20, 9: a21, 10: a22, 11: a23,
  } = a;

  if (a !== out) {
    ({
      4: out[4],
      5: out[5],
      6: out[6],
      7: out[7],
      12: out[12],
      13: out[13],
      14: out[14],
      15: out[15],
    } = a);
  }

  out[0] = (a00 * c) - (a20 * s);
  out[1] = (a01 * c) - (a21 * s);
  out[2] = (a02 * c) - (a22 * s);
  out[3] = (a03 * c) - (a23 * s);
  out[8] = (a00 * s) + (a20 * c);
  out[9] = (a01 * s) + (a21 * c);
  out[10] = (a02 * s) + (a22 * c);
  out[11] = (a03 * s) + (a23 * c);

  return out;
}
