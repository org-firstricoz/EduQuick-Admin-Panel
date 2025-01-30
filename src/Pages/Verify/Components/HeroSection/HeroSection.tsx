import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ImFilter } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import Dialog from "../../../../Components/Dialog/Dialog";
import FeedbackDialog from "../FeedbackDialog/FeedbackDialog";
import FilterDialog from "../FilterDialog/FilterDialog";

interface Course {
  adminFeedback: string;
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
  uploadedBy: string;
  verificationStatus: string;
  videoIds: string[];
  views: string;
  __v: string;
  _id: string;
}

const HeroSection = () => {
  const token = Cookies.get("token");
  const [id, setId] = useState("");

  const [courses, setCourses] = useState<Course[]>([]);

  const [filter, setFilter] = useState("Pending");

  const [open, setOpen] = useState(false);
  const [openFeedback, setOpenFeedback] = useState<boolean>(false);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const getCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/courses/get-courses-by-verification-status?status=${filter}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const handleCourseVerify = async () => {
    const pendingToast = toast.loading("Verifying Course...");
    try {
      const response = await axios.patch(
        `${baseURL}/user/courses/${id}/update-course-verification-status`,
        {
          status: "Verified",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      if (response.data.status) {
        toast.dismiss(pendingToast);
        toast.success("Course verified!");
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.dismiss(pendingToast);
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    getCourses();
  }, [courses, id, filter]);

  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 p-2 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <h2 className="text-primary flex items-center gap-2 justify-center text-center text-4xl font-semibold">
        Verification{" "}
        <span className="border w-6 h-6 flex items-center font-normal justify-center rounded-full text-sm">
          ?
        </span>
      </h2>
      <div className="flex justify-end">
        <FilterDialog
          filter={filter}
          setFilter={setFilter}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
        />
        <button
          onClick={() => setOpenFilter(true)}
          className="border flex items-center justify-center gap-4 w-fit p-3 pl-6 pr-6 rounded-md"
        >
          <ImFilter className="text-2xl" />
          <p>{filter}</p>
        </button>
      </div>
      <div className="w-full h-full overflow-scroll p-4 bg-secondary dark:bg-[#fff] dark:text-[#111] shadow-[#000] shadow-md rounded-md">
        <table className="w-full  text-center">
          <tr className=" text-secondary h-16 text-xl font-medium">
            <td>#</td>
            <td>Course Name</td>
            <td>Date</td>
            <td>Verification</td>
            <td>Action</td>
          </tr>

          {courses.length === 0 ? (
            <div className="text-center text-2xl p-4">No courses available</div>
          ) : (
            courses.map((course, i: number) => (
              <tr
                key={i}
                className="font-medium border-b text-xl bg-secondary dark:bg-[#fff] dark:text-[#111] rounded-md hover:bg-[#2d2d2d] cursor-pointer duration-300 "
              >
                <td className="p-4">{i < 9 ? `0${i + 1}` : i + 1}</td>
                <td>
                  {course.title.length > 20
                    ? `${course.title.slice(0, 20)}...`
                    : course.title}
                </td>
                <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                <td>{course.verificationStatus}</td>
                <td>
                  <button
                    onClick={() => {
                      setOpen(true);
                      setId(course._id);
                    }}
                    className="p-2 pl-4 pr-4 rounded-lg bg-primary"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </table>

        <Dialog width={700} open={open} onClose={() => null}>
          <IoMdClose
            onClick={() => setOpen(false)}
            className="absolute right-2 transition-all duration-300 top-2 text-4xl cursor-pointer p-1 rounded-full hover:bg-[#121212]"
          />
          <div className="text-[#fff] p-4 flex flex-col gap-4 items-center justify-center">
            <h2 className="text-2xl">Course Status</h2>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleCourseVerify}
                className={`p-2 pl-4 pr-4 border rounded-full ${
                  filter === "Verified" && "bg-primary border-none"
                }`}
              >
                Verified
              </button>

              <button
                onClick={() => setOpenFeedback(true)}
                className={`p-2 pl-4 pr-4 border rounded-full ${
                  filter === "Rejected" && "bg-primary border-none"
                }`}
              >
                Rejected
              </button>
              <button
                className={`p-2 pl-4 pr-4 border rounded-full ${
                  filter === "Pending" && "bg-primary border-none"
                }`}
              >
                Pending
              </button>
            </div>

            <div className="flex w-full">
              <p className="text-left">*You can edit the course status</p>
            </div>
          </div>
        </Dialog>
        <FeedbackDialog
          openFeedback={openFeedback}
          setOpenFeedback={setOpenFeedback}
          setOpen={setOpen}
          id={id}
        />
      </div>
    </div>
  );
};
export default HeroSection;
