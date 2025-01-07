import SupportCard from "./Cards/SupportCard";
import { TiGroup } from "react-icons/ti";
import { GiWallet } from "react-icons/gi";
import { MdContactSupport } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa6";
import ApproveAdmin from "./ApproveAdmin";
import TotalAdmin from "./Cards/TotalAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@baseURL";
import Cookies from "js-cookie";

interface Admin {
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

const HeroSection = () => {
  const token = Cookies.get("token");

  const [admins, setAdmins] = useState<Admin[]>([]);

  const getAdmins = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/all`, {
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
    getAdmins();
  }, [location.pathname]);

  return (
    <div
      className=" w-full overflow-scroll p-2  pl-8 pr-8  ml-4 mr-4 rounded-xl flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <h2 className="text-3xl text-primary font-semibold">Super Admin Panel</h2>
      <div className="flex w-full gap-4">
        <SupportCard
          icon={<TiGroup />}
          text="customer Support Admins"
          count={7}
        />
        <SupportCard
          icon={<MdContactSupport />}
          text="complaint Support Admins"
          count={3}
        />
        <SupportCard icon={<FaWarehouse />} text="support Admins" count={2} />
        <SupportCard
          icon={<GiWallet />}
          text="sales Support Admins"
          count={1}
        />
      </div>
      <div className="flex gap-2">
        <ApproveAdmin admins={admins} />
        <TotalAdmin adminsCount={admins.length} />
      </div>
    </div>
  );
};

export default HeroSection;
