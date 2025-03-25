

"use client";

import { Box, Button, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import favoriteIcon from "../images/Favorites.svg";
import trashIcon from "../images/trash.svg";
import archivedIcon from "../images/Archieved.svg";

const StyledButton = styled(Button)(({}) => ({
  display: "flex",
  gap: "15px",
  width: "100%",
  cursor: "pointer",
  justifyContent: "flex-start",
  color: "rgba(255, 255, 255, 0.9)",
  fontWeight: 550,         
  textTransform: "none",  
  padding:"7px 17px ",       
  fontSize: "16px",                  
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledBox = styled(Box)({
  width: "100%",
  color: "#1c1c1c",
  fontWeight: 600,
  // padding: "0px 10px",
 
});

const options = [
  { href: "/favorites", icon: favoriteIcon, label: "Favorites" },
  { href: "/Deleted", icon: trashIcon, label: "Trash" },
  { href: "/Archived", icon: archivedIcon, label: "Archived Notes" }
];

function More() {
  const pathname = usePathname();

  return (
    <StyledBox>
      <Typography variant="subtitle1" px={2.2} color= "rgba(255, 255, 255, 0.6)" fontWeight={550}>
        More
      </Typography>

      {options.map(({ href, icon, label }) => (
        <Link key={href} href={href} passHref style={{outline: "none", textDecoration: "none"}}>
          <StyledButton
            sx={{
              backgroundColor: pathname === href ? "rgba(255, 255, 255, 0.2)" : "inherit",
              borderRadius: pathname === href ? "8px" : "inherit",
               filter: pathname === href ?"":'invert(40%) sepia(0%) saturate(9000%)'
            }}
          >
            <Image src={icon} alt={label} width={19} height={19} />
            {label}
          </StyledButton>
        </Link>
      ))}
    </StyledBox>
  );
}

export default More;
