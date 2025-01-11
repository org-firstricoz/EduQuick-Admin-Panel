import Dialog from "@dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { startTransition, useState } from "react";
import toast from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { GoGraph } from "react-icons/go";
import { IoBagHandleOutline, IoChatboxEllipsesOutline } from "react-icons/io5";
import { MdLeaderboard } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineAddCircle } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();

  const [logoutDialog, setLogoutDialog] = useState<boolean>(false);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const token = Cookies.get("token");

  const handleSignOut = async () => {
    const pendingToast = toast.loading("Logging out...");
    try {
      const response = await axios.get("/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status) {
        toast.dismiss(pendingToast);
        setLogoutDialog(false);
        toast.success("Logged out!");
        Cookies.remove("token");
        handleNavigation("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errroMessage = error.response?.data.message;
        toast.dismiss(pendingToast);
        toast.error(errroMessage);
      }
    }
  };

  return (
    <div
      className="font-poppins shadow-[#000] shadow-xl overflow-scroll bg-secondary rounded-tr-xl w-80 text-lg flex flex-col justify-start items-center "
      style={{
        height: "calc(100vh - 69px)",
      }}
    >
      <div
        onClick={() => handleNavigation("/")}
        className={`
        ${
          location.pathname === "/"
            ? "bg-primary shadow-[#111] shadow-md text-[#fff] "
            : " text-secondary"
        }
        p-3 rounded-r-md  flex items-center w-full transition-all duration-150 active:bg-[#464646]  justify-center gap-1  cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4  ">
          <RiDashboardFill className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4  ">
          <p>Dashboard</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/users")}
        className={`
        ${
          location.pathname === "/users"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4  ">
          <FaUsers className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4  ">
          <p>Users</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/subscription")}
        className={`
        ${
          location.pathname === "/subscription"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4  ">
          <MdSubscriptions className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4  ">
          <p>Subscription</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/leaderboard")}
        className={`
        ${
          location.pathname === "/leaderboard"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4  ">
          <MdLeaderboard className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4  ">
          <p>Leaderboard</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/create")}
        className={`
        ${
          location.pathname === "/create"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4 ">
          <MdOutlineAddCircle className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Create</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/courses")}
        className={`
        ${
          location.pathname === "/courses"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4 ">
          <IoBagHandleOutline className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Courses</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/verify-course")}
        className={`
        ${
          location.pathname === "/verify-course"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4 ">
          <GoGraph className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Verify Course</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/support")}
        className={`
        ${
          location.pathname === "/support"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff]"
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4 ">
          <IoChatboxEllipsesOutline className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Support</p>
        </div>
      </div>
      <div
        onClick={() => handleNavigation("/admin")}
        className={`
        ${
          location.pathname === "/admin"
            ? "bg-primary shadow-[#000] shadow-md text-[#fff] "
            : " text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646]"
        }
        p-3 w-full rounded-r-md flex items-center gap-1 justify-center cursor-pointer
        `}
      >
        <div className="flex justify-start items-center w-1/4 ">
          <CiUser className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Admin</p>
        </div>
      </div>

      <div
        onClick={() => setLogoutDialog(true)}
        className=" text-secondary hover:bg-[#292929] transition-all duration-150 active:bg-[#464646] p-4 w-full rounded-xl flex items-center gap-1 justify-center cursor-pointer"
      >
        <div className="flex justify-start items-center w-1/4 ">
          <PiSignOutBold className="text-3xl" />
        </div>
        <div className="flex justify-start items-center w-3/4 ">
          <p>Sign Out</p>
        </div>
      </div>
      <Dialog open={logoutDialog} width={400} onClose={() => null}>
        <div className="w-full relative z-50 h-full flex flex-col gap-4">
          <p className="text-xl font-medium text-[#fff]">
            Are you sure you want to{" "}
            <span className="text-primary font-semibold">Signout?</span>
          </p>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setLogoutDialog(false)}
              className="bg-primary text-[#fff] rounded-md p-2 pl-6 pr-6"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="border text-[#fff] rounded-md p-2 pl-6 pr-6"
            >
              Sign Out
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Sidebar;
