import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { GoGraph } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div
      className="font-poppins  w-60 text-lg flex flex-col justify-center items-center gap-1"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <div
        onClick={() => handleNavigation("/")}
        className={`
        ${
          location.pathname === "/"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary"
        }
        p-4 w-60 rounded-xl flex items-center justify-center gap-2 active:bg-[#dd353d] cursor-pointer
        `}
      >
        <RiDashboardFill className="text-3xl" />
        <p>Dashboard</p>
      </div>
      <div
        onClick={() => handleNavigation("/leaderboard")}
        className={`
        ${
          location.pathname === "/leaderboard"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <MdLeaderboard className="text-3xl" />
        <p>Leaderboard</p>
      </div>
      <div
        onClick={() => handleNavigation("/creators")}
        className={`
        ${
          location.pathname === "/creators"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <CiUser className="text-3xl" />
        <p>Creators</p>
      </div>
      <div
        onClick={() => handleNavigation("/products")}
        className={`
        ${
          location.pathname === "/products"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <IoBagHandleOutline className="text-3xl" />
        <p>Products</p>
      </div>
      <div
        onClick={() => handleNavigation("/verify-report")}
        className={`
        ${
          location.pathname === "/verify-report"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <GoGraph className="text-3xl" />
        <p>Verify Report</p>
      </div>
      <div
        onClick={() => handleNavigation("/messages")}
        className={`
        ${
          location.pathname === "/messages"
            ? "bg-primary text-[#fff] shadow-md shadow-[#000]"
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <IoChatboxEllipsesOutline className="text-3xl" />
        <p>Messages</p>
      </div>
      <div
        onClick={() => handleNavigation("/settings")}
        className={`
        ${
          location.pathname === "/settings"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex items-center gap-2 justify-center cursor-pointer
        `}
      >
        <IoSettingsOutline className="text-3xl" />
        <p>Settings</p>
      </div>
      <div
        className={`
        ${
          location.pathname === "/sign-out"
            ? "bg-primary text-[#fff] "
            : "bg-[#111111] text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-4 w-60 rounded-xl flex gap-2 items-center justify-center cursor-pointer
        `}
      >
        <PiSignOutBold className="text-3xl" />
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
