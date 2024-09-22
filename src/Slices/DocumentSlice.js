import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: {},
  collaborateDocuments: {},
  documentMap: {},
};

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
    },
    addDocument: (state, action) => {
      state.documents[action.payload.document_id] = action.payload.title;
    },
    updateDocument: (state, action) => {
      state.documentMap[action.payload.documentId][action.payload.key] = action.payload.value;
    },
    removeDocument: (state, action) => {
      delete state.documents[action.payload];
    },
    storeDocument: (state, action) => {
      state.documentMap[action.payload.documentId] = action.payload.document;
    },
    setCollaborateDocuments: (state, action) => {
      state.collaborateDocuments= action.payload;
    },
  },
});

export const { setDocuments, addDocument, updateDocument, removeDocument, storeDocument, setCollaborateDocuments } =
  documentSlice.actions;

export default documentSlice.reducer;
