/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

export default function multiply(out, a, b) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a;

  let b0;
  let b1;
  let b2;
  let b3;

  ({
    0: b0, 1: b1, 2: b2, 3: b3,
  } = b);

  out[0] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[1] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[2] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[3] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  ({
    4: b0, 5: b1, 6: b2, 7: b3,
  } = b);

  out[4] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[5] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[6] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[7] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  ({
    8: b0, 9: b1, 10: b2, 11: b3,
  } = b);

  out[8] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[9] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[10] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[11] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  ({
    12: b0, 13: b1, 14: b2, 15: b3,
  } = b);

  out[12] = (b0 * a00) + (b1 * a10) + (b2 * a20) + (b3 * a30);
  out[13] = (b0 * a01) + (b1 * a11) + (b2 * a21) + (b3 * a31);
  out[14] = (b0 * a02) + (b1 * a12) + (b2 * a22) + (b3 * a32);
  out[15] = (b0 * a03) + (b1 * a13) + (b2 * a23) + (b3 * a33);

  return out;
}
