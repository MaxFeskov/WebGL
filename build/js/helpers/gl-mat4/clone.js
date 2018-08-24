/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */

export default function clone(a) {
  const out = new Float32Array(16);

  [
    out[0],
    out[1],
    out[2],
    out[3],
    out[4],
    out[5],
    out[6],
    out[7],
    out[8],
    out[9],
    out[10],
    out[11],
    out[12],
    out[13],
    out[14],
    out[15],
  ] = a;

  return out;
}
