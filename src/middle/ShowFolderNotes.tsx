
// 'use client'

// import { useInfiniteQuery } from "@tanstack/react-query";
// import Card from "./Card";
// import { Box, Button, CircularProgress, Typography } from "@mui/material";
// import { useParams } from "next/navigation";
// import { fetchNotesData } from "@/API/api";

// interface Note {
//   id: string;
//   folderId: string | undefined;
//   title: string;
//   preview: string;
//   updatedAt: string;
//   folder: { name: string };
// }

// interface NotesResponse {
//   notes: Note[];
// }



// function ShowFolderNotes() {
//   const { folderId } = useParams();

//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isLoading,
//   } = useInfiniteQuery<NotesResponse>({
//     queryKey: ["notes", folderId],
//     queryFn: ({ pageParam = 1 }) => fetchNotesData({ pageParam  , folderId: folderId as string }),
//     enabled: !!folderId,
//     initialPageParam: 1, 
//     getNextPageParam: (lastPage: NotesResponse) => {
//       return lastPage.notes.length < 20 ? undefined : (lastPage.notes.length || 1);
//     },
//   });


//   return (
//     <>
//       <Typography variant="h4" sx={{ padding: "20px 16px" }}>
//         {data?.pages[0]?.notes[0]?.folder?.name  || "Loadng...."}
//       </Typography>

//       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {isLoading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {data?.pages.flatMap((page) =>
//               page.notes.map((note: Note) => (
//                 <Card
//                   title={note.title}
//                   text={note.preview}
//                   lastdate={note.updatedAt}
//                   id={note.id}
//                   folderId={folderId as string}
//                   key={note.id}
//                 />
//               ))
//             )}

//             {hasNextPage && (
//               <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
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

// export default ShowFolderNotes;






//-----------------------------------------------------------------------






'use client'

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { fetchNotesData, getFolders } from "@/API/api";

interface Note {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: { name: string };
}

interface NotesResponse {
  notes: Note[];
}

interface folderType{
  id:string,
  name:string,
}


function ShowFolderNotes() {
  const { folderId } = useParams();

  const {
    data: fetchedData = [],
  } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const folder = fetchedData.find((f:folderType) => f.id === folderId);


  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useInfiniteQuery<NotesResponse>({
    queryKey: ["notes", folderId],
    queryFn: ({ pageParam = 1 }) => fetchNotesData({ pageParam, folderId: folderId as string }),
    enabled: !!folderId,
    initialPageParam: 1,
    getNextPageParam: (lastPage: NotesResponse) => {
      return lastPage.notes.length < 20 ? undefined : (lastPage.notes.length || 1);
    },
  });

  return (
    <>
      <Typography variant="h4" sx={{ padding: "20px 16px" }}>
        {isLoading
          ? "Loading..."
          : folder?.name || "Folder not found"}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {data?.pages.flatMap((page) =>
              page.notes.map((note: Note) => (
                <Card
                  title={note.title}
                  text={note.preview}
                  lastdate={note.updatedAt}
                  id={note.id}
                  folderId={folderId as string}
                  key={note.id}
                
                />
              ))
            )}

            {hasNextPage && (
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
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

export default ShowFolderNotes;
