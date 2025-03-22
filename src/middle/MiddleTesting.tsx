


// 'use client';

// import axios from "axios";
// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
// import CardFavorite from "./CardFavorite";
// import Card from "./Card";
// import { useParams } from "next/navigation";
// import { getFolders } from "@/API/api";

// interface DataTypes {
//   id: string;
//   folderId: string | undefined;
//   title: string;
//   preview: string;
//   updatedAt: string;
//   folder: { name: string };
// }

// interface CombinedNotesProps {
//   type: "Archived" | "favorites" | "Deleted" | null;
// }

// const LIMIT = 20;

// // Unified Data Fetching Logic
// const fetchNotes = async (
//   type: "Archived" | "favorites" | "Deleted" | null,
//   folderId: string |string[]|undefined,
//   page: number
// ): Promise<DataTypes[]> => {
//   let url = "";

//   if (folderId) {
//     url = `https://nowted-server.remotestate.com/notes?folderId=${folderId}&page=${page}&limit=${LIMIT}`;
//   } else {
//     switch (type) {
//       case "Archived":
//         url = `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${LIMIT}`;
//         break;
//       case "favorites":
//         url = `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&page=${page}&limit=${LIMIT}`;
//         break;
//       case "Deleted":
//         url = `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${LIMIT}`;
//         break;
//       default:
//         return [];
//     }
//   }

//   const response = await axios.get(url);
//   return response.data.notes;
// };

// function MiddleTesting({ type }: CombinedNotesProps) {
//   const { folderId } = useParams();

//   const {
//     data: fetchedData = [],
//   } = useQuery({
//     queryKey: ["folders"],
//     queryFn: getFolders,
//   });

//   const folder = fetchedData.find((f: { id: string }) => f.id === folderId);

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isLoading,
//   } = useInfiniteQuery({
//     queryKey: ["notes", type, folderId],
//     queryFn: ({ pageParam = 1 }) => fetchNotes(type, folderId, pageParam),
//     enabled: !!type || !!folderId,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage: DataTypes[], allPages) =>
//       lastPage.length < LIMIT ? undefined : allPages.length + 1,
//   });

//   if (!type && !folderId) {
//     return (
//       <Typography variant="h5" align="center">
//         Welcome to Nowted! Select a folder or category to view notes.
//       </Typography>
//     );
//   }

//   return (
//     <>
//       <Typography variant="h4" sx={{ padding: "20px 16px" }}>
//         {isLoading
//           ? "Loading..."
//           : folder?.name || (type ? type.charAt(0).toUpperCase() + type.slice(1) : "Folder not found")}
//       </Typography>

//       <Box display="flex" flexDirection="column" gap={2} py={4}>
//         {isLoading ? (
//           <Box display="flex" justifyContent="center" mt={3}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {data?.pages.flatMap((page) =>
//               page.map((note: DataTypes) =>
//                 folderId ? (
//                   <Card
//                     title={note.title}
//                     text={note.preview}
//                     lastdate={note.updatedAt}
//                     id={note.id}
//                     folderId={folderId as string}
//                     key={note.id}
//                   />
//                 ) : (
//                   <CardFavorite
//                     title={note.title}
//                     text={note.preview}
//                     lastdate={note.updatedAt}
//                     id={note.id}
//                     key={note.id}
//                     type={type}
//                   />
//                 )
//               )
//             )}

//             {hasNextPage && (
//               <Box display="flex" justifyContent="center" mt={3}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => fetchNextPage()}
//                   disabled={isFetching}
//                 >
//                   {isFetching ? "Loading..." : "Load More"}
//                 </Button>
//               </Box>
//             )}
//           </>
//         )}
//       </Box>
//     </>
//   );
// }

// export default MiddleTesting;











'use client';

import axios from "axios";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getFolders } from "@/API/api";
import Cards from "./Cards";

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: { name: string };
}

interface CombinedNotesProps {
  type: "Archived" | "favorites" | "Deleted" | null;
}

const LIMIT = 20;

// Unified Data Fetching Logic
const fetchNotes = async (
  type: "Archived" | "favorites" | "Deleted" | null,
  folderId: string |string[]|undefined,
  page: number
): Promise<DataTypes[]> => {
  let url = "";

  if (folderId) {
    url = `https://nowted-server.remotestate.com/notes?folderId=${folderId}&page=${page}&limit=${LIMIT}`;
  } else {
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
        return [];
    }
  }

  const response = await axios.get(url);
  
  return response.data.notes;
};

function MiddleTesting({ type }: CombinedNotesProps) {
  const { folderId } = useParams();

  const {
    data: fetchedData = [],
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const folder = fetchedData.find((f: { id: string }) => f.id === folderId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["notes", type, folderId],
    queryFn: ({ pageParam = 1 }) => fetchNotes(type, folderId, pageParam),
    enabled: !!type || !!folderId,
    initialPageParam: 1,
    getNextPageParam: (lastPage: DataTypes[], allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length + 1,
  });



  return (
    <>
      <Typography variant="h5" sx={{ padding: "20px 16px 0px",  fontWeight:"600"}}>
        {isLoading
          ? "Loading..."
          : folder?.name || (type ? type.charAt(0).toUpperCase() + type.slice(1) : "Folder not found")}
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} py={4}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {data?.pages.flatMap((page) =>
              page.map((note: DataTypes) =>
                folderId ? (
                  <Cards
                    title={note.title}
                    text={note.preview}
                    lastdate={note.updatedAt}
                    id={note.id}
                    folderId={folderId as string}
                    key={note.id}
                  />
                ) : (
                  <Cards
                    title={note.title}
                    text={note.preview}
                    lastdate={note.updatedAt}
                    id={note.id}
                    key={note.id}
                    type={type}
                  />
                )
              )
            )}

            {hasNextPage && (
              <Box display="flex" justifyContent="center" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => fetchNextPage()}
                  disabled={isFetching}
                >
                  {isFetching ? "Loading..." : "Load More"}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default MiddleTesting;