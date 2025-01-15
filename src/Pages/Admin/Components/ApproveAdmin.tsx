import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import AdminCard from "./Cards/AdminCard";

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
  admins: Admin[];
  status: string;
  setStatus: (value: string) => void;
}

const ApproveAdmin = ({ admins, status, setStatus }: props) => {
  const navigate = useNavigate();

  return (
    <div className="w-3/4  shadow-[#000] shadow-md rounded-md bg-secondary flex flex-col p-4 gap-4 justify-center">
      <h2 className="text-left text-2xl font-normal">Approve Admins</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setStatus("Verified")}
          className={`p-2 pl-4 pr-4 rounded-full shadow-[#111] shadow-md ${
            status === "Verified" ? "bg-primary" : "bg-secondary border"
          }`}
        >
          Verified
        </button>
        <button
          onClick={() => {
            {
              startTransition(() => {
                navigate("/pending-requests");
              });
            }
          }}
          className={`p-2 pl-4 pr-4 rounded-full shadow-[#111] shadow-md ${
            status === "Pending" ? "bg-primary" : "bg-secondary border"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setStatus("Rejected")}
          className={`p-2 pl-4 pr-4 rounded-full shadow-[#111] shadow-md ${
            status === "Rejected" ? "bg-primary" : "bg-secondary border"
          }`}
        >
          Rejected
        </button>
      </div>
      {/* <div className="border items-center rounded-md shadow-[#000] shadow-md flex gap-2 pl-3 w-full">
        <FiSearch className="text-2xl" />
        <input
          type="text"
          placeholder="Search name, email."
          className="p-2 rounded-md outline-none w-full bg-secondary"
        />
      </div> */}
      {admins.length === 0 ? (
        <div className="text-center bg-secondary text-lg font-bold text-red-500">
          No admins found
        </div>
      ) : (
        admins.map((admin, i) => <AdminCard key={i} admin={admin} />)
      )}
    </div>
  );
};

export default ApproveAdmin;
