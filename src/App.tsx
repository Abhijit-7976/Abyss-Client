import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>hello</h1>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
