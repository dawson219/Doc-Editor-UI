import React, { useState } from "react";
import "./Login.css";
import { login } from "../../Actions/UserActions";
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/Logos/main-logo.png";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(user, () => {
            navigate("/home");
          });
        }}
        className="form-wrapper"
      >
        <img src={logo} alt="" className="login-logo" />
        <input
          value={user.username}
          onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value,
            });
          }}
          className="input-box input-username"
          placeholder="Username"
          required={true}
          type="text"
          name=""
          id=""
        />
        <input
          value={user.password}
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            });
          }}
          className="input-box input-password"
          placeholder="Password"
          required={true}
          type="password"
          name=""
          id=""
        />
        <button className="button" type="submit">
          Login
        </button>
        <button
          className="button signup"
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
