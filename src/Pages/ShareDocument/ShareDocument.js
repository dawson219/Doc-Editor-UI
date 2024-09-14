import React, { useEffect, useRef, useState } from "react";
import "./ShareDocument.css";
import { getShareDocument } from "../../Actions/DocumentActions";
import { useParams } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import htmlDocx from "html-docx-js/dist/html-docx";
import DownloadIcon from "@mui/icons-material/Download";

const ShareDocument = () => {
  const { shareId } = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!editorRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      readOnly: true,
      modules: {
        toolbar: false,
      },
    });
    quillRef.current = quill;

    getShareDocument(shareId, (success, document) => {
      if (success) {
        setTitle(document.title);
        const delta = JSON.parse(document.content);
        quill.setContents(delta);
      }
    });
  }, []);

  const downloadAsDocx = () => {
    const htmlContent = quillRef.current.root.innerHTML;
    const converted = htmlDocx.asBlob(htmlContent);
    const url = URL.createObjectURL(converted);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="header" style={{ height: "40px" }}>
          <div className="header-text">{title}</div>
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
            <div ref={editorRef} className="editor-pane"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDocument;
