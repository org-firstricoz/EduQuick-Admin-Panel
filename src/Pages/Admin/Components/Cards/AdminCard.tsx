import Dialog from "@dialog";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "@baseURL";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import IconButton from "../../../../Components/buttons/IconButton";

interface Admin {
  createdAt: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  specialization: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

interface props {
  admin: Admin;
}

interface token {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const AdminCard = ({ admin }: props) => {
  const [del, setDel] = useState<Admin | null>(null);
  const [open, setOpen] = useState(false);

  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>();

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<token>(token);
      if (decode.role === "Super Admin") {
        setIsSuperAdmin(true);
      } else if (decode.role === "Admin") {
        setIsSuperAdmin(false);
      }
    }
  }, []);

  const handleDeleteAdmin = async () => {
    if (!isSuperAdmin) {
      toast.error("Only super admin can delete admins!");
      return;
    }
    const pendingToast = toast.loading(`Deleting ${del?.fullName}... `);
    try {
      const response = await axios.delete(`${baseURL}/admin/${del?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.dismiss(pendingToast);
        toast.success(response.data.message);
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        toast.error(errMessage);
        setOpen(false);
      }
    }
  };

  return (
    <div className="bg-[#111] shadow-[#000] shadow-md transition-all hover:bg-[#1d1d1d] duration-300 flex flex-col gap-1 p-3 rounded-md w-full">
      <IconButton
        onClick={() => {
          setDel(admin);
          isSuperAdmin
            ? setOpen(true)
            : toast.error("Only super admin can delete admins!");
        }}
        sx={{
          marginLeft: "860px",
        }}
      >
        <FaTrash
          className={` drop-shadow-md ${
            isSuperAdmin ? "cursor-pointer text-primary" : "text-[#ff4f58]"
          } `}
        />
      </IconButton>
      <div className="flex items-center  w-11/12 -mt-10 gap-2">
        {admin.profileImageUrl ? (
          <img src={admin.profileImageUrl} className="w-10 h-10 rounded-full" />
        ) : (
          <FaUserCircle className="text-4xl" />
        )}
        <div>
          <p>{admin.fullName}</p>
          <p className="text-xs text-[#696969]">{admin?.role}</p>
        </div>
      </div>
      <hr className="w-[200px] border-[#696969]" />

      <p className="text-sm">
        Mobile:{" "}
        <span className="font-light">
          {admin?.phoneNumber ? admin.phoneNumber : "N/A"}
        </span>
      </p>
      <p className="text-sm">
        Email:{" "}
        <span className="font-light">{admin?.email ? admin.email : "N/A"}</span>
      </p>
      <p className="text-sm">
        Specialization:{" "}
        <span className="font-light">
          {admin?.specialization ? admin.specialization : "N/A"}
        </span>
      </p>

      <Dialog open={open} width={400} onClose={() => null}>
        <div className="w-full flex justify-center items-center gap-4 flex-col h-full">
          <h2>
            You are Deleting{" "}
            <span className="text-primary font-medium">"{del?.fullName}"</span>
          </h2>
          <div className="flex justify-center items-center gap-10">
            <button
              onClick={() => setOpen(false)}
              className="border p-2 shadow-[#000] shadow-md pl-4 pr-4 rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAdmin}
              className="bg-primary shadow-[#000] shadow-md p-2 pl-4 pr-4 rounded-full"
            >
              Delete Admin
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminCard;
