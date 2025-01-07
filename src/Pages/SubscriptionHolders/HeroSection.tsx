import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

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

const HeroSection = () => {
  const [subscriptionHolders, setSubscriptionHolders] = useState<
    Subscription[]
  >([]);

  const [user, setUser] = useState<Subscription | null>();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [openFilterr, setOpenFilter] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const token = Cookies.get("token");

  const getSubscriptionHolders = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/subscriptions/subscription-holders?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscriptionHolders(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParams({ page: pageNumber.toString(), limit: limit.toString() });
  };

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    if (pageParam && limitParam) {
      setPage(parseInt(pageParam));
      setLimit(parseInt(limitParam));
    }
  }, [searchParams]);

  useEffect(() => {
    getSubscriptionHolders();
  }, [page]);

  return (
    <div
      className=" w-full overflow-scroll  pl-8 pr-8 p-2 ml-4 mr-4 rounded-xl flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      {/* Page Nav */}
      <div className="flex   justify-between ">
        <h2 className="text-primary text-3xl font-semibold">
          Subscription Holders
        </h2>
        <div
          onClick={() => setOpenFilter(true)}
          className="border flex items-center p-2 rounded-md"
        >
          <FaFilter className="w-12" />
          {filter ? filter : "All"}
        </div>
      </div>

      {/* Subscription Holders table */}
      <div className="flex flex-col items-center justify-center  mt-4">
        <table className="w-full text-center border">
          <tr>
            <td className="p-4">#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subscription</td>
            <td>Date</td>
            <td></td>
          </tr>

          {subscriptionHolders
            .filter((subscriptionHolder) => {
              return subscriptionHolder.Subscription.includes(filter);
            })
            .map((subscriptionholder, i) => (
              <tr key={i} className="border-t">
                <td className="p-4">{i < 9 ? `0${i + 1}` : i + 1}</td>
                <td>{subscriptionholder.Name}</td>
                <td>{subscriptionholder.Email}</td>
                <td>{subscriptionholder.Subscription}</td>
                <td>
                  {new Date(subscriptionholder.ExpiryDate).toLocaleDateString()}
                </td>
                <td>
                  <p
                    onClick={() => {
                      setUser(subscriptionholder);
                      setOpen(true);
                    }}
                    className="font-light cursor-pointer underline text-sm"
                  >
                    {" "}
                    More info
                  </p>
                </td>
              </tr>
            ))}
        </table>

        {/* Pagination section */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 p-2 pl-4 pr-4 rounded ${
                page === index + 1 ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <Dialog open={open} onClose={() => setOpen(false)} width={400}>
          <div className="w-full h-full flex justify-center items-center flex-col gap-2">
            Expired Date:{" "}
            {user?.ExpiryDate
              ? new Date(user.ExpiryDate).toDateString()
              : "N/A"}
          </div>
        </Dialog>

        <Dialog
          open={openFilterr}
          onClose={() => setOpenFilter(false)}
          width={400}
        >
          <div className="w-full h-full flex justify-center items-center flex-col gap-2">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setFilter("Premium")}
                className={`p-2 border pl-6 pr-6 rounded-full ${
                  filter === "Premium" && "bg-primary border-none"
                }`}
              >
                Premium
              </button>
              <button
                onClick={() => setFilter("Standard")}
                className={`p-2 border pl-6 pr-6 rounded-full ${
                  filter === "Standard" && "bg-primary border-none"
                }`}
              >
                Standard
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HeroSection;
