import React from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
  CNavItem,
  CNavTitle,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import {
  cilHome,
  cilPencil,
  cilBold,
  cilAccountLogout,
} from "@coreui/icons";

import { NavLink, useNavigate } from "react-router-dom";
import api from "../api/axios";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/logout");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `
    nav-link flex items-center gap-2 px-4 py-3 rounded-lg transition-colors

    text-slate-900 dark:text-white
    hover:text-slate-900 dark:hover:text-black

    ${isActive ? "text-slate-900 dark:text-black bg-slate-200 dark:bg-white" : ""}
    `;

  return (
    <CSidebar
      unfoldable
      className="
        h-screen
        bg-white dark:!bg-slate-900
        border-r border-slate-200 dark:border-slate-800
      "
    >
      {/* Header */}
      <CSidebarHeader className="border-b border-slate-200 dark:border-slate-800">
        <CSidebarBrand className="flex items-center justify-center py-4">
          <img src="/images/Logo.png" alt="Blogify" className="h-8" />
        </CSidebarBrand>
      </CSidebarHeader>

      {/* Nav */}
      <CSidebarNav className="flex flex-col h-full">
        <CNavTitle className="px-4 text-xs tracking-widest text-slate-500 dark:text-slate-400">
          BLOGIFY
        </CNavTitle>

        <CNavItem>
          <NavLink to="/home" className={navLinkClasses}>
            <CIcon customClassName="nav-icon" icon={cilHome} />
            Home
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink to="/create" className={navLinkClasses}>
            <CIcon customClassName="nav-icon" icon={cilPencil} />
            Compose
          </NavLink>
        </CNavItem>

        <CNavItem>
          <NavLink to="/viewPost" className={navLinkClasses}>
            <CIcon customClassName="nav-icon" icon={cilBold} />
            View Blog
          </NavLink>
        </CNavItem>

        {/* Logout */}
        <CNavItem className="mt-auto mb-4">
          <NavLink
            to="#"
            onClick={handleLogout}
            className="
              nav-link flex items-center gap-2 px-4 py-3 rounded-lg
              text-red-600 hover:text-red-800
              dark:hover:text-black
            "
          >
            <CIcon customClassName="nav-icon text-red-600" icon={cilAccountLogout} />
            Logout
          </NavLink>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

export default Sidebar;
