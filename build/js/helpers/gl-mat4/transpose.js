/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */

export default function transpose(out, a) {
  if (out === a) {
    ({
      1: out[4],
      2: out[8],
      3: out[12],
      4: out[1],
      6: out[9],
      7: out[13],
      8: out[2],
      9: out[6],
      11: out[14],
      12: out[3],
      13: out[7],
      14: out[11],
    } = a);
  } else {
    ({
      0: out[0],
      1: out[4],
      2: out[8],
      3: out[12],
      4: out[1],
      5: out[5],
      6: out[9],
      7: out[13],
      8: out[2],
      9: out[6],
      10: out[10],
      11: out[14],
      12: out[3],
      13: out[7],
      14: out[11],
      15: out[15],
    } = a);
  }

  return out;
}
