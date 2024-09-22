import React, { useEffect, useState } from "react";
import "./Home.css";
import logo from "../../Assets/Logos/main-logo.png";
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteAccount, logout } from "../../Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { deleteDocument, fetchDocuments } from "../../Actions/DocumentActions";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import NewFileModal from "../../Components/NewFileModal/NewFileModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeDocument } from "../../Slices/DocumentSlice";
import { setSpace } from "../../Slices/UserSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const space = useSelector((state) => state.user.space);
  const documents = useSelector((state) => state.document.documents);
  const collaborateDocuments = useSelector(
    (state) => state.document.collaborateDocuments
  );
  const [openHamburger, setOpenHamburger] = useState(false);
  const [modal, setModal] = useState(false);

  const goToLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      goToLogin();
    }
    fetchDocuments(user, (success) => {
      if (!success) goToLogin();
    });
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <></>;
  }
  return (
    <div className="home-wrapper">
      {modal && <NewFileModal setModal={setModal} />}
      <div className="home-container">
        <div className="header">
          <img src={logo} alt="" className="header-logo" />
          <div className="header-text">Welcome, &nbsp;{user.username}</div>
          <div className="hamburger">
            <div
              className="hamburger-container"
              onClick={() => {
                setOpenHamburger(!openHamburger);
              }}
            >
              <MenuIcon />
            </div>
            {openHamburger && (
              <div className="panel">
                <div
                  className="logout"
                  onClick={() => {
                    logout(user, () => {
                      setOpenHamburger(false);
                      navigate("/login");
                    });
                  }}
                >
                  <LogoutIcon /> <p className="text"> Logout</p>
                </div>
                <div
                  className="delete"
                  onClick={() => {
                    deleteAccount(user, () => {
                      setOpenHamburger(false);
                      navigate("/login");
                    });
                  }}
                >
                  <DeleteForeverIcon /> <p className="text">Delete Account</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="space-selector">
          <p className="space-selector-title">Space</p>
          <div className="space-modal">
            <div
              className={`space-left ${space === "ME" ? "space-active" : ""}`}
              onClick={() => {
                dispatch(setSpace("ME"));
              }}
            >
              Me
            </div>
            <div
              className={`space-right ${
                space === "COLLAB" ? "space-active" : ""
              }`}
              onClick={() => {
                dispatch(setSpace("COLLAB"));
              }}
            >
              Collaborations
            </div>
          </div>
        </div>
        <div className="body">
          {space === "ME" && (
            <div
              className="tile create-document"
              onClick={() => {
                setModal(true);
              }}
            >
              +
            </div>
          )}
          {Object.keys(space === "ME" ? documents : collaborateDocuments).map(
            (key) => {
              return (
                <div
                  className="tile-wrapper"
                  onClick={() => {
                    navigate(`/editor/${key}`);
                  }}
                >
                  <div
                    className="delete-icon"
                    onClick={(e) => {
                      deleteDocument(user, key, (success) => {
                        if (success) {
                          dispatch(removeDocument(key));
                        }
                      });
                      e.stopPropagation();
                    }}
                  >
                    <DeleteIcon
                      style={{
                        height: "20px",
                        width: "20px",
                        color: "red",
                      }}
                    />
                  </div>
                  <div className="tile">
                    {" "}
                    <TextSnippetIcon
                      style={{
                        height: "100px",
                        width: "100px",
                        color: "lightblue",
                      }}
                    />{" "}
                  </div>
                  <div className="tile-title">
                    {space === "ME"
                      ? documents?.[key]
                      : collaborateDocuments?.[key]}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
