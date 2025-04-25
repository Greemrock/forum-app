import React from "react";
import { Box, CircularProgress } from "@mui/material";

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        p: 3,
        ...(fullScreen && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          zIndex: 9999,
          alignItems: "center",
        }),
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
