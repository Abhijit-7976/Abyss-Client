import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";

import AppLayout from "./components/AppLayout";
import CallRoom from "./features/calls/CallRoom";
import ChatRoom from "./features/chats/ChatRoom";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "chats",
        element: <Chats />,
        children: [
          { path: ":id", element: <ChatRoom /> },
          { path: ":id/call", element: <CallRoom /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
