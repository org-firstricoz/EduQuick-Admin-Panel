import { baseURL } from "@baseURL";
import Nav from "@dashboard/Components/Nav/Nav";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";

interface userId {
  email: string;
  name: string;
  _id: string;
}

interface planId {
  name: string;
  price: string;
  _id: string;
}

interface Subscription {
  amount: string;
  createdAt: string;
  planId: planId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  status: string;
  userId: userId;
  __v: string;
  _id: string;
}

const SubscriptionHolders = () => {
  const [subscriptionHolders, setSubscriptionHolders] = useState<
    Subscription[]
  >([]);

  const getSubscriptionHolders = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/subscriptions/subscription-holders?start=1&limit=2&download=true&format=csv`
      );
      setSubscriptionHolders(response.data);
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

  return (
    <div>
      <Nav />
      {/* Page Nav */}
      <div className="flex  w-full justify-between pl-36 pr-36">
        <IoChevronBackCircleOutline className="text-4xl" />
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
              <td>{subscriptionholder.userId.name}</td>
              <td>{subscriptionholder.userId.email}</td>
              <td>{subscriptionholder.planId.price}</td>
              <td>
                {new Date(subscriptionholder.createdAt).toLocaleDateString()}
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
