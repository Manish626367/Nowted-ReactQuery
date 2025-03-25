

"use client";

import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { createNote } from "@/API/api";

function CreateNote() {

  const { folderId } = useParams<{ folderId: string | string[] | undefined }>();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (folderId: string | string[]|undefined) => createNote(folderId),
    onSuccess: () => {
      alert("Successfully created note!");
      queryClient.invalidateQueries({queryKey:["notes"]});
    },
  });

  return (
    <Box px={0} sx={{ cursor: "pointer" }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: "44px", 
          fontSize: "1.025rem",
          fontWeight: "600", 
          backgroundColor:"#1c1c1c",
          color: "#fff",
          borderRadius: "4px", 
          "&:hover": {
            backgroundColor: "#F1F5F9", 
            color: "#000",
          },
        }}
        onClick={() => mutation.mutate(folderId)}
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








