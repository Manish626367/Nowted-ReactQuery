// "use client";

// import { Box, Button, Typography, styled } from "@mui/material";
// import Link from "next/link";
// import Image from "next/image";
// import favoriteIcon from "../images/Favorites.svg"
// import trashIcon from "../images/trash.svg"
// import archivedIcon from "../images/Archieved.svg"


// const StyledButton = styled(Button)(({ theme }) => ({
//   display: "flex",
//   gap: theme.spacing(2),
//   padding: theme.spacing(1, 2),
//   width: "100%",
//   cursor: "pointer",
//   justifyContent: "flex-start",
//   color: "#F1F5F9",
//   "&:hover": {
//     backgroundColor: "rgba(30, 41, 59, 0.9)",
//   },
//   "&.active": { backgroundColor: "#000000", color: "#ffffff" },
// }));

// const StyledBox = styled(Box)({
//   width: "100%",
//   color: "#94A3B8",
//   fontWeight: 600,
//   gap: "6px",
// });

// function More() {
//   return (
//     <StyledBox>
//       <Typography variant="subtitle1">
//         Recents
//       </Typography>

//       <Link href="/favorites" passHref  style={{ outline: "none", textDecoration: "none" }}>
//         <StyledButton>
//           <Image src={favoriteIcon} alt="Favorites" width={24} height={24} />
//           Favorites
//         </StyledButton>
//       </Link>

//       <Link href="/Deleted" passHref  style={{ outline: "none", textDecoration: "none" }}>
//         <StyledButton>
//           <Image src={trashIcon} alt="Trash" width={24} height={24} />
//           Trash
//         </StyledButton>
//       </Link>

//       <Link href="/Archived" passHref  style={{ outline: "none", textDecoration: "none"}}>
//         <StyledButton>
//           <Image src={archivedIcon} alt="Archived Notes" width={24} height={24} />
//           Archived Notes
//         </StyledButton>
//       </Link>
//     </StyledBox>
//   );
// }

// export default More;




//---------------------------------------------------------------






// "use client";

// import { Box, Button, Typography, styled } from "@mui/material";
// import Link from "next/link";
// import Image from "next/image";
// import favoriteIcon from "../images/Favorites.svg";
// import trashIcon from "../images/trash.svg";
// import archivedIcon from "../images/Archieved.svg";
// import { usePathname } from "next/navigation";


// const StyledButton = styled(Button)(({ theme }) => ({
//   display: "flex",
//   gap: theme.spacing(2),
//   padding: theme.spacing(1, 2),
//   width: "100%",
//   cursor: "pointer",
//   justifyContent: "flex-start",
//   color: "#F1F5F9", 
//   "&:hover": {
//     backgroundColor: "rgba(255, 255, 255, 0.1)",
//   },
//   "&.active": { 
//     backgroundColor: "rgba(255, 255, 255, 0.2)", 
//     borderRadius: "8px" 
//   },
// }));

// const StyledBox = styled(Box)({
//   width: "100%",
//   color: "#94A3B8", 
//   fontWeight: 600,
//   gap: "6px",
// });

// function More() {
//     const pathname = usePathname();

//   return (
//     <StyledBox>
//       <Typography variant="subtitle1" style={{ color: "#F1F5F9" }}>Recents</Typography>

//       <Link href="/favorites" passHref>
//         <StyledButton className={pathname === "/favorites" ? "active" : ""}>
//           <Image src={favoriteIcon} alt="Favorites" width={21} height={21} />
//           Favorites
//         </StyledButton>
//       </Link>

//       <Link href="/Deleted" passHref>
//         <StyledButton className={pathname === "/Deleted" ? "active" : ""}>
//           <Image src={trashIcon} alt="Trash" width={21} height={21} />
//           Trash
//         </StyledButton>
//       </Link>

//       <Link href="/Archived" passHref>
//         <StyledButton className={pathname === "/Archived" ? "active" : ""}>
//           <Image src={archivedIcon} alt="Archived Notes" width={21} height={21} />
//           Archived Notes
//         </StyledButton>
//       </Link>
//     </StyledBox>
//   );
// }

// export default More;











"use client";

import { Box, Button, Typography, styled } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import favoriteIcon from "../images/Favorites.svg";
import trashIcon from "../images/trash.svg";
import archivedIcon from "../images/Archieved.svg";
import { usePathname } from "next/navigation";

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  padding: theme.spacing(1, 2),
  width: "100%",
  cursor: "pointer",
  justifyContent: "flex-start",
  color: "#F1F5F9",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
}));

const StyledBox = styled(Box)({
  width: "100%",
  color: "#94A3B8",
  fontWeight: 600,
  padding:"0px 10px"
//   gap: "6px",
});

function More() {
  const pathname = usePathname();

  return (
    <StyledBox>
      <Typography variant="subtitle1" p={2}  style={{ color: "#F1F5F9" }}>
         More
      </Typography>

      <Link href="/favorites" passHref>
        <StyledButton
          sx={{
            backgroundColor:
              pathname === "/favorites" ? "rgba(255, 255, 255, 0.2)" : "inherit",
            borderRadius: pathname === "/favorites" ? "8px" : "inherit",
          }}
        >
          <Image src={favoriteIcon} alt="Favorites" width={21} height={21} />
          Favorites
        </StyledButton>
      </Link>

      <Link href="/Deleted" passHref>
        <StyledButton
          sx={{
            backgroundColor:
              pathname === "/Deleted" ? "rgba(255, 255, 255, 0.2)" : "inherit",
            borderRadius: pathname === "/Deleted" ? "8px" : "inherit",
          }}
        >
          <Image src={trashIcon} alt="Trash" width={21} height={21} />
          Trash
        </StyledButton>
      </Link>

      <Link href="/Archived" passHref>
        <StyledButton
          sx={{
            backgroundColor:
              pathname === "/Archived" ? "rgba(255, 255, 255, 0.2)" : "inherit",
            borderRadius: pathname === "/Archived" ? "8px" : "inherit",
          }}
        >
          <Image src={archivedIcon} alt="Archived Notes" width={21} height={21} />
          Archived Notes
        </StyledButton>
      </Link>
    </StyledBox>
  );
}

export default More;