import { baseURL } from "@baseURL";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface Message {
  date: string;
  message: string;
  userName: string;
}

const Email = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const token = Cookies.get("token");

  const getContactUsMessages = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/contact-us-messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactUsMessages();
  }, []);

  return (
    <div className="w-full flex text-left text-[#fff] flex-col">
      <table className="w-full pl-2">
        <tr className="bg-[#fff] text-secondary h-12 text-lg">
          <td>Name</td>
          <td>Contact</td>
          <td>Subject</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
        {messages.map((message, i) => (
          <tr
            key={i}
            className=" hover:bg-[#242424] border-b border transition-all duration-300 cursor-pointer rounded-md "
          >
            <td>
              <h2 className="p-2  rounded-sm font-normal  w-56 text-nowrap overflow-hidden">
                {message.userName.length > 10
                  ? `${message.userName.slice(0, 10)}...`
                  : message.userName}
              </h2>
            </td>
            <td>
              {message.message.length > 50
                ? `${message.message.slice(0, 50)}...`
                : message.message}
            </td>
            <td className="text-left">{message.date}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Email;
