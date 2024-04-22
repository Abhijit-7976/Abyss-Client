import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
