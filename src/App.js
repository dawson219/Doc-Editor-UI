import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import DeleteAccount from "./Pages/DeleteAccount/DeleteAccount";
import Home from "./Pages/Home/Home";
import Editor from "./Pages/Editor/Editor";
import ShareDocument from "./Pages/ShareDocument/ShareDocument";
import Wrapper from "./Components/Wrapper/Wrapper";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Wrapper>
          <LandingPage />
        </Wrapper>
      ),
    },
    {
      path: "/login",
      element: (
        <Wrapper>
          <Login />
        </Wrapper>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <Wrapper>
          <SignUp />
        </Wrapper>
      ),
    },
    {
      path: "/home",
      element: (
        <Wrapper>
          <Home />
        </Wrapper>
      ),
    },
    {
      path: "/delete-account",
      element: (
        <Wrapper>
          <DeleteAccount />
        </Wrapper>
      ),
    },
    {
      path: "/editor/:documentId",
      element: (
        <Wrapper>
          <Editor />
        </Wrapper>
      ),
    },
    {
      path: "/share/:shareId",
      element: (
        <Wrapper>
          <ShareDocument />
        </Wrapper>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
