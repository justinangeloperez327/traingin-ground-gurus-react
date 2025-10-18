import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const PublicLayout = () => {
  const navLinks = [
    { label: "Home", link: "/" },
    { label: "Rooms", link: "/rooms" },
    { label: "Contact", link: "/contact" },
    { label: "About", link: "/about" },
  ];

  const authLinks = [
    { label: "Register", link: "/register" },
    { label: "Login", link: "/login" },
  ];
  return (
    <>
      <Navbar navLinks={navLinks} authLinks={authLinks} />
      <main className="flex-grow container mx-auto px-4 py-6">
        {/*  */}
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;
