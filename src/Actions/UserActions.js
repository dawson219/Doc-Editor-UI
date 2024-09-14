import axios from "axios";
import apis from "../Apis/apis";
import { getHeaders } from "../Apis/helper";
import store from "../store";
import { setToken, setUser } from "../Slices/UserSlice";

const { dispatch } = store;

export const login = async (user, callback) => {
  try {
    const res = await axios.post(
      `${apis.auth}/login`,
      {
        username: user.username,
        password: user.password,
      }
    );

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(user))
      dispatch(setToken(res.data.token));
      dispatch(setUser(user));
      callback();
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const signup = async (user, callback) => {
  try {
    const res = await axios.post(
      `${apis.auth}/sign-up`,
      {
        username: user.username,
        password: user.password,
        email: user.email,
      }
    );

    if (res.status === 200) {
      callback();
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const logout = async (user, callback) => {
  try {
    const res = await axios.post(
      `${apis.auth}/logout`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      localStorage.setItem("token", "")
      localStorage.setItem("user", "")
      dispatch(setToken(""));
      dispatch(setUser(""));
      callback();
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const deleteAccount = async (user, callback) => {
  try {
    const res = await axios.post(
      `${apis.auth}/delete-account`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      localStorage.setItem("token", "")
      localStorage.setItem("user", "")
      dispatch(setToken(""));
      dispatch(setUser(""));
      callback();
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};
