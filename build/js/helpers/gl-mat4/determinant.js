/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */

export default function determinant(a) {
  const [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33] = a;

  const b00 = (a00 * a11) - (a01 * a10);
  const b01 = (a00 * a12) - (a02 * a10);
  const b02 = (a00 * a13) - (a03 * a10);
  const b03 = (a01 * a12) - (a02 * a11);
  const b04 = (a01 * a13) - (a03 * a11);
  const b05 = (a02 * a13) - (a03 * a12);
  const b06 = (a20 * a31) - (a21 * a30);
  const b07 = (a20 * a32) - (a22 * a30);
  const b08 = (a20 * a33) - (a23 * a30);
  const b09 = (a21 * a32) - (a22 * a31);
  const b10 = (a21 * a33) - (a23 * a31);
  const b11 = (a22 * a33) - (a23 * a32);

  return (b00 * b11) - (b01 * b10) + (b02 * b09) + (b03 * b08) - (b04 * b07) + (b05 * b06);
}
