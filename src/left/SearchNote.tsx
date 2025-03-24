"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import { fetchNotes } from "@/API/api";

interface Note {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: { name: string };
}

const SearchNote: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes
  });

  const filteredNotes = useMemo(() => {
    return notes.filter((note: Note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, notes]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  if (isLoading) return <CircularProgress />;

  if (isError) return <Typography color="error">Error fetching notes!</Typography>;

  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap: 1 }}>
      <TextField type="text" value={searchTerm} onChange={handleSearch} fullWidth variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            height: "36px",
            fontSize: "14px",
            "& fieldset, &:hover fieldset, &.Mui-focused fieldset": { borderColor: "#fff" }
          },
          "& .MuiInputBase-input, & .MuiInputLabel-root": { color: "#fff" }
        }}
        
      />
      <Box sx={{ maxHeight: "150px", overflowY: "auto", borderBottom: "1px solid #ccc", borderRadius: "4px", "&::-webkit-scrollbar": { display: "none" } }}>
        {searchTerm && filteredNotes.length > 0 ? (
          filteredNotes.map((note: Note) => (
            <Link href={`/folder/${note.folderId}/note/${note.id}`} key={note.id} style={{ display: "block", padding: "10px", borderBottom: "1px solid #ddd", color: "#fff", textDecoration: "none" }}>
              {note.title}
            </Link>
          ))
        ) : searchTerm ? (
          <Typography sx={{ padding: 1 }}>No notes found!</Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default SearchNote;
