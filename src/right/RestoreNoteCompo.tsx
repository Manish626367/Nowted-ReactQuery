

"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Typography, CircularProgress, Container } from '@mui/material';
import Image from 'next/image';
import restore from "../images/Restore.svg";
import { usePathname, useRouter } from 'next/navigation';
import {  restoreNoteApi } from '@/API/api';

interface Note {
  title: string;
  content: string;
  createdAt: string;
  folderId: string;
  folder: { name: string };
}

async function fetchNoteDetails(noteId: string): Promise<Note> {
  const response = await axios.get(`https://nowted-server.remotestate.com/notes/${noteId}`);
  return response.data.note;
}

export default function RestoreNoteCompo() {
  const pathname = usePathname();
  const noteId = pathname.split("/").pop();
  
  const section = pathname.split("/")[1];

  const queryClient = useQueryClient();

  const router = useRouter();

  const {
    data: getNote,
    isLoading,
    isError,
    
  } = useQuery<Note, Error>({
    queryKey: ['noteDetails', noteId],
    queryFn: () => fetchNoteDetails(noteId as string),
    enabled: !!noteId,
  });

  const restoreMutation = useMutation({
    mutationFn: () => restoreNoteApi(noteId as string),
    onSuccess: async () => {
  
      queryClient.invalidateQueries({queryKey:["notes"]});
      queryClient.invalidateQueries({ queryKey: ["note", noteId] });

      if (!(section === 'Archived' || section === 'favorites') && getNote?.folderId) {
        router.push(`/folder/${getNote.folderId}/note/${noteId}`);
      }      
      else  if(section === 'Archived' || section === 'favorites') router.push(`/${section}/note/${noteId}`)
    },
    onError: (error) => {
      console.error('Error restoring note:', error);
    },
  });

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 3 }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 3 }}>
        <Typography variant="h3" fontWeight="bold" color="error">
          Error loading note details.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 3 }}>

      <Image src={restore} alt="Restore Icon" width={100} height={100} />
      <Typography variant="h4" fontWeight="bold">
        Restore &quot;{getNote?.title || 'Untitled Note'}&quot;
      </Typography>
      <Typography color="#fff" textAlign="center" px={2}>
        Don&apos;t want to lose this note? It&apos;s not too late! Just click the &apos;Restore&apos; button and it will be added back to your list. It&apos;s that simple.
      </Typography>

      {restoreMutation.isPending && <CircularProgress color="primary" />}

      {getNote && (
        <Button variant="contained" sx={{ fontFamily: "Arial, sans-serif" }} color="primary" onClick={() => restoreMutation.mutate()} disabled={restoreMutation.isPending}>
          Restore
        </Button>
      )}
    </Container>
  );
}
