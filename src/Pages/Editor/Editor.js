import React, { useEffect, useRef, useState } from "react";
import "./Editor.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Quill from "quill";
import * as Y from "yjs";
import "quill/dist/quill.snow.css";
import {
  getDocument,
  shareDocument,
  updateDocument,
} from "../../Actions/DocumentActions";
import { storeDocument } from "../../Slices/DocumentSlice";
import SaveIcon from "@mui/icons-material/Save";
import htmlDocx from "html-docx-js/dist/html-docx";
import DownloadIcon from "@mui/icons-material/Download";
import CollaborateModal from "../../Components/NewFileModal/CollaborateModal/CollaborateModal";

const Editor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { documentId } = useParams();
  const user = useSelector((state) => state.user.user);
  const space = useSelector((state) => state.user.space);
  const documentMap = useSelector((state) => state.document.documentMap);
  const [triggerSave, setTriggerSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const ws = useRef(null);

  const setText = (newText) => {
    if(!newText) return
    if (quillRef.current) {
      const delta = JSON.parse(newText);
      quillRef.current.setContents(delta);
    }
  };

  const getText = () => {
    if (quillRef.current) {
      const delta = quillRef.current.getContents();
      return JSON.stringify(delta);
    }
  };

  const QuillBinding = (ytext, quill) => {
    ytext.observe((event) => {
      const delta = ytext.toDelta();
      quill.setContents(delta);
    });

    quill.on("text-change", (delta, oldDelta, source) => {
      if (loading) return;
      if (source === "user") {
        if (!triggerSave) setTriggerSave(true);
        ytext.applyDelta(delta);
        ws.current.send(JSON.stringify(delta));
      }
    });

    ws.current.onmessage = (event) => {
      const delta = JSON.parse(event.data);
      quill.updateContents(delta);
    };
  };

  useEffect(() => {
    if (!editorRef.current) return;
    const ydoc = new Y.Doc();
    setLoading(true);
    ws.current = new WebSocket(
      `${process.env.REACT_APP_WEB_SOCKET_BASE_URL}/ws/document/${documentId}`
    );
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: "#toolbar-container",
      },
    });
    quillRef.current = quill;
    const ytext = ydoc.getText("quill");
    QuillBinding(ytext, quill);

    getDocument(user, documentId, (success, document) => {
      if (success) {
        dispatch(storeDocument({ documentId: documentId, document: document }));
        setText(document.content);
      } else {
        navigate("/home");
      }
    });

    return () => {
      quill.off("text-change");
      if (ws.current) {
        ws.current.close();
      }
    };
    // eslint-disable-next-line
  }, []);

  const downloadAsDocx = () => {
    const htmlContent = quillRef.current.root.innerHTML;
    const converted = htmlDocx.asBlob(htmlContent);
    const url = URL.createObjectURL(converted);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${documentMap?.[documentId]?.title}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-wrapper">
      {modal && (
        <CollaborateModal
          setModal={setModal}
          users={documentMap?.[documentId]?.users}
          documentId={documentId}
        />
      )}
      <div className="home-container">
        <div className="header" style={{ height: "40px" }}>
          <span
            className="arrow-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIcon />
          </span>
          <div className="header-text">{documentMap?.[documentId]?.title}</div>
          {space === "ME" && (
            <div className="share-block">
              {documentMap?.[documentId]?.is_share === "Y" ? (
                <div className="unshare-block">
                  <div
                    className="share-button-base unshare-button"
                    onClick={() => {
                      shareDocument(
                        user,
                        documentId,
                        "N",
                        (success, shareId) => {
                          if (success) {
                            let newDoc = { ...documentMap?.[documentId] };
                            newDoc.is_share = "N";
                            newDoc.share_id = shareId;
                            dispatch(
                              storeDocument({
                                documentId: documentId,
                                document: newDoc,
                              })
                            );
                          }
                        }
                      );
                    }}
                  >
                    Unshare
                  </div>
                  <div
                    className="share-button-base copy-link"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/share/${documentMap?.[documentId]?.share_id}`
                      );
                    }}
                  >
                    Copy Link
                  </div>
                </div>
              ) : (
                <div
                  className="share-button-base share-button"
                  onClick={() => {
                    shareDocument(user, documentId, "Y", (success, shareId) => {
                      if (success) {
                        let newDoc = { ...documentMap?.[documentId] };
                        newDoc.is_share = "Y";
                        newDoc.share_id = shareId;
                        dispatch(
                          storeDocument({
                            documentId: documentId,
                            document: newDoc,
                          })
                        );
                      }
                    });
                  }}
                >
                  Share
                </div>
              )}
            </div>
          )}

          {space === "ME" && documentMap?.[documentId]?.owner_id === user.username && (
            <div className="share-block">
              {documentMap?.[documentId]?.is_collaborate === "Y" ? (
                <div className="unshare-block">
                  <div
                    className="share-button-base unshare-button"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    Edit Collaborate
                  </div>
                </div>
              ) : (
                <div
                  className="share-button-base share-button"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Collaborate
                </div>
              )}
            </div>
          )}

          {triggerSave && (
            <div className="buttons-container">
              <div
                className="save-container"
                onClick={() => {
                  updateDocument(
                    user,
                    documentId,
                    getText(),
                    documentMap[documentId].title,
                    () => {
                      const newDoc = { ...documentMap[documentId] };
                      newDoc.content = getText();
                      newDoc.title = documentMap[documentId].title;
                      dispatch(
                        storeDocument({
                          documentId: documentId,
                          document: newDoc,
                        })
                      );
                      setTriggerSave(false);
                    }
                  );
                }}
              >
                <div className="save-text">Save</div>
                <div className="save-wrapper">
                  <SaveIcon style={{ color: "lightblue" }} />
                </div>
              </div>

              {/* <div
                className="save-container"
                onClick={() => {
                  setTriggerSave(false);
                  setText(documentMap[documentId].content);
                }}
              >
                <div className="save-text">Discard</div>
                <div className="save-wrapper">
                  <ClearIcon style={{ color: "red" }} />
                </div>
              </div> */}
            </div>
          )}
          <div
            className="download-container"
            onClick={() => {
              downloadAsDocx();
            }}
          >
            <div className="download-text">Download</div>
            <div className="download-button">
              <DownloadIcon />
            </div>
          </div>
        </div>
        <div className="body editor-wrapper">
          <div className="editor-container">
            <div id="toolbar-container">
              <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
              </span>
              <span className="ql-formats">
                <button className="ql-clean"></button>
              </span>
            </div>
            <div ref={editorRef} className="editor-pane"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
