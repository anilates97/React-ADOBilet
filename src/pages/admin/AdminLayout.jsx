import { Link, useLocation } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { SiEventstore } from "react-icons/si";
import { GiRomanToga } from "react-icons/gi";
import { MdEventSeat, MdAddAPhoto } from "react-icons/md";
import { FaUsersLine, FaTicket } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { useState } from "react";
import Dashboard from "./Dashboard";

const navItems = [
  ["Dashboard", "/admin/Dashboard", IoIosHome],
  ["Events", "/admin/Events", SiEventstore],
  ["Artists", "/admin/Artists", GiRomanToga],
  ["Seats", "/admin/Seats", MdEventSeat],
  ["Users", "/admin/Users", FaUsersLine],
  ["Categories", "/admin/Categories", BiSolidCategory],
  ["EventPhotos", "/admin/EventPhotos", MdAddAPhoto],
  ["TicketCategories", "/admin/TicketCategories", FaTicket],
];

function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const activeItem =
    navItems.find(([, path]) =>
      location.pathname.toLowerCase().startsWith(path.toLowerCase())
    ) || navItems[0];
  const activeMenu = activeItem[0];

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="admin-shell flex min-h-screen bg-[#07090d] text-[#f7efe2]">
      <button
        onClick={toggleMenu}
        className="fixed left-5 top-5 z-[9999] flex h-12 w-12 items-center justify-center border border-white/10 bg-[#111722] text-3xl xl:hidden"
      >
        <ion-icon
          name={open ? "menu" : "close"}
          style={{ color: "white" }}
        ></ion-icon>
      </button>

      <aside
        className={`fixed bottom-0 top-0 z-[9998] w-[310px] border-r border-white/10 bg-[#0b1017]/95 p-5 backdrop-blur-xl transition-all duration-500 xl:sticky xl:left-0 ${
          open ? "left-[-330px]" : "left-0"
        } xl:left-0`}
      >
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#d9a85f]">
            Operator console
          </div>
          <h1 className="mt-2 text-4xl font-bold leading-none">Admin Panel</h1>
          <p className="mt-3 text-sm leading-6 text-[#9da8b7]">
            Manage events, seats, artists, tickets and customer records.
          </p>
        </div>

        <nav className="grid gap-2">
          {navItems.map(([name, path, Icon]) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(true)}
              className={`flex items-center gap-3 border px-4 py-3 text-sm font-extrabold uppercase tracking-[0.1em] transition ${
                activeMenu === name
                  ? "border-[#d9a85f]/60 bg-[#d9a85f]/14 text-[#f2d59a]"
                  : "border-white/10 bg-white/[0.03] text-[#d7dee8] hover:border-[#26d0b1]/50 hover:text-white"
              }`}
            >
              <Icon />
              <span>{name === "TicketCategories" ? "Tickets" : name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,rgba(38,208,177,0.12),transparent_32rem)] p-5 pt-20 xl:p-8">
        <div className="mb-7 text-left">
          <div className="section-eyebrow">ADO Bilet management</div>
          <h2 className="mt-2 text-5xl font-bold text-[#f7efe2]">
            {activeMenu}
          </h2>
        </div>
        <div className="glass-panel min-h-[calc(100vh-180px)] overflow-auto p-4 sm:p-5">
          {children || <Dashboard />}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
