import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
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

// interface token {
//   id: string;
//   role: string;
//   iat: number;
//   exp: number;
// }

const DeleteDialog = ({ open, setOpen, complaint }: props) => {
  const token = Cookies.get("token");

  const handleDeleteComplaint = async () => {
    const pendingToast = toast.loading("Deleting complaint...");
    try {
      const response = await axios.delete(
        `${baseURL}/complaints/${complaint?.ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(pendingToast);
      toast.success(response.data.message);
      setOpen(false);
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
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleDeleteComplaint}
          className="bg-primary pl-8 p-2 pr-8 rounded-md"
        >
          Delete Complaint
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
