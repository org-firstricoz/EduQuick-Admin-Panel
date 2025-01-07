import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

interface User {
  BillingCycle: string;
  Email: string;
  ExpiryDate: string;
  Name: string;
  PhoneNumber: string;
  RegisteredDate: string;
  Role: string;
  StartDate: string;
  Subscription: string;
}

const HeroSection = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [openfilter, setOpenFilter] = useState(false);
  const [user, setUser] = useState<User | null>();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();

  const [filter, setFilter] = useState("");

  const token = Cookies.get("token");

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/users-or-creators?role=User&page=${page}&limit=${limit}
`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data.data);
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
    getUsers();
  }, [page]);

  return (
    <div
      className=" w-full overflow-scroll  pl-8 pr-8 p-2 ml-4 mr-4 rounded-xl flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <div className="flex  justify-between">
        <h2 className="text-primary text-3xl font-semibold">Users</h2>
        <div
          onClick={() => setOpenFilter(true)}
          className="border flex cursor-pointer items-center p-2 rounded-md"
        >
          <FaFilter className="w-12" />
          {!filter ? "Filter" : filter}
        </div>
      </div>

      {/* Users table */}
      <div className="flex flex-col items-center justify-center mt-4">
        <table className="w-full mb-6 text-center border">
          <tr>
            <td className="p-5">#</td>
            <td>Name</td>
            <td>Email</td>
            <td>Subscription</td>
            <td>Action</td>
          </tr>

          {users.filter((user) => {
            const filterLower = filter.toLowerCase();
            return user.BillingCycle.toLocaleLowerCase().includes(filterLower);
          }).length === 0 ? (
            <tr>
              <td colSpan={5} className="p-3 text-center">
                No data found
              </td>
            </tr>
          ) : (
            users
              .filter((user) => {
                const filterLower = filter.toLowerCase();
                return user.BillingCycle.toLocaleLowerCase().includes(
                  filterLower
                );
              })
              .map((user, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{i < 9 ? `0${i + 1}` : i + 1}</td>
                  <td>{user.Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Subscription}</td>
                  <td
                    onClick={() => {
                      setUser(user);
                      setOpen(true);
                    }}
                  >
                    <p className="underline font-thin cursor-pointer">
                      More Info
                    </p>
                  </td>
                </tr>
              ))
          )}
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

        {/* Filter Dialog */}
        <Dialog
          open={openfilter}
          onClose={() => setOpenFilter(false)}
          width={400}
        >
          <div className=" justify-center items-center w-full flex flex-col gap-2">
            <div className="flex w-full  justify-center gap-10">
              <button
                onClick={() => setFilter("monthly")}
                className={`p-2 pl-6 pr-6 border rounded-full ${
                  filter === "monthly" && "bg-primary border-none"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setFilter("anual")}
                className={`p-2 pl-6 pr-6 border rounded-full ${
                  filter === "anual" && "bg-primary border-none"
                }`}
              >
                Anual
              </button>
            </div>
          </div>
        </Dialog>

        {/* More Button Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} width={400}>
          <div className=" justify-center items-center w-full flex flex-col gap-2">
            <p>
              Join Date:{" "}
              {user?.RegisteredDate
                ? new Date(user?.RegisteredDate).toLocaleDateString()
                : "N/A"}
            </p>
            <hr className="text-[#fff] w-full" />
            <p>Phone Number: {user?.PhoneNumber ? user.PhoneNumber : "N/A"}</p>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HeroSection;
