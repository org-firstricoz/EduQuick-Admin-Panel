import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { startTransition, useEffect, useState } from "react";
import { FiBarChart } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";
import { IoIosPricetag } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TodaysSales = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState({
    totalSales: "",
    subscriptionsSold: "",
    newCustomers: "",
  });

  const token = Cookies.get("token");

  const getTodaysSales = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/dashboard/today-sales`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSales(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodaysSales();
  }, []);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className=" w-full border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <p className="text-primary text-xl font-semibold">Today's Sales</p>
          <p className="text-secondary text-base font-normal">Sales Summery</p>
        </div>
      </div>
      <div className="flex items-center  justify-center gap-6 mt-4">
        <div className="w-60 flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit bg-[#E7061240] p-6 rounded-2xl">
          <div className="p-2 bg-primary w-8 h-8 rounded-full">
            <FiBarChart />
          </div>
          <p className="text-2xl font-semibold">${sales.totalSales}k</p>
          <p className="text-sm font-light">Total sales</p>
        </div>
        <div
          onClick={() => handleNavigation("/subscription")}
          className="w-60 flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit bg-[#E7061240] p-6 rounded-2xl"
        >
          <div className="p-2 bg-primary w-8 h-8 rounded-full">
            <IoIosPricetag />
          </div>
          <p className="text-2xl font-semibold">{sales.subscriptionsSold}</p>
          <p className="text-sm font-light">Subscription sold</p>
        </div>
        <div
          onClick={() => handleNavigation("/users")}
          className="w-60 flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-fit bg-[#E7061240] p-6 rounded-2xl"
        >
          <div className="p-2 bg-primary w-8 h-8 rounded-full">
            <HiUserAdd />
          </div>
          <p className="text-2xl font-semibold">{sales.newCustomers}</p>
          <p className="text-sm font-light">New Customers</p>
        </div>
      </div>
    </div>
  );
};

export default TodaysSales;
