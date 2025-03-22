// "use client";

// import { useRouter, usePathname, useParams } from "next/navigation";
// import { Button, Typography, Paper } from "@mui/material";
// import { useQuery, useMutation } from "@tanstack/react-query";

// import axios from "axios";
// // import MainEditButton from "../images/editIcon.svg";
// import { deleteNote } from "@/API/api";

// import favoriteIcon from "../images/Favorites.svg"
// import trashIcon from "../images/trash.svg"
// import archivedIcon from "../images/Archieved.svg"
// import MainEditButton from "./MainEditButton";

// const fetchNote = async (noteId: string) => {
//   const { data } = await axios.get(
//     `https://nowted-server.remotestate.com/notes/${noteId}`
//   );
//   return data.note;
// };

// const OptionPopup = ({ closePopup }: { closePopup: () => void }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { folderId } = useParams();

//   const section = pathname.split("/")[1];
//   const noteId =  pathname.split("/")[4];

//   console.log(noteId, folderId);
  

//   const {
//     data: note,
//     isError,
//     isLoading,
//   } = useQuery({
//     queryKey: ["note", noteId],
//     queryFn: () => fetchNote(noteId as string),
//     enabled: !!noteId,
//   });

//   const updateNoteMutation = useMutation({
//     mutationFn: async (type: string) => {
//       const updateApi = `https://nowted-server.remotestate.com/notes/${noteId}`;
//       const payload =
//         type === "Favorite"
//           ? { isFavorite: !note?.isFavorite }
//           : { isArchived: !note?.isArchived };

//       const response = await axios.patch(updateApi, payload, {
//         headers: { "Content-Type": "application/json" },
//       });

//       return response.data;
//     },
//     onSuccess: (updatedNote, variables) => {
//       const type = variables;
//       if (type === "Favorite") {
//         alert(
//           updatedNote.isFavorite
//             ? "Added to Favorites!"
//             : "Unfavorited Successfully!"
//         );
//         if (section === "favorites") router.push("/favorites");
//       } else {
//         alert(
//           updatedNote.isArchived
//             ? "Archived Successfully!"
//             : "Unarchived Successfully!"
//         );

//         if (folderId ) {
//           router.push(`/folder/${folderId}`);
//         } else if (section === "Recent") {
//           router.push("/");
//         } else {
//           router.push(`/${section}`);
//         }
//       }
//       closePopup();
//     },
//     onError: (error) => {
//       console.error("Error updating note:", error);
//       alert("Error updating note status!");
//     },
//   });

//   const handleDelete = async () => {
//     if (!noteId) return;
//     try {
//       await deleteNote(noteId);
//       alert("Deleted Successfully!");

//       if (folderId ) {
//         router.push(`/folder/${folderId}/note/${noteId}`);
//       } else {
//         router.push(`/${section}/note/${noteId}`);
//       }
//     } catch (error) {
//       console.error("Error deleting note:", error);
//       alert("Error in deleting!");
//     }
//     closePopup();
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading note details.</p>;

//   return (
//     <Paper
//       sx={{
//         position: "absolute",
//         top: "48px",
//         right: 0,
//         backgroundColor: "black",
//         color:"white",
//         boxShadow: 3,
//         borderRadius: "8px",
//         p: 2,
//         width: "160px",
//         border: "1px solid #ddd",
//       }}
//     >
//       <MainEditButton
//         icon={favoriteIcon}
//         text={note?.isFavorite ? "Unfavorite" : "Favorite"}
//         onClick={() => updateNoteMutation.mutate("Favorite")}
//       />
//       <MainEditButton
//         icon={archivedIcon}
//         text={note?.isArchived ? "Unarchive" : "Archive"}
//         onClick={() => updateNoteMutation.mutate("Archive")}
//       />
     
//       <MainEditButton icon={trashIcon} text="Delete" onClick={handleDelete} />

//       <Button
//         fullWidth
//         variant="outlined"
//         onClick={closePopup}
//         sx={{
//           mt: 1,
//           color: "white",
//           backgroundColor: "black",
//           "&:hover": {
//             backgroundColor: "#1976d2",
//             color: "white",
//           },
//         }}
//       >
//         <Typography>Close</Typography>
//       </Button>
//     </Paper>
//   );
// };

// export default OptionPopup;








//--------------------------------------------



// "use client";

// import { useRouter, usePathname, useParams } from "next/navigation";
// import { Button, Typography, Paper } from "@mui/material";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { deleteNote } from "@/API/api";
// import favoriteIcon from "../images/Favorites.svg";
// import trashIcon from "../images/trash.svg";
// import archivedIcon from "../images/Archieved.svg";
// import MainEditButton from "./MainEditButton";

// const fetchNote = async (noteId: string) => {
//   try {
//     const { data } = await axios.get(
//       `https://nowted-server.remotestate.com/notes/${noteId}`
//     );
//     return data.note;
//   } catch (error) {
//     console.error("Error fetching note:", error);
//     throw new Error("Failed to fetch note");
//   }
// };

// const OptionPopup = ({ closePopup }: { closePopup: () => void }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { folderId } = useParams();
//   const queryClient = useQueryClient();

//   const section = pathname.split("/")[1];
//   const noteId = pathname.split("/").pop();

//   console.log("Note ID:", noteId, "Folder ID:", folderId);

//   const {
//     data: note,
//     isError,
//     isLoading,
//   } = useQuery({
//     queryKey: ["note", noteId],
//     queryFn: () => fetchNote(noteId as string),
//     enabled: !!noteId,
//   });

//   const updateNoteMutation = useMutation({
//     mutationFn: async (type: string) => {
//       const updateApi = `https://nowted-server.remotestate.com/notes/${noteId}`;
//       const payload =
//         type === "Favorite"
//           ? { isFavorite: !note?.isFavorite }
//           : { isArchived: !note?.isArchived };
  
//       const response = await axios.patch(updateApi, payload, {
//         headers: { "Content-Type": "application/json" },
//       });
  
//       return response.data;
//     },
//     onMutate: async (type) => {
//       await queryClient.cancelQueries(["note", noteId]);
  
//       const previousNote = queryClient.getQueryData(["note", noteId]);
  
//       queryClient.setQueryData(["note", noteId], (oldData:any) => ({
//         ...oldData,
//         isFavorite: type === "Favorite" ? !oldData?.isFavorite : oldData?.isFavorite,
//         isArchived: type === "Archive" ? !oldData?.isArchived : oldData?.isArchived,
//       }));
  
//       return { previousNote };
//     },
//     onError: (error, context) => {
//       console.error("Error updating note:", error);
//       queryClient.setQueryData(["note", noteId], context?.previousNote);
//       alert("Error updating note status!");
//     },
//   onSuccess: (updatedNote, variables) => {
//     queryClient.invalidateQueries(["note", noteId]);
//     const type = variables;
//     if (type === "Favorite") {
//       alert(
//         note.isFavorite
//           ? "Added to Favorites!"
//           : "Unfavorited Successfully!"
//       );
  
//       if (section === "favorites") {
//         router.push("/favorites");
//       }
//     } else {
//       alert(
//         note.isArchived
//           ? "Archived Successfully!"
//           : "Unarchived Successfully!"
//       );
  
//       if (folderId) {
//         router.push(`/folder/${folderId}`);
//       } else if (section === "Recent") {
//         router.push("/");
//       } else {
//         router.push(`/${section}`);
//       }
//     }
//     closePopup();
//   }
// })


// //----------

// const deleteNoteMutation = useMutation({
//   mutationFn: async () => {
//     await deleteNote(noteId as string);
//   },
//   onSuccess: () => {
//     alert("Deleted Successfully!");
    
//     queryClient.invalidateQueries(["note", noteId]);
//     queryClient.invalidateQueries(["notes"]); 
    
//     if (folderId) {
//       router.push(`/folder/${folderId}`);
//     } else {
//       router.push(`/${section}`);
//     }

//     closePopup();
//   },
//   onError: (error) => {
//     console.error("Error deleting note:", error);
//     alert("Error in deleting!");
//   }
// });

  

//   const handleDelete = async () => {
//     if (!noteId) return;
//     deleteNoteMutation.mutate();
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading note details.</p>;

//   return (
//     <Paper
//       sx={{
//         position: "absolute",
//         top: "48px",
//         right: 0,
//         backgroundColor: "black",
//         color: "white",
//         boxShadow: 3,
//         borderRadius: "8px",
//         p: 2,
//         width: "160px",
//         border: "1px solid #ddd",
//       }}
//     >
//       <MainEditButton
//         icon={favoriteIcon}
//         text={note?.isFavorite ? "Unfavorite" : "Favorite"}
//         onClick={() => updateNoteMutation.mutate("Favorite")}
//       />
//       <MainEditButton
//         icon={archivedIcon}
//         text={note?.isArchived ? "Unarchive" : "Archive"}
//         onClick={() => updateNoteMutation.mutate("Archive")}
//       />
     
//       <MainEditButton icon={trashIcon} text="Delete" onClick={handleDelete} />

//       <Button
//         fullWidth
//         variant="outlined"
//         onClick={closePopup}
//         sx={{
//           mt: 1,
//           color: "white",
//           backgroundColor: "black",
//           "&:hover": {
//             backgroundColor: "#1976d2",
//             color: "white",
//           },
//         }}
//       >
//         <Typography>Close</Typography>
//       </Button>
//     </Paper>
//   );
// };

// export default OptionPopup;



//---------------------------------------------------










// "use client";

// import { useRouter, usePathname, useParams } from "next/navigation";
// import {  Paper } from "@mui/material";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { deleteNote } from "@/API/api";
// import favoriteIcon from "../images/Favorites.svg";
// import trashIcon from "../images/trash.svg";
// import archivedIcon from "../images/Archieved.svg";
// import MainEditButton from "./MainEditButton";


// interface NoteData {
//   isFavorite?: boolean;
//   isArchived?: boolean;
// }


// const fetchNote = async (noteId: string) => {
//   try {
//     const { data } = await axios.get(
//       `https://nowted-server.remotestate.com/notes/${noteId}`
//     );
//     return data.note;
//   } catch (error) {
//     console.error("Error fetching note:", error);
//     throw new Error("Failed to fetch note");
//   }
// };

// const OptionPopup = ({ closePopup }: { closePopup: () => void }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { folderId } = useParams();
//   const queryClient = useQueryClient();

//   const section = pathname.split("/")[1];
//   const noteId = pathname.split("/").pop();

//   console.log("Note ID:", noteId, "Folder ID:", folderId);

//   const {
//     data: note,
//     isError,
//     isLoading,
//   } = useQuery({
//     queryKey: ["note", noteId],
//     queryFn: () => fetchNote(noteId as string),
//     enabled: !!noteId,
//   });

//   const updateNoteMutation = useMutation({
//     mutationFn: async (type: string) => {
//       const updateApi = `https://nowted-server.remotestate.com/notes/${noteId}`;
//       const payload =
//         type === "Favorite"
//           ? { isFavorite: !note?.isFavorite }
//           : { isArchived: !note?.isArchived };
  
//       const response = await axios.patch(updateApi, payload, {
//         headers: { "Content-Type": "application/json" },
//       });
  
//       return response.data;
//     },
//     onMutate: async (type: string) => {
//       await queryClient.cancelQueries({ queryKey: ["note", noteId] });

//       const previousNote = queryClient.getQueryData<NoteData>(["note", noteId]);
  
//       if (!previousNote) {
//         throw new Error("Note data not found");
//       }

//       queryClient.setQueryData(["note", noteId], {
//         ...previousNote,
//         isFavorite: type === "Favorite" ? !previousNote.isFavorite : previousNote.isFavorite,
//         isArchived: type === "Archive" ? !previousNote.isArchived : previousNote.isArchived,
//       });
  
//       return { previousNote };
//     },
  
//   onError: (error, variables, context?: { previousNote: NoteData }) => {
//       console.error("Error updating note:", error);
//       if (context?.previousNote) {
//           queryClient.setQueryData(["note", noteId], context.previousNote);
//       }
//       alert("Error updating note status!");
//   },

//   onSuccess: (updatedNote, variables) => {
//     queryClient.invalidateQueries({queryKey:["note", noteId]});
//     queryClient.invalidateQueries({ queryKey: ["notes"] });
//     const type = variables;
//     if (type === "Favorite") {
//       alert(
//         note.isFavorite
//           ? "Added to Favorites!"
//           : "Unfavorited Successfully!"
//       );
  
//       if (section === "favorites") {
//         router.push("/favorites");
//       }
//     } else {
//       alert(
//         note.isArchived
//           ? "Archived Successfully!"
//           : "Unarchived Successfully!"
//       );
  
//       if (folderId) {
//         router.push(`/folder/${folderId}`);
//       } else if (section === "Recent") {
//         router.push("/");
//       } else {
//         router.push(`/${section}`);
//       }
//     }
//     closePopup();
//   }
// })


// //----------

// const deleteNoteMutation = useMutation({
//   mutationFn: async () => {
//     await deleteNote(noteId as string);
//   },
//   onSuccess: () => {
//     alert("Deleted Successfully!");
    
//     queryClient.invalidateQueries({queryKey:["note", noteId]});
//     queryClient.invalidateQueries({ queryKey: ["notes"] });

    
//     if (folderId) {
//       router.push(`/folder/${folderId}/note/${noteId}`);
//     } else {
//       router.push(`/${section}/note/${noteId}`);
//     }

//     closePopup();
//   },
//   onError: (error) => {
//     console.error("Error deleting note:", error);
//     alert("Error in deleting!");
//   }
// });

  

//   const handleDelete = async () => {
//     if (!noteId) return;
//     deleteNoteMutation.mutate();
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading note details.</p>;

//   return (
//     <Paper
//     sx={{
//       position: "absolute",
//       top: "48px",
//       right: 0,
//       backgroundColor: "#121212",
//       color: "#fff",
//       boxShadow: 5,
//       borderRadius: "12px",
//       width: "180px",
//       border: "1px solid #444",
//     }}
//     >
//       <MainEditButton
//         icon={favoriteIcon}
//         text={note?.isFavorite ? "Unfavorite" : "Favorite"}
//         onClick={() => updateNoteMutation.mutate("Favorite")}
//       />
//       <MainEditButton
//         icon={archivedIcon}
//         text={note?.isArchived ? "Unarchive" : "Archive"}
//         onClick={() => updateNoteMutation.mutate("Archive")}
//       />
     
//       <MainEditButton icon={trashIcon} text="Delete" onClick={handleDelete} />


//     </Paper>
//   );
// };

// export default OptionPopup;









//-----------------------------------------------------------------







"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import {  Paper } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteNote } from "@/API/api";
import favoriteIcon from "../images/Favorites.svg";
import trashIcon from "../images/trash.svg";
import archivedIcon from "../images/Archieved.svg";
import MainEditButton from "./MainEditButton";


interface NoteData {
  isFavorite?: boolean;
  isArchived?: boolean;
}


const fetchNote = async (noteId: string) => {
  try {
    const { data } = await axios.get(
      `https://nowted-server.remotestate.com/notes/${noteId}`
    );
    return data.note;
  } catch (error) {
    console.error("Error fetching note:", error);
    throw new Error("Failed to fetch note");
  }
};

const OptionPopup = ({ closePopup }: { closePopup: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { folderId } = useParams();
  const queryClient = useQueryClient();

  const section = pathname.split("/")[1];
  const noteId = pathname.split("/").pop();

  console.log("Note ID:", noteId, "Folder ID:", folderId);

  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId as string),
    enabled: !!noteId,
  });

  const updateNoteMutation = useMutation({
    mutationFn: async (type: string) => {
      const updateApi = `https://nowted-server.remotestate.com/notes/${noteId}`;
      const payload =
        type === "Favorite"
          ? { isFavorite: !note?.isFavorite }
          : { isArchived: !note?.isArchived };
  
      const response = await axios.patch(updateApi, payload, {
        headers: { "Content-Type": "application/json" },
      });
  
      return response.data;
    },
    onMutate: async (type: string) => {
      await queryClient.cancelQueries({ queryKey: ["note", noteId] });

      const previousNote = queryClient.getQueryData<NoteData>(["note", noteId]);
  
      if (!previousNote) {
        throw new Error("Note data not found");
      }

      queryClient.setQueryData(["note", noteId], {
        ...previousNote,
        isFavorite: type === "Favorite" ? !previousNote.isFavorite : previousNote.isFavorite,
        isArchived: type === "Archive" ? !previousNote.isArchived : previousNote.isArchived,
      });
  
      return { previousNote };
    },
  
  onError: (error, variables, context?: { previousNote: NoteData }) => {
      console.error("Error updating note:", error);
      if (context?.previousNote) {
          queryClient.setQueryData(["note", noteId], context.previousNote);
      }
      alert("Error updating note status!");
  },

  onSuccess: (updatedNote, variables) => {
    queryClient.invalidateQueries({queryKey:["note", noteId]});
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    const type = variables;
    if (type === "Favorite") {
      alert(
        note.isFavorite
          ? "Added to Favorites!"
          : "Unfavorited Successfully!"
      );
  
      if (section === "favorites") {
        router.push("/favorites");
      }
    } else {
      alert(
        note.isArchived
          ? "Archived Successfully!"
          : "Unarchived Successfully!"
      );
  
      if (folderId) {
        router.push(`/folder/${folderId}`);
      } else if (section === "Recent") {
        router.push("/");
      } else {
        router.push(`/${section}`);
      }
    }
    closePopup();
  }
})


//----------

const deleteNoteMutation = useMutation({
  mutationFn: async () => {
    await deleteNote(noteId as string);
  },
  onSuccess: () => {
    alert("Deleted Successfully!");
    
    queryClient.invalidateQueries({queryKey:["note", noteId]});
    queryClient.invalidateQueries({ queryKey: ["notes"] });

    
    if (folderId) {
      router.push(`/folder/${folderId}/note/${noteId}`);
    } else {
      router.push(`/${section}/note/${noteId}`);
    }

    closePopup();
  },
  onError: (error) => {
    console.error("Error deleting note:", error);
    alert("Error in deleting!");
  }
});

  

  const handleDelete = async () => {
    if (!noteId) return;
    deleteNoteMutation.mutate();
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note details.</p>;

  return (
    <Paper
    sx={{
      position: "absolute",
      top: "48px",
      right: 0,
      backgroundColor: "#121212",
      color: "#fff",
      boxShadow: 5,
      borderRadius: "12px",
      width: "180px",
      border: "1px solid #444",
    }}
    >
      <MainEditButton
        icon={favoriteIcon}
        text={note?.isFavorite ? "Unfavorite" : "Favorite"}
        onClick={() => updateNoteMutation.mutate("Favorite")}
      />
      <MainEditButton
        icon={archivedIcon}
        text={note?.isArchived ? "Unarchive" : "Archive"}
        onClick={() => updateNoteMutation.mutate("Archive")}
      />
     
      <MainEditButton icon={trashIcon} text="Delete" onClick={handleDelete} />


    </Paper>
  );
};

export default OptionPopup;











//-----------------------------------------------------------------







