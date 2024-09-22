import axios from "axios";
import apis from "../Apis/apis";
import { getHeaders } from "../Apis/helper";
import store from "../store";
import { setCollaborateDocuments, setDocuments } from "../Slices/DocumentSlice";
import { setIsLoading, setMessage } from "../Slices/UserSlice";

const { dispatch } = store;

export const fetchDocuments = async (user, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.document}/fetch-by-user`,
      {
        username: user.username,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(setDocuments(res.data.documents));
      dispatch(setCollaborateDocuments(res.data.collaborate_documents));
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if (res.data.status === "200") callback(true);
      dispatch(setIsLoading(false));
      return;
    }
    callback(false);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Fetching Documents",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    callback(false);
    dispatch(
      setMessage({
        message: "Error in Fetching Documents",
        severity: "error",
      })
    );
  }
};

export const createDocument = async (user, title, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.document}/create`,
      {
        owner_id: user.username,
        title: title,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      dispatch(setIsLoading(false));
      if (res.data.status === "200") callback(true, res.data.document_id);
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Creating Document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Creating Document",
        severity: "error",
      })
    );
  }
};

export const deleteDocument = async (user, documentId, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.document}/delete`,
      {
        owner_id: user.username,
        document_id: documentId,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      dispatch(setIsLoading(false));
      if (res.data.status === "200") callback(true, res.data.document_id);
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Deleting Document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Deleting Documet",
        severity: "error",
      })
    );
  }
};

export const getDocument = async (user, documentId, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.document}/get`,
      {
        owner_id: user.username,
        document_id: documentId,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      dispatch(setIsLoading(false));
      if (res.data.status === "200") callback(true, res.data);
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Fetching document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Fetching document",
        severity: "error",
      })
    );
  }
};

export const getShareDocument = async (shareId, callback) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(`${apis.document}/share/get`, {
      share_id: shareId,
    });

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if (res.data.status === "200") callback(true, res.data);
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Fetching Document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Fetching Document",
        severity: "error",
      })
    );
  }
};

export const shareDocument = async (user, documentId, isShare, callback) => {
  try {
    dispatch(setIsLoading(true));
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
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if (res.data.status === "200") callback(true, res.data.share_id);
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Sharing Document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Sharing Document",
        severity: "error",
      })
    );
  }
};

export const collaborateDocument = async (
  user,
  documentId,
  isCollaborate,
  users,
  callback
) => {
  try {
    dispatch(setIsLoading(true));
    const res = await axios.post(
      `${apis.document}/collaborate`,
      {
        owner_id: user.username,
        document_id: documentId,
        is_collaborate: isCollaborate,
        users: users,
      },
      getHeaders()
    );

    if (res.status === 200) {
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if (res.data.status === "200") callback(true);
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Collab",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Collab",
        severity: "error",
      })
    );
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
    dispatch(setIsLoading(true));
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
      dispatch(
        setMessage({
          message: res.data.message,
          severity: res.data.status === "500" ? "error" : "success",
        })
      );
      if (res.data.status === "200") callback(true, res.data.document_id);
      dispatch(setIsLoading(false));
      return
    }
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Updatig Document",
        severity: "error",
      })
    );
  } catch (e) {
    console.log("Error Occurred in API call", e.message);
    dispatch(setIsLoading(false));
    dispatch(
      setMessage({
        message: "Error in Updating Document",
        severity: "error",
      })
    );
  }
};
