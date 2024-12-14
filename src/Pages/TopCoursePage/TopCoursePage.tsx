import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../baseURL";
import Nav from "@dashboard/Components/Nav/Nav";
import { IoIosArrowBack } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import FilterDialog from "./Components/FilterDialog/FilterDialog";
import Cookies from "js-cookie";

interface Courses {
  _id: string;
  title: string;
  views: number;
}

const TopCoursePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[]>([]);
  const token = Cookies.get("token");
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const getTopCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/dashboard/top-courses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.topCourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopCourses();
  });

  return (
    <div className="flex flex-col gap-4">
      <Nav />
      <FilterDialog openFilter={openFilter} setOpenFilter={setOpenFilter} />
      <div className=" flex  justify-between pl-32 pr-32 ">
        <IoIosArrowBack
          onClick={() => handleNavigation("/leaderboard")}
          className="p-2 text-4xl rounded-full cursor-pointer border  "
        />
        <button
          onClick={() => setOpenFilter(true)}
          className="p-3 flex items-center justify-center gap-4 border rounded-lg pl-4 pr-4"
        >
          <FaFilter />
          Filter by
        </button>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-4/5 overflow-scroll cursor-pointer  border rounded-xl shadow-[#0a0a0a] shadow-xl">
          <p className="text-primary text-3xl text-center font-semibold m-4">
            Top Courses
          </p>

          <table
            onClick={() => handleNavigation("/leaderboard")}
            style={{ width: "95%" }}
            className="m-6 text-center"
          >
            <tr className="text-secondary mt-4 text-sm font-normal">
              <td>#</td>
              <td>Name</td>
              <td>View</td>
            </tr>
            {courses.map((data, i: number) => (
              <tr key={i} className="border-t h-12  border-b">
                <td>{i < 9 ? `0${i + 1}` : i + 1}</td>
                <td>{data.title}</td>
                <td>{data.views}</td>
              </tr>
            ))}
          </table>
          <div
            className="  w-full bottom-4  flex items-center justify-center"
            // style={{ width: "72%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TopCoursePage;
