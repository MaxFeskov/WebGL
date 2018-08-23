main();

function main() {
  const canvas = document.getElementById('canvas');

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');

    return;
  }

  console.log('done');
}
