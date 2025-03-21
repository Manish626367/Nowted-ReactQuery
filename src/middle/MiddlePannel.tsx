import React from 'react'
// import ShowCombineNotes from './ShowCombineNotes'
// import ShowFolderNotes from './ShowFolderNotes'
import { useParams, usePathname } from 'next/navigation'
import { Typography } from '@mui/material'
import MiddleTesting from './MiddleTesting'
// import { Typography } from '@mui/material'

function MiddlePannel() {
 const{folderId} =useParams()
 
 const pathname = usePathname();
 const getNoteType = (pathname: string): "Archived" | "favorites" | "Deleted" | null => {
  if (pathname.includes("Archived")) return "Archived";
  if (pathname.includes("favorites")) return "favorites";
  if (pathname.includes("Deleted")) return "Deleted";
  return null;
};

const noteType = getNoteType(pathname);

    // Handle home route properly
    if (!folderId && !noteType) {
      return <Typography variant='h5' align="center">Welcome to Nowted! Select a folder to view notes.</Typography>
  }
 
 return (
    <div>
      {/* <ShowFolderNotes/> */}
       {/* {folderId?<ShowFolderNotes/>:<ShowCombineNotes type={noteType}/>} */}
        <MiddleTesting type={noteType}/>
    </div>
  )
}

export default MiddlePannel
