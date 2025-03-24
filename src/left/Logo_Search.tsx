"use client";  

import { Box, IconButton } from "@mui/material";
import Image from "next/image";  
import SearchImg from "../images/search.png";
import { useState } from "react";
import NowtedImg from "../images/Group 1.svg"
import CreateNote from "./CreateNote";
import SearchNote from "../left/SearchNote"
import CloseIcon from "@mui/icons-material/Close";

function LogoSearch() {
  
  const [isSearch, setIsSearch] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap={3} >

      <Box display="flex" justifyContent="space-between" alignItems="center" px={3}>
        <Box display="flex" alignItems="center">
          <Image src={NowtedImg} alt="logo"/>
        </Box>
        <IconButton onClick={() => setIsSearch((prev) => !prev)}>
          {
            !isSearch ?  <Image src={SearchImg} alt="Search icon" width={21} height={21} /> : <CloseIcon sx={{color:"white"}}/>
          }
        </IconButton>
      </Box>

      {/* ---------Conditional Rendering for Search or CreateNote-------- */}

      <Box px={2}>{isSearch ? <SearchNote /> : <CreateNote />}</Box>
    </Box>
  );
}

export default LogoSearch;
