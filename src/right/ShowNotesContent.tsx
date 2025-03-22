"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EditPopup from "./EditPopup";
import EditNote from "./EditNote";
import EditContent from "./EditContent";
import RestoreNoteCompo from "./RestoreNoteCompo";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import dateIcon from "../images/DateIcon.svg";
import closedFolderIcon from "../images/folder_closed_Icon.svg";
import { useRouter } from "next/navigation";
import { fetchNote } from "@/API/api";

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   createdAt: string;
//   deletedAt: string | null;
//   folder: {
//     id: string;
//     name: string;
//   };
// }

interface Folder {
  id: string;
  name: string;
}

// const fetchNote = async (
//   noteId: string | string[] | undefined
// ): Promise<Note> => {
//   const response = await axios.get(
//     `https://nowted-server.remotestate.com/notes/${noteId}`
//   );
//   return response.data.note;
// };

const fetchFolders = async (): Promise<Folder[]> => {
  const response = await axios.get(
    `https://nowted-server.remotestate.com/folders`
  );
  return response.data.folders;
};

export default function ShowNotesContent() {
  const pathname = usePathname();
  const noteId = pathname.split("/").pop();

  const router = useRouter();

  const queryClient = useQueryClient();

  const { data: getNote, isLoading: noteLoading } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNote(noteId),
    enabled: !!noteId,
  });

  const { data: folders, isLoading: foldersLoading } = useQuery({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const saveMutation = useMutation({
    mutationFn: (data: {
      title?: string;
      content?: string;
      folderId?: string;
    }) =>
      axios.patch(
        `https://nowted-server.remotestate.com/notes/${noteId}`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note", noteId] });
      // queryClient.invalidateQueries({queryKey:["notes"]});
    },
  });

  const saveTitleHandler = async (
    id: string,
    newTitle: string
  ): Promise<void> => {
    if (!newTitle.trim()) return;
    await saveMutation.mutateAsync({ title: newTitle });
  };

  const saveContentHandler = async (
    id: string,
    newContent: string
  ): Promise<void> => {
    if (!newContent.trim()) return;
    await saveMutation.mutateAsync({ content: newContent });
  };

  const changeFolderHandler = async (folderId: string): Promise<void> => {
    await saveMutation.mutateAsync({ folderId });
    setAnchorEl(null);
    router.push(`/folder/${folderId}/note/${noteId}`);
  };

  if (noteLoading || foldersLoading) return <CircularProgress />;

  if (!getNote) return <Typography align="center">Loading...</Typography>;

  return getNote.deletedAt ? (
    <RestoreNoteCompo />
  ) : (
    <Box p={4} display="flex" flexDirection="column" gap={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <EditNote
          id={noteId as string}
          name={getNote.title}
          onSave={saveTitleHandler}
        />
        <EditPopup />
      </Box>

      <Box>
        <Box
          display="flex"
          gap={4}
          fontWeight="fontWeightBold"
          py={2}
          borderColor="grey.800"
          borderBottom={'1px solid gray'}
        >
          <Box display="flex" gap={2} color="grey.500">
            <Image src={dateIcon} alt="Date Icon" />
            <Typography>Date</Typography>
          </Box>
          <Typography
            sx={{
              borderBottom: "1px solid",
              borderColor: "grey.500",
            }}
          >
            {new Date(getNote.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Folder Dropdown Section */}
        <Box
          fontWeight="fontWeightBold"
          borderColor="grey.800"
          display="flex"
          alignItems="center"
          gap={3}
          pt={2}
          sx={{ cursor: "pointer" }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Box display="flex" gap={2} color="grey.500">
            <Image src={closedFolderIcon} alt="Date Icon" />
            <Typography>Folder</Typography>
          </Box>
          <Typography borderBottom={"1px solid gray"}>
            {getNote.folder.name}
          </Typography>
          <IconButton size="small">
            <ArrowDropDownIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "grey.800",
                color: "white",
                border: "1px solid #4b5563",
                borderRadius: 2,
                boxShadow: 3,
                maxHeight: "280px",
                overflowY: "auto",
              },
            },
          }}
        >
          {folders?.map((folder) => (
            <MenuItem
              key={folder.id}
              onClick={() => changeFolderHandler(folder.id)}
              sx={{
                py: 1,
                px: 2,
                "&:hover": { backgroundColor: "grey.700" },
              }}
            >
              {folder.name}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box>
        <EditContent
          id={noteId as string}
          content={getNote.content}
          onSave={saveContentHandler}
        />
      </Box>
    </Box>
  );
}
