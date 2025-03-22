"use client";

import { Button, Typography } from "@mui/material";
import Image from "next/image";

const MainEditButton = ({
  icon,
  text,
  onClick,
}: {
  icon: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Button
      fullWidth
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-start",
          textTransform: "lowercase",
          px: 2,
          py: 1.5,
          color: "white",
          backgroundColor: "#121212",
          "&:hover": {
            backgroundColor: "gray",
          },
        }}
    >
      <Image src={icon} alt={text} width={20} height={20} />
      <Typography>{text}</Typography>
    </Button>
  );
};

export default MainEditButton;
