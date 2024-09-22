import axios from "axios";
import apis from "../Apis/apis";
import { getHeaders } from "../Apis/helper";
import store from "../store";
import {
  setIsLoading,
  setMessage,
  setToken,
  setUser,
} from "../Slices/UserSlice";

const { dispatch } = store;

export const login = async (user, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(`${apis.auth}/login`, {
      username: user.username,
      password: user.password,
    });

    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setToken(res.data.token));
      dispatch(setUser(user));
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if(res.data.status === "200") callback();
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Login",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Login",
        severity: "error",
      })
    );
  }
};

export const signup = async (user, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(`${apis.auth}/sign-up`, {
      username: user.username,
      password: user.password,
      email: user.email,
    });

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if(res.data.status === "200") callback();
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Signup",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Signup",
        severity: "error",
      })
    );
  }
};

export const logout = async (user, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.auth}/logout`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      dispatch(setToken(""));
      dispatch(setUser(""));
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if(res.data.status === "200") callback();
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Logout",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Logout",
        severity: "error",
      })
    );
  }
};

export const deleteAccount = async (user, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.auth}/delete-account`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      localStorage.setItem("token", "");
      localStorage.setItem("user", "");
      dispatch(setToken(""));
      dispatch(setUser(""));
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if(res.data.status === "200") callback();
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Deleting Account",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Deleting Account",
        severity: "error",
      })
    );
  }
};
