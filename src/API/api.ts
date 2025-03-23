import axios from "axios";


const BASE_URL = "https://nowted-server.remotestate.com";


//--------------------------------------------------------------------
                 // folders Api //


export const getFolders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/folders`);
        return response.data.folders;
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
};


//-----------------------------------------------------------



export const deleteFolder = async (folderId:string) => {
    try {
        await axios.delete(`${BASE_URL}/folders/${folderId}`);
        return true;
    } catch (error) {
        console.error("Error deleting folder:", error);
        return false;
    }
};


//----------------------------------------------------------------------



export const addNewFolder = async (folderName:string) => {
    try {
        await axios.post(`${BASE_URL}/folders`, { name: folderName });
        return true;
    } catch (error) {
        console.error("Error creating folder:", error);
        return false;
    }
};


//-----------------------------------------------------------------------------



export const editFolderName = async (folderId:string, newName:string) => {
    try {
        await axios.patch(`${BASE_URL}/folders/${folderId}`, { name: newName });
        return true;
    } catch (error) {
        console.error("Error updating folder name:", error);
        return false;
    }
};


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

                          // Note APIs //



export const createNote = async (folderId:string | string[] | undefined) => {
  if (!folderId) {
    throw new Error("Folder ID is required");
   }
    try {
        await axios.post(`${BASE_URL}/notes`, {
            folderId,
            title: "New Note 1",
            content: "This is a new note.",
            isFavorite: false,
            isArchived: false,
        });
        return true;
    } catch (error) {
        console.error("Error creating note:", error);
        return false;
    }
};


//-----------------------------------------------------------------------



export const getRecentNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes/recent`);
        return response.data.recentNotes;
    } catch (error) {
        console.error("Error fetching recent notes:", error);
        return [];
    }
};


//-----------------------------------------------------------------------------



export const fetchNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notes`, { params: {
        archived: false,
        deleted: false,
        page: 1,
        limit:'*',
    }, });
      return response.data.notes;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };


  //-----------------------------------------------------------------------

  
  // Fetch Single Note Details
  // export const fetchNoteDetails = async (noteId) => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/notes/${noteId}`);
  //     return response.data.note;
  //   } catch (error) {
  //     console.error("Error fetching note details:", error);
  //     throw error;
  //   }
  // };



  //------ fetching a particular note ------------


  interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    deletedAt: string | null;
    folder: {
      id: string;
      name: string;
    };
  }
  
  export const fetchNote = async (
    noteId: string | string[] | undefined
  ): Promise<Note> => {
    const response = await axios.get(
      `https://nowted-server.remotestate.com/notes/${noteId}`
    );
    return response.data.note;
  };
  


//--------------------------------------------------------------------------------



  export const deleteNote = async (noteId:string | string[]) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${noteId}`);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };


// -------------------------------------------------------------------------------------


  
  // // Update Note Status (Favorite/Archive)
  // export const updateNoteStatus = async (noteId, type, status) => {
  //   try {
  //     const payload =
  //       type === "Favorite" ? { isFavorite: status } : { isArchived: status };
  
  //     const response = await axios.patch(
  //       `${BASE_URL}/notes/${noteId}`,
  //       payload,
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  
  //     return response.data;
  //   } catch (error) {
  //     console.error(`Error updating ${type}:`, error);
  //     throw error;
  //   }
  // };
  




  //---------------------------------------------------------------------

  interface Note {
    id: string;
    folderId: string | undefined;
    title: string;
    preview: string;
    updatedAt: string;
    
  }
  
  interface NotesResponse {
    notes: Note[];
  }
  

  export const fetchNotesData = async ({ pageParam = 1, folderId }: { pageParam: unknown; folderId?: string }) => {
    if (!folderId) return { notes: [] };

    const params = {
        archived: false,
        deleted: false,
        folderId,
        page: pageParam,
        limit: 20,
    };

    try {
        const response = await axios.get<NotesResponse>(`${BASE_URL}/notes`, { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching notes data:", error);
        return { notes: [] };
    }
};



//-----------------------------------------------------------------

interface DataTypes {
  id: string;
  folderId: string | undefined;
  title: string;
  preview: string;
  updatedAt: string;
  folder: { name: string };
}
const LIMIT = 20;

export const fetchNotesForMiddle = async (
  type: "Archived" | "favorites" | "Deleted" | null,
  folderId: string |string[]|undefined,
  page: number
): Promise<DataTypes[]> => {
  let url = "";

  const FolderNotesApi =  `https://nowted-server.remotestate.com/notes?folderId=${folderId}&page=${page}&limit=${LIMIT}`;
  const ArchivedNotesApi =  `https://nowted-server.remotestate.com/notes?archived=true&deleted=false&page=${page}&limit=${LIMIT}`;
  const FavoriteNotesApi = `https://nowted-server.remotestate.com/notes?favorite=true&deleted=false&page=${page}&limit=${LIMIT}`;
  const DeleteNotesApi = `https://nowted-server.remotestate.com/notes?deleted=true&page=${page}&limit=${LIMIT}`;

  if (folderId) {
    url = FolderNotesApi;
  } else {
    switch (type) {
      case "Archived":
        url =ArchivedNotesApi;
        break;
      case "favorites":
        url = FavoriteNotesApi;
        break;
      case "Deleted":
        url = DeleteNotesApi;
        break;
      default:
        return [];
    }
  }

  const response = await axios.get(url);
  
  return response.data.notes;
};
