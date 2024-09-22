import { Alert } from "@mui/material";
import React from "react";
import './Message.css'

const Message = ({ severity, message }) => {
  return (
    <div className="message-alert" >
      <Alert variant="filled" severity={severity}>
        {message}
      </Alert>
    </div>
  );
};

export default Message;
