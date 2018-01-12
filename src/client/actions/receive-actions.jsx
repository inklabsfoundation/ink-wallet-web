// @flow

type OpenModalAction = {
  type: "OPEN_RECEIVE_MODAL",
}

type CloseModalAction = {
  type: "CLOSE_RECEIVE_MODAL"
}

export type ReceiveAction = OpenModalAction | CloseModalAction;

export const openReceiveModal = (): OpenModalAction => {
  return {
    type: "OPEN_RECEIVE_MODAL"
  };
};

export const closeReceiveModal = (): CloseModalAction => {
  return {
    type: "CLOSE_RECEIVE_MODAL"
  };
};
