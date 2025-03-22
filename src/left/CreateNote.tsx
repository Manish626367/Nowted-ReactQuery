// "use client";

// import { useParams } from "next/navigation";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Box, Button, Typography } from "@mui/material";
// import { createNote } from "@/API/api";

// function CreateNote() {
//   // const searchParams = useSearchParams();
//   // const folderId = searchParams.get("folderId");
//   const { folderId } = useParams<{ folderId: string | string[] | undefined }>();


//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: () => createNote(folderId),
//     onSuccess: () => {
//       alert("Successfully created note!");
//       queryClient.invalidateQueries({queryKey:["notes", folderId]});
//       // queryClient.invalidateQueries(["notes", folderId]);
      
//     },
//     onError: (error) => {
//       console.error("Error creating note:", error);
//     },
//   });

//   return (
//     <Box px={1} sx={{ cursor: "pointer" }}>
//       <Button
//         variant="contained"
//         fullWidth
//         sx={{
//           height: "44px", 
//           fontSize: "1.025rem",
//           fontWeight: "600",
//           backgroundColor: "#1E293B", 
//           color: "#fff",
//           borderRadius: "4px", 
//           "&:hover": {
//             backgroundColor: "#F1F5F9", 
//             color: "#000",
//           },
//         }}
//         onClick={() => mutation.mutate()}
//       >
//         <Typography variant="h5" component="span" pr={'4px'}>
//           +
//         </Typography>
//         New Note
//       </Button>
//     </Box>
//   );
// }

// export default CreateNote;











//---------------------------------------------------










"use client";

import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { createNote } from "@/API/api";

function CreateNote() {
  // const searchParams = useSearchParams();
  // const folderId = searchParams.get("folderId");
  const { folderId } = useParams<{ folderId: string | string[] | undefined }>();


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createNote(folderId),
    onSuccess: () => {
      alert("Successfully created note!");
      // queryClient.invalidateQueries({queryKey:["notes", folderId]});
      // queryClient.invalidateQueries(["notes", folderId]);
      queryClient.invalidateQueries({queryKey:["notes"]});
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  return (
    <Box px={1} sx={{ cursor: "pointer" }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: "44px", 
          fontSize: "1.025rem",
          fontWeight: "600",
          // backgroundColor: "#1E293B", 
          backgroundColor:"#1c1c1c",
          color: "#fff",
          borderRadius: "4px", 
          "&:hover": {
            backgroundColor: "#F1F5F9", 
            color: "#000",
          },
        }}
        onClick={() => mutation.mutate()}
      >
        <Typography variant="h5" component="span" pr={'4px'}>
          +
        </Typography>
        New Note
      </Button>
    </Box>
  );
}

export default CreateNote;








