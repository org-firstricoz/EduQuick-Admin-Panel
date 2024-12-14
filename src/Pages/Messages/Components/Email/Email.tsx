import { baseURL } from "@baseURL";
import axios from "axios";
import { useEffect, useState } from "react";

interface Message {
  date: string;
  message: string;
  userName: string;
}

const Email = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const getContactUsMessages = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/contact-us-messages`);
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
    <div className="w-full flex text-center text-secondary flex-col">
      <table className="w-full">
        {messages.map((message, i) => (
          <tr
            key={i}
            className=" hover:bg-[#242424] transition-all duration-300 cursor-pointer rounded-md "
          >
            <td>
              <h2 className="p-2 bg-[#00b69b31] rounded-sm font-medium text-xl w-fit text-[#00B69B]">
                {message.userName}
              </h2>
            </td>
            <td>{message.message}</td>
            <td className="text-left">{message.date}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Email;
