

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation"; 
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import deleteIcon from "../images/trash.svg";
import EditFolderName from "./EditFolderName";
import createFolderIcon from "../images/CreateFolderIcon.png";
import Image from "next/image";
import { addNewFolder, deleteFolder, getFolders } from "@/API/api";
import openFolderIcon from "../images/folder_open.svg";
import closeFolderIcon from "../images/folder_closed_Icon.svg";
import Link from "next/link";


interface FolderDataType {
  id: string;
  name: string;
}

function Folder() {

  const queryClient = useQueryClient();
  const {folderId} = useParams();

  const {
    data: fetchedData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });


  const addFolderMutation = useMutation({
    mutationFn: () => addNewFolder(" new folder "),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      alert("Successfully created New Folder!");
    },
    onError: () => alert("Error in creating Folder"),
  });

  

  const deleteFolderMutation = useMutation({
    mutationFn: (id: string) => deleteFolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
      alert("Successfully deleted Folder!");
    },
    onError: () => alert("Error deleting folder"),
  });


  if (isLoading) return <CircularProgress />;

  if (isError) return <Typography color="error">Error fetching folders!</Typography>;

  return (
    <Box sx={{ width: "100%",color: "#94A3B8",fontWeight: 600,gap: 1,padding: "10px",}} >
      <Box display="flex" justifyContent="space-between" px={2}>
        <Typography variant="subtitle1" style={{  padding: "3px 0px " }} color= "rgba(255, 255, 255, 0.6)" fontWeight={550} >
          Folders
        </Typography>
        <IconButton onClick={() => addFolderMutation.mutate()}>
          <Image src={createFolderIcon} alt="Search icon" />
        </IconButton>
      </Box>

      <Box>
        {fetchedData.map((d: FolderDataType) => {
        const isActive = d.id === folderId
          return (
            <Box key={d.id} sx={{ "&:hover": { backgroundColor: "#1E293B" }, backgroundColor: isActive ? "#1E293B" : "transparent", display: "flex", justifyContent: "space-between", py: 1, px: 2,}} >
              <Link href={`/folder/${d.id}`} key={d.id} passHref style={{ outline: "none", textDecoration: "none" }}>
                <Box display="flex" pt={1} gap={2} alignItems="center" sx={{ cursor: "pointer" }} >
                  {isActive ? ( 
                    <Image src={openFolderIcon} alt="Open Folder" />
                  ) : (
                    <Image src={closeFolderIcon} alt="Closed Folder" />
                  )}
                  <EditFolderName
                    id={d.id}
                    name={d.name}
                    setFetchedData={(updatedData) => {
                      queryClient.setQueryData(
                        ["folders"],
                        (prevData: FolderDataType[]) =>
                          prevData.map((folder) =>
                            folder.id === d.id
                              ? { ...folder, name: updatedData }
                              : folder
                          )
                      );
                    }}
                  />
                </Box>
              </Link>

              <IconButton sx={{ filter: !isActive ?'invert(40%) sepia(0%) saturate(9000%)':"" }} onClick={() => deleteFolderMutation.mutate(d.id)} >
                <Image src={deleteIcon} alt="deleteIcon" />
              </IconButton>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Folder;



