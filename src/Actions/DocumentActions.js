import axios from "axios";
import apis from "../Apis/apis";
import { getHeaders } from "../Apis/helper";
import store from "../store";
import { setDocuments } from "../Slices/DocumentSlice";

const { dispatch } = store;

export const fetchDocuments = async (user, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/fetch-by-user`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(setDocuments(res.data.documents));
      callback(true);
      return;
    }
    callback(false);
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    callback(false);
  }
};

export const createDocument = async (user, title, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/create`,
      {
        owner_id: user.username,
        title: title,
      },
      getHeaders()
    );

    if (res.status === 200) {
      callback(true, res.data.document_id);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const deleteDocument = async (user, documentId, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/delete`,
      {
        owner_id: user.username,
        document_id: documentId,
      },
      getHeaders()
    );

    if (res.status === 200) {
      callback(true, res.data.document_id);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const getDocument = async (user, documentId, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/get`,
      {
        owner_id: user.username,
        document_id: documentId,
      },
      getHeaders()
    );

    if (res.status === 200) {
      callback(true, res.data);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const getShareDocument = async (shareId, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/share/get`,
      {
        share_id: shareId,
      }
    );

    if (res.status === 200) {
      callback(true, res.data);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const shareDocument = async (user, documentId, isShare, callback) => {
  try {
    const res = await axios.post(
      `${apis.document}/share`,
      {
        owner_id: user.username,
        document_id: documentId,
        is_share: isShare,
      },
      getHeaders()
    );

    if (res.status === 200) {
      callback(true, res.data.share_id);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};

export const updateDocument = async (
  user,
  documentId,
  content,
  title,
  callback
) => {
  try {
    const res = await axios.post(
      `${apis.document}/update`,
      {
        owner_id: user.username,
        title: title,
        content: content,
        document_id: documentId,
      },
      getHeaders()
    );

    if (res.status === 200) {
      callback(true, res.data.document_id);
    }
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
  }
};
