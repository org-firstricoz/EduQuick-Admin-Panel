import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { startTransition, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const AdminBySpecialization = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchQuery] = useSearchParams();

  const specialization = searchQuery.get("specialization");

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const token = Cookies.get("token");

  const getAdmins = async () => {
    try {
      if (specialization === "Total member") {
        const response = await axios.get(`${baseURL}/admin/status/Verified`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmins(response.data.admins);
      } else {
        const response = await axios.get(
          `${baseURL}/admin/specialization/${specialization}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAdmins(response.data.admins);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, [specialization]);

  return (
    <div className="p-8">
      <h1 className="text-primary font-jockey font-normal text-center text-4xl">
        EDUQUICK
      </h1>
      <IoIosArrowBack
        onClick={() => handleNavigation("/admin")}
        className="p-2 text-4xl absolute left-16 top-16 rounded-full cursor-pointer border  "
      />
      <div className="p-14 flex flex-col gap-4">
        <h2 className="text-4xl font-medium ">
          {searchQuery.get("specialization")}
        </h2>
        <div className="grid grid-cols-4 justify-center items-center gap-16">
          {admins.map((admin, i) => (
            <div
              key={i}
              className="w-[300px] h-[200px] hover:scale-105 duration-300 bg-[#202224] transition-all cursor-pointer border rounded-md p-4 flex flex-col gap-1 items-center justify-center"
            >
              {admin.profileImageUrl ? (
                <img
                  src={admin.profileImageUrl}
                  alt={admin.fullName}
                  className=" rounded-full w-16 h-16"
                />
              ) : (
                <FaUser className="border p-2 rounded-full text-6xl" />
              )}
              <h2 className="text-xl font-medium">{admin.fullName}</h2>
              <p className="text-primary">{admin.role}</p>
              <p className="text-base font-thin">{admin.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBySpecialization;
