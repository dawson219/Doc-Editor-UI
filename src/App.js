import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import DeleteAccount from "./Pages/DeleteAccount/DeleteAccount";
import Home from "./Pages/Home/Home";
import Editor from "./Pages/Editor/Editor";
import ShareDocument from "./Pages/ShareDocument/ShareDocument";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/delete-account",
      element: <DeleteAccount />,
    },
    {
      path: "/editor/:documentId",
      element: <Editor />,
    },
    {
      path: "/share/:shareId",
      element: <ShareDocument />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
