import { baseURL } from "@baseURL";
import Nav from "@dashboard/Components/Nav/Nav";
import { useTitle } from "@hooks";
import axios, { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface Admin {
  createdAt: string;
  email: string;
  fullName: string;
  gender: null;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  specialization: string;
  status: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

const PendingAdmins = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useTitle("Pending Admins • EduQuick");

  const [admins, setAdmins] = useState<Admin[]>([]);

  const getPendingAdmins = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/status/Pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingAdmins();
  }, []);

  const updateAdminStatus = async (admin: Admin, status: string) => {
    const pendingToast = toast.loading("Updating admin...");
    try {
      const response = await axios.patch(
        `${baseURL}/admin/status/${admin._id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status) {
        toast.dismiss(pendingToast);
        toast.success("Admin status updated successfully");
        getPendingAdmins();
      }
    } catch (error) {
      toast.dismiss(pendingToast);
      console.log(error);

      if (isAxiosError(error)) {
        const errMessage = error.response?.data.message;
        toast.error(errMessage);
      }
    }
  };

  const handleNavigate = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div>
      <Nav />
      <IoIosArrowBack
        onClick={() => handleNavigate("/admin")}
        className="text-4xl p-1 rounded-full border cursor-pointer relative left-[150px] m-4"
      />
      <div className="flex justify-center items-center">
        <div className="bg-secondary rounded-md p-4 shadow-md shadow-[#000] w-3/4">
          {admins.length === 0 ? (
            <div className="text-[#fff] text-center text-lg">
              There are no pending requests.
            </div>
          ) : (
            <table className="w-full text-[#fff] rounded-md">
              <tr className="text-lg font-normal">
                <td>Name</td>
                <td>Email</td>
                <td>Request Role</td>
                <td>Action</td>
              </tr>
              {admins.map((admin, i) => (
                <tr className="text-[#fff] h-14 border-b" key={i}>
                  <td>{admin.fullName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <div className="flex gap-4 items-center justify-start">
                      <IoMdClose
                        onClick={() => updateAdminStatus(admin, "Rejected")}
                        className="text-4xl p-1 rounded-full bg-primary cursor-pointer"
                      />
                      <FaCheck
                        onClick={() => updateAdminStatus(admin, "Verified")}
                        className="text-4xl p-1 rounded-full bg-[#08ec00] cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingAdmins;
