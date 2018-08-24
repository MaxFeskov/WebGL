/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

export default function copy(out, a) {
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
