import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../Actions/UserActions";
import logo from "../../Assets/Logos/main-logo.png";

const SignUp = () => {
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const navigate = useNavigate();
  return (
    <div className="login-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signup(user, () => {
            navigate("/login");
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
          value={user.email}
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            });
          }}
          className="input-box input-email"
          placeholder="Email"
          required={true}
          type="email"
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

export default SignUp;
