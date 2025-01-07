import { FiSearch } from "react-icons/fi";
import AdminCard from "./Cards/AdminCard";

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

interface props {
  admins: Admin[];
}

const ApproveAdmin = ({ admins }: props) => {
  return (
    <div className="w-3/4  shadow-[#000] shadow-md rounded-md bg-secondary flex flex-col p-4 gap-4 justify-center">
      <h2 className="text-left text-2xl font-normal">Approve Admins</h2>
      <div className="flex gap-2">
        <button
          className={`bg-primary rounded-full p-1 shadow-md shadow-[#000] pl-6 pr-6`}
        >
          Verified
        </button>
        <button
          className={`border rounded-full p-1 shadow-md shadow-[#000] pl-6 pr-6`}
        >
          Rejected
        </button>
        <button
          className={` border rounded-full p-1 shadow-md shadow-[#000] pl-6 pr-6`}
        >
          Pending
        </button>
      </div>
      <div className="border items-center rounded-md shadow-[#000] shadow-md flex gap-2 pl-3 w-full">
        <FiSearch className="text-2xl" />
        <input
          type="text"
          placeholder="Search name, email or etc"
          className="p-2 rounded-md outline-none w-full bg-secondary"
        />
      </div>
      {admins.map((admin, i) => (
        <AdminCard key={i} admin={admin} />
      ))}
    </div>
  );
};

export default ApproveAdmin;
