import store from "../store";

const { getState } = store;

export const getHeaders = () => {
  const token = getState().user.token;
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};
