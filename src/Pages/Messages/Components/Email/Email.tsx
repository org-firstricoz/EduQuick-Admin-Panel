import { baseURL } from "@baseURL";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Admin {
  email: string;
  fullName: string;
  _id: string;
}

interface User {
  email: string;
  name: string;
  phoneNumber: string;
  _id: string;
}

interface Complaints {
  attachments: string[];
  createdAt: string;
  description: string;
  resolutionNotes: string;
  resolvedAt: string;
  resolvedBy: Admin;
  status: "Pending" | "Resolved" | "Rejected";
  subject: string;
  ticketId: string;
  updatedAt: string;
  user: User;
  __v: string;
  _id: string;
}

const Email = () => {
  const [complaints, setComplaints] = useState<Complaints[]>([]);

  const token = Cookies.get("token");

  const getContactUsMessages = async () => {
    try {
      const response = await axios.get(`${baseURL}/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data.complaints);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactUsMessages();
  }, []);

  return (
    <div className="w-full flex text-left  text-[#fff] flex-col">
      <table className="w-full pl-2">
        <tr className="bg-[#fff] text-secondary h-12 text-lg">
          <td>Name</td>
          <td>Contact</td>
          <td>Subject</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
        {complaints.map((complaint, i) => (
          <tr
            key={i}
            className=" hover:bg-[#242424] border-b transition-all duration-300 cursor-pointer rounded-md "
          >
            <td>
              <h2 className="p-2 flex flex-col">
                <span className="rounded-sm font-normal  w-56 text-nowrap overflow-hidden">
                  # {complaint.ticketId}
                </span>
                <span className="  rounded-sm font-extralight  w-56 text-nowrap overflow-hidden">
                  {complaint.user.name}
                </span>
              </h2>
            </td>
            <td>
              <h2 className="p-2 flex flex-col">
                <span className="rounded-sm font-normal  w-56 text-nowrap overflow-hidden">
                  {complaint.user.email}
                </span>
                <span className="  rounded-sm font-extralight  w-56 text-nowrap overflow-hidden">
                  +91 {complaint.user.phoneNumber}
                </span>
              </h2>
            </td>
            <td>
              <h2 className="p-2  rounded-sm font-normal  w-56 text-nowrap overflow-hidden">
                {complaint.subject}
              </h2>
            </td>
            <td>
              <h2
                className={`p-2 rounded-md font-medium  w-fit text-nowrap overflow-hidden
                ${
                  complaint.status === "Resolved"
                    ? "bg-[#F0FFF8] text-[#18AB56]"
                    : "bg-[#FFF0F0] text-[#FFBC10]"
                }
                `}
              >
                {complaint.status}
              </h2>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Email;
