import "./App.css";
import "rsuite/styles/index.less"; // or 'rsuite/dist/rsuite.min.css'
import Message from "./pages/Message";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AuthProvider, { withAuthContext } from "./Context";
import { useEffect } from "react";

function App({ Token }) {
  useEffect(() => console.log(Token), Token);
  const router = createBrowserRouter([
    {
      path: "Chat",
      element: Token ? <Message /> : <Navigate to={"/"} />,
    },
    {
      path: "/",
      element: Token ? <Navigate to={"/Chat"} /> : <Login />,
    },
    {
      path: "SignUp",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default withAuthContext(App);
