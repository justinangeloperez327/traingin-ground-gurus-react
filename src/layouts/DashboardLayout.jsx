import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  const navLinks = [
    { label: "Dashboard", link: "/Dashboard" },
    { label: "Rooms", link: "/rooms" },
    { label: "Profile", link: "/profile" },
  ];
  return (
    <>
      <Navbar navLinks={navLinks} />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
