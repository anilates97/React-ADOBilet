import React, { useEffect, useState } from "react";
import Button from "./Button.jsx";
import Logo from "../LogoComp/Logo.jsx";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSession,
  getUserSessionDatabase,
  logoutUser,
} from "../../redux/dataSlice.js";
import { CiLogout, CiLogin } from "react-icons/ci";
import { MdEventAvailable } from "react-icons/md";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

const HeaderMenu = () => {
  const dispatch = useDispatch();
  const { user, userData } = useSelector((state) => state.data);
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);

  useEffect(() => {
    if (user && Object.keys(user).length > 0 && user !== undefined) {
      dispatch(getUserSessionDatabase(user.id));
    }
  }, [dispatch, user]);

  let Links = [];
  const isAdmin = userData?.authenticated_role === "admin";

  if (user) {
    Links = [
      isAdmin && {
        name: "Admin Panel",
        link: "/admin",
      },
      { name: "Events", link: "/events" },
      { name: "Past Events", link: "/pastevents" },
      { name: "Logout", link: "/" },
    ];
  } else {
    Links = [
      { name: "Login", link: "/login" },
      { name: "Events", link: "/events" },
      { name: "Past Events", link: "/pastevents" },
    ];
  }
  let [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const isActiveLink = (link) => {
    if (link === "/events") {
      return location.pathname.startsWith("/events");
    }

    if (link === "/pastevents") {
      return location.pathname === "/pastevents";
    }

    if (link === "/admin") {
      return location.pathname.startsWith("/admin");
    }

    if (link === "/login") {
      return location.pathname === "/login" || location.pathname === "/register";
    }

    return location.pathname === link;
  };

  const getLinkClass = (link) => {
    const isActive = isActiveLink(link.link);
    const isAdminLink = link.name === "Admin Panel";

    if (isActive) {
      return "border border-[#d9a85f]/45 bg-[#d9a85f]/14 text-[#f2d59a] shadow-[0_0_30px_rgba(217,168,95,0.12)]";
    }

    if (isAdminLink) {
      return "text-[#d9a85f]";
    }

    return "text-[#f7efe2]";
  };

  return (
    <div className="sticky top-0 z-[9999] border-b border-white/10 bg-[#07090d]/88 px-4 py-3 font-bold backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex min-w-0 cursor-pointer items-center">
          <Logo />
        </div>
        <div
          onClick={toggleMenu}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl lg:hidden"
        >
          <ion-icon
            name={open ? "close" : "menu"}
            style={{ color: "white" }}
          ></ion-icon>
        </div>
        <ul
          className={`absolute left-0 w-full border-b border-white/10 px-5 py-6 transition-all duration-300 ease-out lg:static lg:flex lg:w-auto lg:items-center lg:gap-2 lg:border-b-0 lg:px-0 lg:py-0 ${
            open
              ? "top-[72px] z-[999999] bg-[#07090d]/96 shadow-[0_24px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl"
              : "top-[-560px] bg-[#07090d]/96 lg:bg-transparent"
          }`}
        >
          <>
            {user && (
              <div className="text-white lg:mr-3">
                {Object.keys(user).length > 0 ? (
                  <div className="mx-auto mb-4 flex max-w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-[#f7efe2] lg:mb-0 lg:max-w-[270px]">
                    {" "}
                    <FaUserAlt className="shrink-0" />{" "}
                    <span className="truncate">Welcome {userData?.username || user.email}</span>{" "}
                  </div>
                ) : (
                  <span></span>
                )}
              </div>
            )}
            {Links.filter(Boolean).map((link) => (
              <li
                key={link.name}
                className="mx-auto my-2 w-full max-w-sm text-sm uppercase tracking-[0.12em] lg:my-0 lg:w-fit"
              >
                {user ? (
                  <button
                    className={`mx-auto flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-white/10 lg:w-auto lg:py-2 ${
                      getLinkClass(link)
                    }`}
                    onClick={() => {
                      if (link.name === "Logout") {
                        dispatch(logoutUser());
                        setTimeout(() => {
                          window.location.href = "/";
                        }, 300);
                      } else if (link.name === "Events") {
                        window.location.href = "/events";
                      } else if (link.name === "Admin Panel") {
                        window.location.href = "/admin";
                      } else {
                        window.location.href = "/pastevents";
                      }
                    }}
                  >
                    {link.name}{" "}
                    {link.name === "Logout" ? (
                      <CiLogout />
                    ) : link.name === "Events" ? (
                      <MdEventAvailable />
                    ) : link.name === "Past Events" ? (
                      <MdOutlineSettingsBackupRestore />
                    ) : (
                      ""
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (link.name === "Login") {
                        window.location.href = "/login";
                      } else if (link.name === "Events") {
                        window.location.href = "/events";
                      } else {
                        window.location.href = "/pastevents";
                      }
                    }}
                    className={`flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 duration-300 hover:bg-white/10 hover:text-[#d9a85f] lg:w-auto lg:py-2 ${getLinkClass(
                      link
                    )}`}
                  >
                    {link.name}{" "}
                    {link.name === "Login" ? (
                      <CiLogin />
                    ) : link.name === "Events" ? (
                      <MdEventAvailable />
                    ) : link.name === "Past Events" ? (
                      <MdOutlineSettingsBackupRestore />
                    ) : (
                      ""
                    )}
                  </button>
                )}
              </li>
            ))}
          </>
          {!user && (
            <a className="mx-auto mt-3 block w-full max-w-sm lg:mt-0 lg:w-auto" href="/register">
              <Button>Sign Up</Button>
            </a>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderMenu;
