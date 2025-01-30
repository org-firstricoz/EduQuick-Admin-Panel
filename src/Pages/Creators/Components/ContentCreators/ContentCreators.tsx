import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface Creator {
  BillingCycle: string;
  Email: string;
  ExpiryDate: string;
  Name: string;
  PhoneNumber: string;
  RegisteredDate: string;
  Role: string;
  StartDate: string;
  Subscription: string;
  id: string;
  profileImageUrl: string;
}

interface props {
  setCreator: (value: Creator) => void;
  openCreatorsDialog: boolean;
  setOpenCreatorsDialog: (value: boolean) => void;
}

const ContentCreators = ({
  setCreator,
  openCreatorsDialog,
  setOpenCreatorsDialog,
}: props) => {
  const token = Cookies.get("token");
  const [creators, setCreators] = useState<Creator[]>([]);

  const getCreators = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/users-or-creators?role=Creator&start=0&limit=100`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      setCreators(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <Dialog open={openCreatorsDialog} width={1000} onClose={() => null}>
      <div className="w-full h-full flex flex-col gap-3">
        <IoClose
          onClick={() => setOpenCreatorsDialog(false)}
          className="absolute right-5 top-4 cursor-pointer text-2xl"
        />
        <h2 className="text-3xl font-semibold">Content Creators</h2>
        <div className="grid grid-cols-4 gap-4">
          {creators.map((creator, i) => (
            <div
              key={i}
              className="w-56 hover:scale-105 duration-300 bg-secondary dark:bg-[#fff] dark:text-[#111] transition-all cursor-pointer border rounded-md p-4 flex flex-col gap-1 items-center justify-center"
              onClick={() => {
                setCreator(creator);
                setOpenCreatorsDialog(false);
              }}
            >
              {creator.profileImageUrl ? (
                <img
                  src={creator.profileImageUrl}
                  alt={creator.Name}
                  className=" rounded-full w-20 h-20"
                />
              ) : (
                <FaUser className="border p-2 rounded-full text-6xl" />
              )}
              <h2 className="text-xl font-medium">{creator.Name}</h2>
              <p className="text-primary">{creator.Role}</p>
              <p className="text-base font-thin">{creator.Email}</p>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default ContentCreators;
