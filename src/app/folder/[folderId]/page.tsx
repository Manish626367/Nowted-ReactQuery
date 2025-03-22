// import MiddlePannel from '@/middle/MiddlePannel';
// import { Box } from '@mui/material';
import SelectNoteCompo from '@/right/SelectNoteCompo';
import React from 'react'

function FolderPage() {
console.log("folder ka data ");

  return (
        <>
          {/* <Box
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
           <MiddlePannel/>
          </Box>
          <Box>default page</Box> */}
          <SelectNoteCompo/>
        </>
      );
}

export default FolderPage
