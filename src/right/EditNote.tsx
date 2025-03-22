// import { TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface EditNoteProps {
//   id: string;
//   name: string;
//   onSave: (id: string, newTitle: string) => Promise<void>;
// }



// function EditNote({ id, name, onSave }: EditNoteProps) {
//   const [isEditing, setIsEditing] = useState(false);

//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: (newTitle: string) => onSave(id, newTitle),
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey:["notes"]});
//       setIsEditing(false);
//     },
//   });

//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//       {isEditing ? (
//         <TextField
//           defaultValue={name}
//           autoFocus
//           variant="standard"
//           onBlur={(e) => {
//             setIsEditing(false);
//             if (e.target.value.trim() && e.target.value !== name) {
//               mutation.mutate(e.target.value); 
//             }
//           }}
//           sx={{
//             "& .MuiInputBase-input": {
//               color: "white",
//               fontSize: "1.45rem", 
//               fontWeight: "600", 
//             },
//           }}
//         />
//       ) : (
//         <Typography
//           variant="h5"
//           sx={{ fontWeight: "550", cursor: "pointer" }}
//           onClick={() => setIsEditing(true)}
//         >
//           {name}
//         </Typography>
//       )}
//     </div>
//   );
// }

// export default EditNote;










//---------------------------------

import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditNoteProps {
  id: string;
  name: string;
  onSave: (id: string, newTitle: string) => Promise<void>;
}

function EditNote({ id, name, onSave }: EditNoteProps) {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newTitle: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      await onSave(id, newTitle);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsEditing(false);
    },
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {isEditing ? (
        <TextField
          defaultValue={name}
          autoFocus
          variant="standard"
          onChange={(e) => mutation.mutate(e.target.value)}
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
              fontSize: "1.45rem",
              fontWeight: "600",
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

