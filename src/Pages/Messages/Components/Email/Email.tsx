import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import ResolveDialog from "../ResolveDialog";
import toast from "react-hot-toast";
import DeleteDialog from "../DeleteDialog";

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
  const [complaint, setComplaint] = useState<Complaints | null>(null);
  const [query] = useSearchParams();
  const filter = query.get("filter");

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const token = Cookies.get("token");

  const getContactUsMessages = async () => {
    try {
      if (filter === null) {
        const response = await axios.get(`${baseURL}/complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data.complaints);
      } else if (filter === "All") {
        const response = await axios.get(`${baseURL}/complaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data.complaints);
      } else {
        const response = await axios.get(
          `${baseURL}/complaints/status/${filter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setComplaints(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactUsMessages();
  }, [filter, open]);

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
                className={`p-2 rounded-md font-medium  w-28 text-center text-nowrap overflow-hidden
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
            <td>
              <div className="group">
                <BsThreeDotsVertical className=" p-2 text-4xl" />
                <div className="bg-[#111111] absolute right-16 group-hover:flex group-hover:scale-110 scale-0  transition-all duration-300 shadow-[#000] shadow-md rounded-md w-36 hidden flex-col">
                  <button
                    className="p-2"
                    onClick={() => {
                      if (complaint.status === "Resolved") {
                        toast.error("Complaint is already resolved!");
                        return;
                      }
                      setOpen(true);
                      setComplaint(complaint);
                    }}
                  >
                    Resolve
                  </button>
                  <button
                    onClick={() => {
                      setOpenDelete(true);
                      setComplaint(complaint);
                    }}
                    className="p-2 bg-[#e7061188] hover:bg-[#e70612] duration-300 transition-all rounded-b-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
        <ResolveDialog open={open} setOpen={setOpen} complaint={complaint} />
        <DeleteDialog
          open={openDelete}
          setOpen={setOpenDelete}
          complaint={complaint}
        />
      </table>
    </div>
  );
};

export default Email;

// .filter((complaint) => {
//   return complaint.status.includes(filter ? filter : "");
// })
