"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { editFolderName } from "@/API/api";

interface EditFolderNameType {
  id: string;
  name: string;
  setFetchedData: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
}

const EditFolderName: React.FC<EditFolderNameType> = ({ id, name, setFetchedData }) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(name || "");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newName: string) => editFolderName(id, newName),
    onSuccess: (_, newName) => {
      setFetchedData((prev) =>
        prev.map((folder) =>
          folder.id === id ? { ...folder, name: newName } : folder
        )
      );
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
    onError: (error) => {
      console.error("Error updating folder name:", error);
    },
  });

  const handleSaveAPI = () => {
    if (editText.trim() && editText !== name) {
      mutation.mutate(editText.trim());
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <TextField
      variant="standard"
      fullWidth
      autoFocus
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={handleSaveAPI}
      onKeyDown={(e) => e.key === "Enter" && handleSaveAPI()}
      sx={{ input: { color: "white" } }}
    />
  ) : (
    <Typography
      onDoubleClick={() => setIsEditing(true)}
      sx={{ cursor: "pointer", }}
      color= "rgba(255, 255, 255, 0.6)" fontWeight={550}
    >
      {name}
    </Typography>
  );
};

export default EditFolderName;
