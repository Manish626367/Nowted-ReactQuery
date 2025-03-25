"use client";

import { Box, Typography, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getRecentNotes } from "../API/api";
import Image from "next/image";
import Link from "next/link";
import Documenticon from "../images/Document.svg";
import { usePathname } from "next/navigation";

interface DataType {
  id: string;
  title: string;
  folder: {
    id: string;
    name: string;
  };
}

function Resents() {

  const pathname = usePathname();
  const noteId = pathname.split("/").pop();

  const { data: fetchedData = [], isLoading, isError, error } = useQuery({
    queryKey: ["recentNotes"],
    queryFn: getRecentNotes,
  });

  return (
    <Box sx={{ width: "100%", pl: 1 }}>
      <Typography variant="subtitle1" fontWeight={550} sx={{  color: "rgba(255, 255, 255, 0.6)", px: 2, pb: 0 }}>
        Recents
      </Typography>

      {/* {isLoading && <CircularProgress />} */}

      {isError && (
        <Typography color="error">
          {error instanceof Error ? error.message : "Error fetching data"}
        </Typography>
      )}

      {!isLoading &&
        !isError &&
        fetchedData.map((d: DataType) => (
          <Link href={`/folder/${d.folder.id}/note/${d.id}`} key={d.id} passHref style={{ outline: "none", textDecoration: "none" ,  color: "rgba(255, 255, 255, 0.6)",}} >
            <Box sx={{  display: "flex",  gap: 1,  py: 0.5, px: 1, cursor: "pointer", borderRadius:"3px", backgroundColor:noteId === d.id ? "rgba(255, 255, 255, 0.2)" : "", "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }, }} >
              <IconButton sx={{ filter: noteId === d.id ?"" :'invert(40%) sepia(0%) saturate(9000%)' }} >
                  <Image src={Documenticon} alt="Document Icon" width={20} height={20} />
              </IconButton>
              <Typography   pt={1} fontWeight={550}>{d.title}</Typography>
            </Box>
          </Link>
        ))}
    </Box>
  );
}

export default Resents;
