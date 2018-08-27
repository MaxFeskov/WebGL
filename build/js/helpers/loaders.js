export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();

    image.onload = () => {
      resolve(image);
    };

    image.onerror = () => {
      console.log(`Error load ${url}`);
    };

    image.crossOrigin = '';
    image.src = url;
  });
}

export function loadJSON(url) {
  return fetch(url).then(r => r.json());
}
