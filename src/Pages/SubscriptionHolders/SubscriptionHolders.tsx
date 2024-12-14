import { baseURL } from "@baseURL";
import Nav from "@dashboard/Components/Nav/Nav";
import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Subscription {
  BillingCycle: string;
  Email: string;
  ExpiryDate: string;
  Name: string;
  PhoneNumber: string;
  Price: string;
  StartDate: string;
  Subscription: string;
}

const SubscriptionHolders = () => {
  const [subscriptionHolders, setSubscriptionHolders] = useState<
    Subscription[]
  >([]);

  const token = Cookies.get("token");
  const navigate = useNavigate();

  const getSubscriptionHolders = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/subscriptions/subscription-holders?start=1&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);

      setSubscriptionHolders(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  useEffect(() => {
    getSubscriptionHolders();
  }, []);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div>
      <Nav />
      {/* Page Nav */}
      <div className="flex  w-full justify-between pl-36 pr-36">
        <IoChevronBackCircleOutline
          onClick={() => handleNavigation("/")}
          className="text-4xl cursor-pointer"
        />
        <h2 className="text-primary text-3xl font-semibold">
          Subscription Holders
        </h2>
        <div className="border flex items-center rounded-md">
          <FaFilter className="w-12" />
        </div>
      </div>

      {/* Subscription Holders table */}
      <div className="flex items-center justify-center pl-36 pr-36 mt-4">
        <table className="w-full text-center border">
          <tr>
            <td className="p-4">#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subscription</td>
            <td>Date</td>
            <td></td>
          </tr>
          {subscriptionHolders.map((subscriptionholder, i) => (
            <tr key={i} className="border-t">
              <td className="p-4">index</td>
              <td>{subscriptionholder.Name}</td>
              <td>{subscriptionholder.Email}</td>
              <td>{subscriptionholder.Subscription}</td>
              <td>
                {new Date(subscriptionholder.ExpiryDate).toLocaleDateString()}
              </td>
              <td>
                <p className="font-light underline text-sm"> more info</p>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default SubscriptionHolders;
