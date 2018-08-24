/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */

export default function rotateZ(out, a, rad) {
  const s = Math.sin(rad);
  const c = Math.cos(rad);

  const [a00, a01, a02, a03, a10, a11, a12, a13] = a;

  if (a !== out) {
    ({
      8: out[8],
      9: out[9],
      10: out[10],
      11: out[11],
      12: out[12],
      13: out[13],
      14: out[14],
      15: out[15],
    } = a);
  }

  out[0] = (a00 * c) + (a10 * s);
  out[1] = (a01 * c) + (a11 * s);
  out[2] = (a02 * c) + (a12 * s);
  out[3] = (a03 * c) + (a13 * s);
  out[4] = (a10 * c) - (a00 * s);
  out[5] = (a11 * c) - (a01 * s);
  out[6] = (a12 * c) - (a02 * s);
  out[7] = (a13 * c) - (a03 * s);

  return out;
}
