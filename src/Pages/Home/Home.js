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

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const documents = useSelector((state) => state.document.documents);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchDocuments(user, (success) => {
      if (!success) navigate("/login");
    });
  }, []);
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
        <div className="body">
          <div
            className="tile create-document"
            onClick={() => {
              setModal(true);
            }}
          >
            +
          </div>
          {Object.keys(documents).map((key) => {
            return (
              <div className="tile-wrapper" onClick={() => {
                navigate(`/editor/${key}`)
              }} >
                <div
                  className="delete-icon"
                  onClick={(e) => {
                    deleteDocument(user, key, (success) => {
                      if (success) {
                        dispatch(removeDocument(key));
                      }
                    });
                    e.stopPropagation()
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
                <div className="tile-title">{documents?.[key]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
