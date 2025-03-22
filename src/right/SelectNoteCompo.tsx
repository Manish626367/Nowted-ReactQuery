import { Box, Typography } from "@mui/material";
import selectNote from "../images/selectNote.svg"
import Image from "next/image";

function SelectNoteCompo() {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      gap={3}
      fontWeight="fontWeightBold"
    >
      <Image src={selectNote} alt="Select Note" />
      <Typography variant="h4" fontWeight={600}>
        Select a note to view
      </Typography>
      <Typography 
        variant="body1" 
        color="#fff" 
        textAlign="center"
        px={4}>
        Choose a note from the list on the left to view its contents, or create a new note to add to your collection.
      </Typography>
    </Box>
  );
}

export default SelectNoteCompo;