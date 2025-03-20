import { Box } from "@mui/material";
import React from "react";

function MiddlePage() {
  return (
    <>
      <Box
        width="25%"
        bgcolor="#1c1c1c"
        height="100vh"
        px={2}
        py={2}
        sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        combined Notes
      </Box>
      <Box>default page</Box>
    </>
  );
}

export default MiddlePage;
