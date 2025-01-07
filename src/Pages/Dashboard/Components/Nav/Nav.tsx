import { baseURL } from "@baseURL";
import User from "@creators/Assets/User.png";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const token = Cookies.get("token");
  const getsessionCode = () => {
    if (token) {
      setIsLoggedIn(true);
      const user = jwtDecode<Admin>(token);
      setAdmin(user);
    } else {
      setIsLoggedIn(false);
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
        console.log(errorMessage);
      }
    }
  };
  useEffect(() => {
    getsessionCode();
    getAdminById();
  }, [token, admin?.id]);

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
          <div
            onClick={() => handleNavigation(`/admin/profile/${admin?.id}`)}
            className="flex items-center cursor-pointer justify-center gap-1"
          >
            <img
              src={
                adminUser?.profileImageUrl ? adminUser.profileImageUrl : User
              }
              className="w-16 h-16 rounded-full"
              alt="Admin Profile Image"
            />
            <div className="flex flex-col">
              <p className="text-primary">{adminUser?.fullName}</p>
              <p className="font-thin text-sm">{adminUser?.role}</p>
            </div>
          </div>
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
