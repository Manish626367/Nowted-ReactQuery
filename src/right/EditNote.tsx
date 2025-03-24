

import { TextField, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditNoteProps {
  id: string;
  name: string;
  onSave: (id: string, newTitle: string) => Promise<void>;
}

function EditNote({ id, name, onSave }: EditNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTitle: string) => {
      await onSave(id, newTitle); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    },
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      mutation.mutate(value); 
    }, 1500); 
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {isEditing ? (
        <TextField
          value={inputValue}
          autoFocus
          variant="standard"
          onChange={handleChange}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              fontSize: "1.45rem",
              fontWeight: 600,
            },
          }}
        />
      ) : (
        <Typography
          variant="h5"
          sx={{ fontWeight: "550", cursor: "pointer" }}
          onClick={() => setIsEditing(true)}
        >
          {name}
        </Typography>
      )}
    </div>
  );
}

export default EditNote;
