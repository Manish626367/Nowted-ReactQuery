

"use client";

import { useState, useCallback } from "react";
import Image from "next/image"; // Correct way to handle images in Next.js
import editNotesIcon from "../images/editIcon.svg"
import { Box, IconButton } from "@mui/material";
import OptionPopup from "./OptionPopup";
import CloseIcon from "@mui/icons-material/Close";

function EditPopup() {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = useCallback(() => setShowPopup(false), []);

  return (
    <Box position="relative">
      {
        <IconButton onClick={() => setShowPopup((prev) => !prev)} sx={{ height: 36, width: 40, pb: 0.5, color: "white" }}>

          {
             !showPopup ? <Image src={editNotesIcon} alt="Edit Notes Icon" width={40} height={36} /> : <CloseIcon />
          }
      
        </IconButton > 
      }

      {showPopup && <OptionPopup closePopup={closePopup} />}

    </Box>
  );
}

export default EditPopup;












