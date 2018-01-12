// @flow

export const preloadImage = (url: string): ?HTMLImageElement => {
  let image: ?HTMLImageElement = null;
  if (typeof window !== "undefined") {
    image = document.createElement("img");
    image.src = url;
  }
  return image;
};
