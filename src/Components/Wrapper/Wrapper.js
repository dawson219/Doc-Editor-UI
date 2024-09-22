import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderPage from "../../Pages/LoaderPage/LoaderPage";
import Message from "../Message/Message";
import { setMessage } from "../../Slices/UserSlice";

const Wrapper = (props) => {
  const { isLoading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(setMessage(null));
      }, 3000);
    }
    //eslint-disable-next-line
  }, [message]);

  return (
    <>
      {isLoading && <LoaderPage />}
      {message && (
        <Message severity={message.severity} message={message.message} />
      )}
      {props.children}
    </>
  );
};

export default Wrapper;
