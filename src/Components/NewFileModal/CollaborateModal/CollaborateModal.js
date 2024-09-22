import React, { useEffect, useState } from "react";
import "./CollaborateModal.css";
import { useDispatch, useSelector } from "react-redux";
import { collaborateDocument } from "../../../Actions/DocumentActions";
import { updateDocument } from "../../../Slices/DocumentSlice";

const CollaborateModal = ({ setModal, users, documentId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [localUsers, setLocalUsers] = useState({});
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    let a = {};
    users &&
      users.forEach((b) => {
        a = {
          ...a,
          [b]: true,
        };
      });
    setLocalUsers(a);
    //eslint-disable-next-line
  }, []);

  const callCollaborate = () => {
    collaborateDocument(
      user,
      documentId,
      "Y",
      Object.keys(localUsers),
      (success) => {
        if (success) {
          dispatch(
            updateDocument({
              documentId: documentId,
              key: "is_collaborate",
              value: "Y",
            })
          );
          dispatch(
            updateDocument({
              documentId: documentId,
              key: "users",
              value: Object.keys(localUsers),
            })
          );
          setModal(false);
        }
      }
    );
  };

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
          }}
          className="form-wrapper"
        >
          {localUsers &&
            Object.keys(localUsers).map((item) => {
              return (
                <div className="userRow" key={item}>
                  <input
                    value={item}
                    onChange={(e) => {
                      return;
                    }}
                    className="input-box input-username"
                    placeholder="User Name"
                    required={true}
                    type="text"
                    name=""
                    id=""
                  />
                  <button
                    className="side-button close"
                    onClick={() => {
                      let temp = { ...localUsers };
                      delete temp[item];
                      setLocalUsers(temp);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          {localUsers && Object.keys(localUsers).length < 3 && (
            <div className="userRow">
              <input
                value={newUser}
                onChange={(e) => {
                  setNewUser(e.target.value);
                }}
                className="input-box input-username"
                placeholder="User name"
                type="text"
                name=""
                id=""
              />
              <button
                className="side-button tick"
                onClick={() => {
                  if (newUser.length === 0) {
                    return;
                  }
                  setLocalUsers({
                    ...localUsers,
                    [newUser]: true,
                  });
                  setNewUser("");
                }}
              >
                Add
              </button>
            </div>
          )}
          <button
            className="button signup"
            onClick={() => {
              callCollaborate();
            }}
          >
            Save
          </button>
          <button
            className="button signup private"
            onClick={() => {
              collaborateDocument(
                user,
                documentId,
                "N",
                Object.keys(localUsers),
                (success) => {
                  if (success) {
                    dispatch(
                      updateDocument({
                        documentId: documentId,
                        key: "is_collaborate",
                        value: "N",
                      })
                    );
                    dispatch(
                      updateDocument({
                        documentId: documentId,
                        key: "users",
                        value: null,
                      })
                    );
                    setModal(false);
                  }
                }
              );
              setModal(false);
            }}
          >
            Make Private
          </button>
        </form>
      </div>
    </div>
  );
};

export default CollaborateModal;
