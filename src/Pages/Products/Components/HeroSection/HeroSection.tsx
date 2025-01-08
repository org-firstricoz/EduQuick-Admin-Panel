import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { baseURL } from "../../../../baseURL";
import Dialog from "../../../../Components/Dialog/Dialog";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

interface Course {
  avgRating: string;
  category: string;
  createdAt: string;
  description: string;
  freeCourse: boolean;
  imgUrl: string;
  rating: string;
  tags: string[];
  title: string;
  trending: boolean;
  updatedAt: string;
  videoIds: string[];
  views: string;
  __v: string;
  _id: string;
}

const HeroSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const token = Cookies.get("token");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigation = (course: Course) => {
    startTransition(() => {
      navigate(`/update-course/${course._id}`);
    });
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/courses/all?page=${page}&limit=${limit}`
      );
      setCourses(response.data.courses.reverse());
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
      let errorMessage = "An unexpected error occurred.";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (search.length === 0 || search === "") {
      getCourses();
    } else {
      handleCourseSearch();
    }
  }, [search, page]);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    if (pageParam && limitParam) {
      setPage(parseInt(pageParam));
      setLimit(parseInt(limitParam));
    }
  }, [searchParams]);

  const handleDeleteClick = (course: Course) => {
    setId(course._id);
    setCourseTitle(course.title);
    setOpenDeleteDialog(true);
  };

  const handleDeleteCourse = async () => {
    const pendingToast = toast.loading("Deleting course!");
    try {
      const response = await axios.delete(
        `${baseURL}/admin/delete-course?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenDeleteDialog(false);
      if (response.data.status) {
        toast.dismiss(pendingToast);
        toast.success("Course deleted!");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast.dismiss(pendingToast);
      let errorMessage = "An unexpected error occurred.";
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || error.message || errorMessage;
      }
      toast.dismiss(errorMessage);
      toast.error(errorMessage);
      console.log(errorMessage);
    }
  };

  const handleCourseSearch = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/courses/search?search=${search}&page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCourses(response.data.courses);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setSearchParams({ page: pageNumber.toString(), limit: limit.toString() });
  };

  const handleClose = () => {};
  return (
    <div
      className=" w-full overflow-scroll  pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <div className=" flex justify-between w-full">
        <h2 className="text-primary text-center text-4xl font-semibold">
          Courses
        </h2>
        <div className="border flex items-center border-[#e70612] text-primary rounded-full ">
          <input
            type="text"
            placeholder="Search course by title or category"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleCourseSearch();
            }}
            className="w-96 rounded-full p-2 pl-4 pr-4 text-base bg-[#111111] h-full"
          />
        </div>
      </div>
      <div className="w-full h-full overflow-scroll bg-secondary shadow-md shadow-[#000] p-4 rounded-md">
        <table className="w-full text-center">
          <thead>
            <tr className="text-secondary rounded-md h-16 text-xl font-medium">
              <td>#</td>
              <td>Course Name</td>
              <td>Category</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {courses.map((data, i: number) => (
              <tr
                key={i}
                className="font-medium border-b text-xl duration-300 transition-all hover:bg-[#1d1d1d] cursor-pointer bg-[#181818]"
              >
                <td>
                  <img src={data.imgUrl} className="w-32 h-20" alt="" />
                </td>
                <td>
                  <h2 className="text-base">
                    {data.title.length > 25
                      ? data.title.slice(0, 25) + "..."
                      : data.title}
                  </h2>
                </td>
                <td>
                  <h2 className="text-base">{data.category}</h2>
                </td>
                <td>
                  <div className="flex bg-[#fff] mr-2 rounded-full">
                    <FiEdit
                      onClick={() => handleNavigation(data)}
                      className="border-r cursor-pointer hover:bg-[#f0f0f0] rounded-l-full w-1/2 p-2 text-[#000] text-4xl"
                    />
                    <FaTrash
                      onClick={() => handleDeleteClick(data)}
                      className="border-r cursor-pointer hover:bg-[#f0f0f0] rounded-r-full w-1/2 p-2 text-primary text-4xl"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
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
      </div>
      <Dialog open={openDeleteDialog} width={450} onClose={handleClose}>
        <div className="w-full flex flex-col text-center gap-12">
          <h2>
            Do you want to delete{" "}
            <span className="font-bold text-primary">
              "
              {courseTitle.length > 25
                ? courseTitle.slice(0, 25) + "..."
                : courseTitle}
              "
            </span>{" "}
            ?
          </h2>
          <div className="flex items-center justify-center gap-14">
            <button
              onClick={() => setOpenDeleteDialog(false)}
              className="p-2 pl-7 pr-7 border hover:bg-[#252525] rounded-lg active:bg-[#303030] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCourse}
              className="p-2 pl-7 pr-7 bg-primary rounded-lg active:bg-[#c5363d] transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default HeroSection;
