

// import { usePathname } from 'next/navigation';

// import React from 'react'

// function ShowCombineNotes() {
   
//     const pathname = usePathname(); 
//    let page
//    console.log(pathname)
//     if(pathname === '/Archived') page = pathname
//     else if(pathname === '/Deleted') page = pathname
//     else page = pathname;
//    return (
//     <div>
//           {page}
//     </div>
//   )
// }

// export default ShowCombineNotes










//-----------------------------------------------------------




// import axios from "axios";
// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import CardFavorite from "./CardFavorite";

// interface DataTypes {
//   id: string;
//   folderId: string | undefined;
//   title: string;
//   preview: string;
//   updatedAt: string;
//   folder: () => void;
// }

// interface CombinedNotesProps {
//   type: "Archived" | "favorites" | "Deleted"  | null;
// }

// const LIMIT = 20;

// const fetchNotes = async (type: string, page: number) => {
//   let url = "";
//   switch (type) {
//     case "Archived":
//       url = `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${LIMIT}`;
//       break;
//     case "favorites":
//       url = `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&page=${page}&limit=${LIMIT}`;
//       break;
//     case "Deleted":
//       url = `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${LIMIT}`;
//       break;
//     default:
//       break;
//   }
//   const response = await axios.get(url);
//   return response.data.notes;
// };

// function ShowCombineNotes({ type }: CombinedNotesProps) {
//   const [page, setPage] = useState(1);

// //   if(!type) return;

//   const { data: notes = [], isLoading, isError } = useQuery({
//     queryKey: ["notes", type, page],
//     queryFn: () => fetchNotes(type, page),
//     placeholderData: (previousData) => previousData,
//   });
  

//   const hasNextPage = notes.length === LIMIT;

//   const handleLoadMore = () => {
//     if (hasNextPage) setPage((prevPage) => prevPage + 1);
//   };

//   if (isError) {
//     return <Typography color="error">Error fetching notes.</Typography>;
//   }


//   return (
//     <Box display="flex" flexDirection="column" gap={2} py={4}>
//       <Typography variant="h4" align="center">
//         { type.charAt(0).toUpperCase() + type.slice(1)}
//       </Typography>

//       {isLoading && notes.length === 0 ? (
//         <Box display="flex" justifyContent="center" mt={3}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <>
//           {notes.map((note: DataTypes) => (
//             <CardFavorite
//               title={note.title}
//               text={note.preview}
//               lastdate={note.updatedAt}
//               id={note.id}
//               key={note.id}
//               type={type}
//             />
//           ))}

//           {hasNextPage && (
//             <Box display="flex" justifyContent="center" mt={3}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleLoadMore}
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Loading..." : "Load More"}
//               </Button>
//             </Box>
//           )}
//         </>
//       )}
//     </Box>
//   );
// }

// export default ShowCombineNotes;





//----------------------------------------------






import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CardFavorite from "./CardFavorite";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: () => void;
}

interface CombinedNotesProps {
  type: "Archived" | "favorites" | "Deleted"  | null;
}

const LIMIT = 20;

const fetchNotes = async (type: "Archived" | "favorites" | "Deleted" | null, page: number) => {
  let url = "";
  switch (type) {
    case "Archived":
      url = `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${LIMIT}`;
      break;
    case "favorites":
      url = `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&page=${page}&limit=${LIMIT}`;
      break;
    case "Deleted":
      url = `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${LIMIT}`;
      break;
    default:
      break;
  }
  const response = await axios.get(url);
  return response.data.notes;
};

function ShowCombineNotes({ type }: CombinedNotesProps) {
  const [page, setPage] = useState(1);

//   if(!type) return;

  const { data: notes = [], isLoading, isError } = useQuery({
    queryKey: ["notes", type, page],
    queryFn: () => fetchNotes(type, page),
    placeholderData: (previousData) => previousData,
  });
  

  const hasNextPage = notes.length === LIMIT;

  const handleLoadMore = () => {
    if (hasNextPage) setPage((prevPage) => prevPage + 1);
  };

  if (isError) {
    return <Typography color="error">Error fetching notes.</Typography>;
  }

if(!type) return []
  return (
    <Box display="flex" flexDirection="column" gap={2} py={4}>
      <Typography variant="h4" align="center">
        { type.charAt(0).toUpperCase() + type.slice(1)}
      </Typography>

      {isLoading && notes.length === 0 ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {notes.map((note: DataTypes) => (
            <CardFavorite
              title={note.title}
              text={note.preview}
              lastdate={note.updatedAt}
              id={note.id}
              key={note.id}
              type={type}
            />
          ))}

          {hasNextPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

export default ShowCombineNotes;