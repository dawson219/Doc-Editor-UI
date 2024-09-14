import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documents: {},
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
    removeDocument: (state, action) => {
      delete state.documents[action.payload];
    },
    storeDocument: (state, action) => {
      state.documentMap[action.payload.documentId] = action.payload.document;
    },
  },
});

export const { setDocuments, addDocument, removeDocument, storeDocument } =
  documentSlice.actions;

export default documentSlice.reducer;
