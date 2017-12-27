/* eslint-disable no-undef */

// @flow

export const preloadImage = (url: string): ?Image => {
  let image: ?Image = null;
  if (typeof window !== "undefined") {
    image = new Image();
    image.src = url;
  }
  return image;
};
