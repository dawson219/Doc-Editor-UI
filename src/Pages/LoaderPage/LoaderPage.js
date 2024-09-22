import React from "react";
import "./LoaderPage.css";
import { Box, CircularProgress } from "@mui/material";

const LoaderPage = () => {
  return (
    <div className="full-page">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoaderPage;
