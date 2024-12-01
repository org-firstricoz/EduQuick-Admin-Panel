import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../baseURL";

interface Courses {
  _id: string;
  title: string;
  views: number;
}

const TopCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[]>([]);

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const getTopCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/admin/dashboard/top-courses`
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
    <div
      onClick={() => handleNavigation("/leaderboard")}
      className="w-full overflow-scroll cursor-pointer  border rounded-xl shadow-[#0a0a0a] shadow-xl"
    >
      <p className="text-primary text-xl font-semibold m-4">Top Courses</p>

      <table style={{ width: "95%" }} className="m-6 text-center">
        <tr className="text-secondary mt-4 text-sm font-normal">
          <td>#</td>
          <td>Name</td>
          <td>View</td>
        </tr>
        {courses.map((data, i: number) => (
          <tr key={i} className="border-t h-12  border-b">
            <td>Index</td>
            <td>{data.title}</td>
            <td>{data.views}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default TopCourse;
