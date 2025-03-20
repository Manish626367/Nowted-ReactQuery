import axios from "axios";

const BASE_URL = "https://nowted-server.remotestate.com";

// Folder APIs
export const getFolders = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/folders`);
        return response.data.folders;
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
};

export const deleteFolder = async (folderId:string) => {
    try {
        await axios.delete(`${BASE_URL}/folders/${folderId}`);
        return true;
    } catch (error) {
        console.error("Error deleting folder:", error);
        return false;
    }
};

export const addNewFolder = async (folderName) => {
    try {
        await axios.post(`${BASE_URL}/folders`, { name: folderName });
        return true;
    } catch (error) {
        console.error("Error creating folder:", error);
        return false;
    }
};

export const editFolderName = async (folderId, newName) => {
    try {
        await axios.patch(`${BASE_URL}/folders/${folderId}`, { name: newName });
        return true;
    } catch (error) {
        console.error("Error updating folder name:", error);
        return false;
    }
};

// Note APIs
export const createNote = async (folderId) => {
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

export const getRecentNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/notes/recent`);
        return response.data.recentNotes;
    } catch (error) {
        console.error("Error fetching recent notes:", error);
        return [];
    }
};


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
  
  // Fetch Single Note Details
  export const fetchNoteDetails = async (noteId) => {
    try {
      const response = await axios.get(`${BASE_URL}/notes/${noteId}`);
      return response.data.note;
    } catch (error) {
      console.error("Error fetching note details:", error);
      throw error;
    }
  };
  
  // Delete Note
  export const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${BASE_URL}/notes/${noteId}`);
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  };
  
  // Update Note Status (Favorite/Archive)
  export const updateNoteStatus = async (noteId, type, status) => {
    try {
      const payload =
        type === "Favorite" ? { isFavorite: status } : { isArchived: status };
  
      const response = await axios.patch(
        `${BASE_URL}/notes/${noteId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
  
      return response.data;
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      throw error;
    }
  };
  




  //---------------------------------------------------------------------

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
