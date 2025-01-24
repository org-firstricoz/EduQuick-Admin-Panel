import Dialog from "@dialog";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "@baseURL";
import toast from "react-hot-toast";

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

interface props {
  open: boolean;
  setOpen: (value: boolean) => void;
  complaint: Complaints | null;
}

interface token {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

const ResolveDialog = ({ open, setOpen, complaint }: props) => {
  const token = Cookies.get("token");
  const [admin, setAdmin] = useState<token | null>(null);

  const [resolutionNotes, setResolutionNotes] = useState("");

  useEffect(() => {
    if (token) {
      const Admin = jwtDecode<token>(token);
      setAdmin(Admin);
    }
  }, []);

  const validation = () => {
    if (!resolutionNotes || resolutionNotes.length < 20) {
      toast.error("Resolution Note must be greater than 20 characters.");
      return false;
    }
    return true;
  };

  const resolveComplaint = async () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Resolving complaint...");
    try {
      const response = await axios.put(
        `${baseURL}/complaints/${complaint?.ticketId}/status`,
        {
          status: "Resolved",
          resolutionNotes,
          resolvedBy: admin?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status) {
        toast.dismiss(pendingToast);
        toast.success("Complaint resolved!");
        setOpen(false);
        setResolutionNotes("");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      if (axios.isAxiosError(error)) {
        const errMessage = error.response?.data.error;
        toast.error(errMessage);
      }
    }
  };

  return (
    <Dialog open={open} width={600} onClose={() => null}>
      <div className="w-full h-full flex flex-col gap-4">
        <IoClose
          onClick={() => setOpen(false)}
          className="absolute right-5 top-4 cursor-pointer text-2xl"
        />
        <div>
          <p>Subject:</p>
          <h1 className="text-xl">{complaint?.subject}</h1>
          <p>{complaint?.description}</p>
        </div>
        <div>
          <p>Reply:</p>
          <textarea
            value={resolutionNotes}
            placeholder="Write your message"
            onChange={(e) => setResolutionNotes(e.target.value)}
            className="w-full h-32 bg-secondary border outline-none p-2 rounded-md"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={resolveComplaint}
            className="bg-primary pl-8 p-2 pr-8 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ResolveDialog;
