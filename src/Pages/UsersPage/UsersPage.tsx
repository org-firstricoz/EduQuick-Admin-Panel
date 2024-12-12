import { baseURL } from "@baseURL";
import Nav from "@dashboard/Components/Nav/Nav";
import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface User {
  BillingCycle: string;
  Email: string;
  ExpiryDate: string;
  Name: string;
  PhoneNumber: string;
  RegisteredDate: string;
  Role: string;
  StartDate: string;
  Subscription: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const token = Cookies.get("token");

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/users-or-creators?role=User&start=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUsers(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Nav />
      {/* Page Nav */}
      <div className="flex  w-full justify-between pl-36 pr-36">
        <IoChevronBackCircleOutline
          onClick={() => handleNavigation("/")}
          className="text-4xl cursor-pointer"
        />
        <h2 className="text-primary text-3xl font-semibold">Users</h2>
        <div className="border flex items-center rounded-md">
          <FaFilter className="w-12" />
        </div>
      </div>

      {/* Users table */}
      <div className="flex items-center justify-center pl-36 pr-36 mt-4">
        <table className="w-full mb-6 text-center border">
          <tr>
            <td className="p-5">#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subscription</td>
            <td>Status</td>
            <td></td>
          </tr>
          {users.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="p-3">{i < 9 ? `0${i + 1}` : i + 1}</td>
              <td>{user.Name}</td>
              <td>{user.Email}</td>
              <td>{user.Subscription}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
