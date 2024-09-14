import React from "react";
import "./DeleteAccount.css";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../Actions/UserActions";
import { useSelector } from "react-redux";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <div>
      <h1>Are you sure you want to Delete your account</h1>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        No
      </button>
      <button
        onClick={() => {
          deleteAccount(user.user, () => {
            navigate("/");
          });
        }}
      >
        Yes
      </button>
    </div>
  );
};

export default DeleteAccount;
