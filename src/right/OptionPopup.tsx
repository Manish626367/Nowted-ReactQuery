

"use client";

import { useRouter, usePathname, useParams } from "next/navigation";
import {  Paper } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { deleteNote, fetchNoteForConent } from "@/API/api";
import favoriteIcon from "../images/Favorites.svg";
import trashIcon from "../images/trash.svg";
import archivedIcon from "../images/Archieved.svg";
import MainEditButton from "./MainEditButton";

interface NoteDataType {
  isFavorite?: boolean;
  isArchived?: boolean;
}

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
    queryFn: () => fetchNoteForConent(noteId as string),
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

      const previousNote = queryClient.getQueryData<NoteDataType>(["note", noteId]);
  
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
  
  onError: (error, variables, context?: { previousNote: NoteDataType }) => {
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
    <Paper sx={{ position: "absolute", top: "48px", right: 0, backgroundColor: "#121212", color: "#fff", boxShadow: 5, borderRadius: "12px", width: "180px", border: "1px solid #444" }}>

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


