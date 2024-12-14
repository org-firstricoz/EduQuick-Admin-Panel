import axios from "axios";
import { startTransition, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { baseURL } from "../../../../baseURL";
import Dialog from "../../../../Components/Dialog/Dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
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

  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleNavigation = (course: Course) => {
    startTransition(() => {
      navigate(`/update-course/${course._id}`);
    });
  };

  const getCourses = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/courses/all`);
      setCourses(response.data.courses);
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
    getCourses();
  }, [courses]);

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

  const handleClose = () => {};
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 80px)",
      }}
    >
      <h2 className="text-primary text-center text-4xl font-semibold">
        Courses
      </h2>
      <div className="w-full h-full overflow-scroll p-4 border-2 rounded-md">
        <table className="w-full  text-center">
          <tr className=" text-secondary h-16 text-xl font-medium">
            <td>#</td>
            <td>Course Name</td>
            <td>Category</td>
            <td>Action</td>
          </tr>

          {courses.map((data, i: number) => (
            <tr key={i} className="font-medium text-xl bg-[#000] ">
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
                <div className="flex bg-[#fff]  mr-2 rounded-full">
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
        </table>
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
