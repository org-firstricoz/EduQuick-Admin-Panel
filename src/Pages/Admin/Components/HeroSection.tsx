import SupportCard from "./Cards/SupportCard";
import { TiGroup } from "react-icons/ti";
import { GiWallet } from "react-icons/gi";
import { MdContactSupport } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import ApproveAdmin from "./ApproveAdmin";
// import TotalAdmin from "./Cards/TotalAdmin";
import { startTransition, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@baseURL";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

interface Specialization {
  admins: Admin[];
  totalAdmins: number;
  totalPages: number;
}

const HeroSection = () => {
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [techAdmins, setTechAdmins] = useState<Specialization | null>(null);
  const [otherAdmins, setOtherAdmins] = useState<Specialization | null>(null);
  const [complaintAdmins, setComplaintAdmins] = useState<Specialization | null>(
    null
  );
  const [supportAdmins, setSupportAdmins] = useState<Specialization | null>(
    null
  );

  const [status, setStatus] = useState("Verified");

  const getAdmins = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/status/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(response.data.admins);
    } catch (error) {
      console.log(error);
    }
  };

  const getTechAdmins = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/specialization/Technical Support`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTechAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerSupportAdmins = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/specialization/Customer Support`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSupportAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getComplaintSupportAdmins = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/specialization/Complaint Support`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComplaintAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOtherAdmins = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/specialization/Other`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOtherAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOtherAdmins();
  }, [otherAdmins]);

  useEffect(() => {
    getComplaintSupportAdmins();
  }, [complaintAdmins]);

  useEffect(() => {
    getCustomerSupportAdmins();
  }, [supportAdmins]);

  useEffect(() => {
    getTechAdmins();
  }, [techAdmins]);

  useEffect(() => {
    getAdmins();
  }, [status]);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(`/admins?specialization=${path}`);
    });
  };

  return (
    <div
      className=" w-full overflow-scroll p-2  pl-8 pr-8  ml-4 mr-4 rounded-xl flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 65px)",
      }}
    >
      <h2 className="text-3xl text-primary font-semibold">Super Admin Panel</h2>
      <div className="flex w-full gap-4">
        <SupportCard
          icon={<TiGroup />}
          onClick={() => handleNavigation("Technical Support")}
          text="Technical Support"
          count={techAdmins?.admins.length}
        />
        <SupportCard
          icon={<MdContactSupport />}
          onClick={() => handleNavigation("Customer Support")}
          text="Customer Support"
          count={supportAdmins?.admins.length}
        />
        <SupportCard
          icon={<FaWarehouse />}
          onClick={() => handleNavigation("Complaint Support")}
          text="Complaint Support"
          count={complaintAdmins?.admins.length}
        />
        <SupportCard
          icon={<GiWallet />}
          onClick={() => handleNavigation("Other")}
          text="Other"
          count={otherAdmins?.admins.length}
        />
        <SupportCard
          icon={<IoIosPeople />}
          onClick={() => handleNavigation("Total member")}
          text="Total member"
          count={admins.length}
        />
      </div>
      <div className="flex gap-2">
        <ApproveAdmin status={status} setStatus={setStatus} admins={admins} />
        {/* <TotalAdmin adminsCount={admins.length} /> */}
      </div>
    </div>
  );
};

export default HeroSection;
