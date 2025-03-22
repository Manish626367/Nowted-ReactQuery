// "use client";

// import { Box, TextareaAutosize, Typography } from "@mui/material";
// import { useMutation } from "@tanstack/react-query";

// interface EditContentProps {
//   id: string;
//   content: string;
//   onSave: (id: string, newContent: string) => Promise<void>;
// }

// function EditContent({ id, content: initialContent, onSave }: EditContentProps) {
//   const mutation = useMutation({
//     // mutationFn: (newContent: string) => onSave(id, newContent),
//     mutationFn: async (newContent: string) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Debounce logic
//       await onSave(id, newContent);
//     },
    
//   });

//   const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
//     const updatedContent = e.target.value.trim();
//     if (updatedContent && updatedContent !== initialContent) {
//       mutation.mutate(updatedContent);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         fontFamily: "Arial, sans-serif",
//         height: "calc(100vh - 100px)", // Adjust height dynamically
//         overflowY: "auto", // Enable scrolling within the content area
//         boxSizing: "border-box", 
//         backgroundColor: "#000", 
//       }}
//     >
//       {mutation.status === 'pending' || mutation.status === 'success' ? (
//         <Typography
//           sx={{ 
//             whiteSpace: "pre-wrap", 
//             cursor: "pointer" ,
//             lineHeight: "1.6",
//             fontSize: "16px",
//           }}
//         >
//           {mutation.data || initialContent || "Click to add content..."}
//         </Typography>
//       ) : (
//         <TextareaAutosize
//           defaultValue={initialContent}
//           onBlur={handleBlur}
//           minRows={10}
//           placeholder="Click to add content..."
//           style={{
//             width: "100%",
//             height: "auto", 
//             backgroundColor: "transparent",
//             color: "#fff",
//             borderRadius: "8px",
//             outline: "none",
//             resize: "none", 
//             fontFamily: "Arial, sans-serif",
//             lineHeight: "1.6",
//             fontSize: "16px",
//           }}
//         />
//       )}
//     </Box>
//   );
// }

// export default EditContent;













// "use client";

// import { Box, TextareaAutosize, Typography } from "@mui/material";
// import { useMutation } from "@tanstack/react-query";

// interface EditContentProps {
//   id: string;
//   content: string;
//   onSave: (id: string, newContent: string) => Promise<void>;
// }

// function EditContent({ id, content: initialContent, onSave }: EditContentProps) {
//   const mutation = useMutation({
//     mutationFn: async (newContent: string) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Debounce logic
//       await onSave(id, newContent);
//     },
//   });

//   const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
//     const updatedContent = e.target.value.trim();
//     if (updatedContent && updatedContent !== initialContent) {
//       mutation.mutate(updatedContent); 
//     }
//   };

//   return (
//     <Box
//       sx={{
//         fontFamily: "Arial, sans-serif",
//         height: "calc(100vh - 100px)", 
//         overflowY: "auto", 
//         boxSizing: "border-box", 
//         backgroundColor: "#000", 
//       }}
//     >
//       {mutation.status === 'pending' || mutation.status === 'success' ? (
//         <Typography
//           onClick={() => {
//             // Enable editing by triggering a re-render
//             mutation.reset();
//           }}
//           sx={{ 
//             whiteSpace: "pre-wrap", 
//             cursor: "pointer",
//             lineHeight: "1.6",
//             fontSize: "16px",
//           }}
//         >
//           {mutation.data || initialContent || "Click to add content..."}
//         </Typography>
//       ) : (
//         <TextareaAutosize
//           defaultValue={initialContent} // Use defaultValue instead of value
//           onBlur={handleBlur} // Save on blur
//           minRows={10}
//           placeholder="Click to add content..."
//           style={{
//             width: "100%",
//             height: "auto", 
//             backgroundColor: "transparent",
//             color: "#fff",
//             borderRadius: "8px",
//             outline: "none",
//             border: "none", // Remove border by default
//             resize: "none", 
//             fontFamily: "Arial, sans-serif",
//             lineHeight: "1.6",
//             fontSize: "16px",
//           }}
//         />
//       )}
//     </Box>
//   );
// }

// export default EditContent;










//---------------------------------------------









"use client";

import { Box, TextareaAutosize, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Note {
  id: string;
  content: string;
}

interface EditContentProps {
  id: string;
  content: string;
  onSave: (id: string, newContent: string) => Promise<void>;
}

function EditContent({ id, content: initialContent, onSave }: EditContentProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newContent: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await onSave(id, newContent);
    },
    onMutate: async (newContent) => {
      await queryClient.cancelQueries({ queryKey: ["note", id] });

      const previousContent = queryClient.getQueryData<Note>(["note", id]);

      queryClient.setQueryData<Note>(["note", id], (oldData) => ({
        ...oldData!,
        content: newContent,
      }));

      return { previousContent };
    },
    onError: (error, variables, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData<Note>(["note", id], context.previousContent);
      }
      alert("Error updating content!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", id] });
    },
  });

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const updatedContent = e.target.value.trim();
    if (updatedContent && updatedContent !== initialContent) {
      mutation.mutate(updatedContent);
    }
  };

  return (
    <Box
      sx={{
        fontFamily: "Arial, sans-serif",
        height: "calc(100vh - 100px)",
        overflowY: "auto", 
        boxSizing: "border-box", 
        backgroundColor: "#000", 
      }}
    >
      {mutation.status === 'pending' || mutation.status === 'success' ? (
        <Typography
          onClick={() => mutation.reset()} 
          sx={{ 
            whiteSpace: "pre-wrap", 
            cursor: "pointer",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        >
          {mutation.variables || initialContent || "Click to add content..."}
        </Typography>
      ) : (
        <TextareaAutosize
          defaultValue={initialContent} 
          onBlur={handleBlur} 
          minRows={10}
          placeholder="Click to add content..."
          style={{
            width: "100%",
            height: "auto", 
            backgroundColor: "transparent",
            color: "#fff",
            borderRadius: "8px",
            outline: "none",
            border: "none", 
            resize: "none", 
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.6",
            fontSize: "16px",
          }}
        />
      )}
    </Box>
  );
}

export default EditContent;