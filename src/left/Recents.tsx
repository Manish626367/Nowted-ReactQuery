"use client";

import { Box, Typography, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getRecentNotes } from "../API/api";
import Image from "next/image";
import Link from "next/link";
import Documenticon from "../images/Document.svg";

interface DataType {
  id: string;
  title: string;
  folder: {
    id: string;
    name: string;
  };
}

function Resents() {
  const { data: fetchedData = [], isLoading, isError, error } = useQuery({
    queryKey: ["recentNotes"],
    queryFn: getRecentNotes,
  });

  return (
    <Box sx={{ width: "100%", color: "#94A3B8", fontWeight: 600, p: 1 }}>
      <Typography variant="subtitle1" sx={{ color: "#F1F5F9", px: 2, pb: 1 }}>
        Recents
      </Typography>

      {isLoading && <CircularProgress />}
      {isError && (
        <Typography color="error">
          {error instanceof Error ? error.message : "Error fetching data"}
        </Typography>
      )}

      {!isLoading &&
        !isError &&
        fetchedData.map((d: DataType) => (
          <Link
            // href={`/${d.folder.name}/${d.folder.id}/note/${d.id}`}
            href={`/folder/${d.folder.id}/note/${d.id}`}
            key={d.id}
            passHref
            style={{ outline: "none", textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                py: 1,
                px: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#1E293B" },
                "&.active": { backgroundColor: "#1D4ED8", color: "#fff" },
              }}
            >
              <Image src={Documenticon} alt="Document Icon" width={20} height={20} />
              <Typography color="white">{d.title}</Typography>
            </Box>
          </Link>
        ))}
    </Box>
  );
}

export default Resents;
