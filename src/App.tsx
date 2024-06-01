import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Toaster } from "./components/ui/toaster";

import AppLayout from "./components/AppLayout";
import ChatRoom from "./features/chats/ChatRoom";
import Chats from "./pages/Chats";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "chats",
        element: <Chats />,
        children: [{ path: ":chatId", element: <ChatRoom /> }],
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
  {
    path: "*",
    element: <PageNotFound />,
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
