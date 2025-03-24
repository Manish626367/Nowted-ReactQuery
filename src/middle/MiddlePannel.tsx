import React from "react";
import { useParams, usePathname } from "next/navigation";
import { Typography } from "@mui/material";
import MiddleTesting from "./MiddleTesting";

function MiddlePannel() {
  const { folderId } = useParams();
  const pathname = usePathname();

  const getNoteType = (pathname: string): "Archived" | "favorites" | "Deleted" | null => {
    if (pathname.includes("Archived")) return "Archived";
    if (pathname.includes("favorites")) return "favorites";
    if (pathname.includes("Deleted")) return "Deleted";
    return null;
  };

  const noteType = getNoteType(pathname);

  if (!folderId && !noteType) {
    return (
      <Typography variant="h6" align="center">
        No Folder selected
      </Typography>
    );
  }

  return (
    <div>
      <MiddleTesting type={noteType} />
    </div>
  );
}

export default MiddlePannel;
