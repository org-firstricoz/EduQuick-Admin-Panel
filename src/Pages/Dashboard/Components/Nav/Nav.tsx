import { baseURL } from "@baseURL";
import User from "@creators/Assets/User.png";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/AuthContext";
import toast from "react-hot-toast";
import DarkMode from "../../../../Components/DarkMode";

interface Admin {
  email: string;
  exp: string;
  iat: string;
  id: string;
  role: string;
}

interface AdminUser {
  createdAt: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

const Nav = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const { token, isLoggedIn } = useAuthContext();
  const getsessionCode = () => {
    if (token) {
      const user = jwtDecode<Admin>(token);
      setAdmin(user);
    } else {
      startTransition(() => {
        navigate("/login");
      });
    }
  };

  const getAdminById = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${baseURL}/admin/profile/${admin?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdminUser(response.data.admin);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
        startTransition(() => {
          navigate("/login");
        });
      }
    }
  };
  useEffect(() => {
    getsessionCode();
  }, [token]); // Only update when token changes

  useEffect(() => {
    if (admin?.id) {
      getAdminById();
    }
  }, [admin?.id]);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="flex justify-between pl-7 p-2  pr-7 items-center">
      <h1 className="text-primary font-jockey font-normal text-4xl">
        EDUQUICK
      </h1>

      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <div
              onClick={() => handleNavigation(`/admin/profile/${admin?.id}`)}
              className="flex items-center cursor-pointer justify-center gap-2"
            >
              <img
                src={
                  adminUser?.profileImageUrl ? adminUser.profileImageUrl : User
                }
                className="w-12 h-12 rounded-full"
                alt="Admin Profile Image"
              />
              <div className="flex flex-col">
                <p className="text-primary">{adminUser?.fullName}</p>
                <p className="font-thin text-sm">{adminUser?.role}</p>
              </div>
            </div>
            <DarkMode />
          </>
        ) : (
          <button
            onClick={() => handleNavigation("/login")}
            className="p-2 pl-6 pr-6 border rounded-md"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
