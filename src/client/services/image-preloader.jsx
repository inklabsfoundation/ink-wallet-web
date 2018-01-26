// @flow

import {isClientSide} from "./is-client-side-helper";

export const preloadImage = (url: string): ?HTMLImageElement => {
  let image: ?HTMLImageElement = null;
  if (isClientSide()) {
    image = document.createElement("img");
    image.src = url;
  }

  return image;
};
