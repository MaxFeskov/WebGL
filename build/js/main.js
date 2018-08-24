import {
  createProgram, getWebGLContext, get2DContext,
} from './helpers/webgl-utils.js';

import mat4create from './helpers/gl-mat4/create.js';
import mat4perspective from './helpers/gl-mat4/perspective.js';
import mat4translate from './helpers/gl-mat4/translate.js';
import mat4rotate from './helpers/gl-mat4/rotate.js';
import mat4identity from './helpers/gl-mat4/identity.js';
import mat4multiply from './helpers/gl-mat4/multiply.js';

const mat4 = {
  create: mat4create,
  identity: mat4identity,
  multiply: mat4multiply,
  perspective: mat4perspective,
  rotate: mat4rotate,
  translate: mat4translate,
};

const rotationMatrix = mat4.create();
const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`;

const fsSource = `
  precision mediump float;

  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;

main();

function main() {
  const gl = getWebGLContext(document.getElementById('canvas'));
  const ctx = get2DContext(document.getElementById('canvas-copy'));

  if (!gl && !ctx) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');

    return;
  }

  const shaderProgram = createProgram(gl, vsSource, fsSource);

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const buffers = initBuffers(gl);

  let rotateFlag = false;
  let mouseX;
  let mouseY;

  window.addEventListener('load', () => {
    reset();
    resize(gl, ctx);
  });
  window.addEventListener('resize', () => { resize(gl, ctx); });
  window.addEventListener('mousemove', handleMousemoveEvent, true);
  window.addEventListener('mousedown', (event) => {
    rotateFlag = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  window.addEventListener('mouseup', () => {
    rotateFlag = false;
  });

  function handleMousemoveEvent(event) {
    if (rotateFlag) {
      const dx = event.clientX - mouseX;
      const dy = event.clientY - mouseY;

      mouseX = event.clientX;
      mouseY = event.clientY;

      rotate(rotationMatrix, -dx / 10, -dy / 10);
    }
  }

  function render() {
    drawScene(gl, programInfo, buffers);

    ctx.drawImage(gl.canvas, 0, 0);

    requestAnimationFrame(render);
  }

  render();
}

function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // Front face
    [1.0, 1.0, 1.0, 1.0], // Back face
    [1.0, 1.0, 1.0, 1.0], // Top face
    [1.0, 1.0, 1.0, 1.0], // Bottom face
    [1.0, 1.0, 1.0, 1.0], // Right face
    [1.0, 1.0, 1.0, 1.0], // Left face
  ];

  let colors = [];

  for (let j = 0; j < faceColors.length; j += 1) {
    const c = faceColors[Number(j)];

    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [
    0, 1, 1, 2, 2, 3, 3, 0, // front
    4, 5, 5, 6, 6, 7, 7, 4, // back
    8, 9, 9, 10, 10, 11, 11, 8, // top
    12, 13, 13, 14, 14, 15, 15, 12, // bottom
    16, 17, 17, 18, 18, 19, 19, 16, // right
    20, 21, 21, 22, 22, 23, 23, 20, // left
  ];

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW,
  );

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  const fieldOfView = 65 * Math.PI / 180;
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create();
  mat4.identity(modelViewMatrix);

  mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -1.5]);
  mat4.multiply(modelViewMatrix, modelViewMatrix, rotationMatrix);

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix,
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix,
  );

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.LINES, vertexCount, type, offset);
  }
}

function resize(gl, ctx) {
  let width = gl.canvas.clientWidth;
  let height = gl.canvas.clientHeight;
  gl.canvas.width = width;
  gl.canvas.height = height;

  if (ctx) {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
  }
}

function reset() {
  mat4.identity(rotationMatrix);
}

function rotate(matrix, dx, dy) {
  const deltaX = (dx * Math.PI) / 180;
  const deltaY = (dy * Math.PI) / 180;

  const newRotationMatrix = mat4.create();
  mat4.identity(newRotationMatrix);

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    mat4.rotate(newRotationMatrix, newRotationMatrix, deltaX, [0, 1, 0]);
  }

  mat4.multiply(matrix, newRotationMatrix, matrix);
}
