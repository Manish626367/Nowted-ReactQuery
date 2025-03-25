

"use client";

import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNotesForMiddle, getFolders } from "@/API/api";
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


function MiddleTesting({ type }: CombinedNotesProps) {
  const { folderId } = useParams();
  const { data: fetchedData = [] } = useQuery({
    queryKey: ["folders"],
    queryFn: getFolders,
  });

  const folder = fetchedData.find((f: { id: string }) => f.id === folderId);

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["notes", type, folderId],
      queryFn: ({ pageParam = 1 }) => fetchNotesForMiddle(type, folderId, pageParam),
      enabled: !!type || !!folderId,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length < 20 ? undefined : allPages.length + 1,
    });

  return (
    <>

     <Typography
        variant="h5"
        sx={{ padding: "20px 16px 0px", fontWeight: "600" }}
      >
        {isLoading
          ? ""
          : folder?.name ||
            (type
              ? type.charAt(0).toUpperCase() + type.slice(1)
              : "Folder not found")}
      </Typography>


      <Box display="flex" flexDirection="column" gap={2} py={4}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress style={{color:"white"}}/>
          </Box>
        ) : (
          <>
            {data?.pages.map((page) =>
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








