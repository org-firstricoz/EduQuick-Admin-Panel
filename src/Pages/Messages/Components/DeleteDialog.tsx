import Dialog from "@dialog";
import { IoClose } from "react-icons/io5";

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
          //   onClick={resolveComplaint}
          className="bg-primary pl-8 p-2 pr-8 rounded-md"
        >
          Delete Complaint
        </button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
