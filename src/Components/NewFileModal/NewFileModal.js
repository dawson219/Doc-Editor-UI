import React, { useState } from "react";
import "./NewFileModal.css";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../../Actions/DocumentActions";
import { addDocument } from "../../Slices/DocumentSlice";

const NewFileModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState({ filename: "" });
  const user = useSelector((state) => state.user.user);
  return (
    <div className="modal-wrapper">
      <div className="modal-body">
        <div
          className="cross-button-wrapper"
          onClick={() => {
            setModal(false);
          }}
        >
          <div className="cross-button">+</div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createDocument(user, file.filename, (success, documentId) => {
              if (success) {
                dispatch(
                  addDocument({ document_id: documentId, title: file.filename })
                );
                setModal(false);
              }
            });
          }}
          className="form-wrapper"
        >
          <input
            value={file.filename}
            onChange={(e) => {
              setFile({
                ...file,
                filename: e.target.value,
              });
            }}
            className="input-box input-username"
            placeholder="File Name"
            required={true}
            type="text"
            name=""
            id=""
          />
          <button className="button signup" type="submit">
            Create File
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewFileModal;
