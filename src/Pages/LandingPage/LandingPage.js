import React, { useEffect } from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.token && user.token?.length > 0) {
      navigate("/home");
    } else {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return <></>;
};

export default LandingPage;
