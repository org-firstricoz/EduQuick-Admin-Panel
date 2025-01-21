import SupportCard from "../../../Admin/Components/Cards/SupportCard";
import { IoChatboxSharp } from "react-icons/io5";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillExclamation } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";
import { useEffect, useState } from "react";
import { baseURL } from "@baseURL";
import axios from "axios";
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

const Header = () => {
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

  const supportCardData = [
    {
      icon: <IoChatboxSharp />,
      text: "Total Complaints",
      count: complaints.length,
      onClick: () => console.log("Total Complaints clicked"),
    },
    {
      icon: <BsPersonFillCheck />,
      text: "Total Solved",
      count: complaints.filter((complaint) => complaint.status === "Resolved")
        .length,
      onClick: () => console.log("Total Solved clicked"),
    },
    {
      icon: <BsPersonFillExclamation />,
      text: "Total Unsolved",
      count: complaints.filter((complaint) => complaint.status === "Rejected")
        .length,
      onClick: () => console.log("Total Unsolved clicked"),
    },
    {
      icon: <BsPersonFillSlash />,
      text: "Total Pending",
      count: complaints.filter((complaint) => complaint.status === "Pending")
        .length,
      onClick: () => console.log("Total Pending clicked"),
    },
  ];

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {supportCardData.map((card, index) => (
        <SupportCard
          key={index}
          icon={card.icon}
          text={card.text}
          count={card.count}
          onClick={card.onClick}
          width={4}
        />
      ))}
    </div>
  );
};

export default Header;
