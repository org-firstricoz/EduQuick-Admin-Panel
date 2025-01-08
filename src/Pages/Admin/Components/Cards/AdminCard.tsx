import { FaUserCircle } from "react-icons/fa";

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
  admin: Admin;
}

const AdminCard = ({ admin }: props) => {
  return (
    <div className="bg-[#111] shadow-[#000] shadow-md hover:scale-95 cursor-pointer transition-all duration-300 flex flex-col gap-1 p-2 rounded-md w-full">
      <div className="flex items-center gap-2">
        {admin.profileImageUrl ? (
          <img src={admin.profileImageUrl} className="w-10 h-10 rounded-full" />
        ) : (
          <FaUserCircle className="text-4xl" />
        )}
        <div>
          <p>Unknown</p>
          <p className="text-xs text-[#696969]">{admin?.role}</p>
        </div>
      </div>
      <hr className="w-[200px] border-[#696969]" />
      <p className="text-sm">
        Full Name: <span className="font-light">{admin?.fullName}</span>
      </p>
      <p className="text-sm">
        Mobile:{" "}
        <span className="font-light">
          {admin?.phoneNumber ? admin.phoneNumber : "N/A"}
        </span>
      </p>
      <p className="text-sm">
        Email:{" "}
        <span className="font-light">{admin?.email ? admin.email : "N/A"}</span>
      </p>
    </div>
  );
};

export default AdminCard;
