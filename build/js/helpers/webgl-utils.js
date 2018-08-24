export function getWebGLContext(canvas) {
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl) {
    return gl;
  }

  alert('Unable to initialize WebGL. Your browser or machine may not support it.');

  return null;
}

export function get2DContext(canvas) {
  const ctx = canvas.getContext('2d');

  if (ctx) {
    return ctx;
  }

  alert('Unable to initialize 2D context. Your browser or machine may not support it.');

  return null;
}

export function initShaders(gl, vshader, fshader) {
  const program = createProgram(gl, vshader, fshader);

  if (!program) {
    alert('Failed to create program');

    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

export function createProgram(gl, vshader, fshader) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    alert(`Failed to link program: ${gl.getProgramInfoLog(program)}`);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);

    return null;
  }

  return program;
}

export function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  if (shader === null) {
    alert('unable to create shader');

    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}
