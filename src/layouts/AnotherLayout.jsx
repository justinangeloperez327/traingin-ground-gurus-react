import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const AnotherLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AnotherLayout;
