import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Dialog from "../../../../Components/Dialog/Dialog";

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

  const [courses, setCourses] = useState<Course[]>([]);

  const [open, setOpen] = useState(false);

  const getPendingCourses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/courses/get-courses-by-verification-status?status=Pending`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.courses);
      setCourses(response.data.courses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPendingCourses();
  }, []);

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
      <div className="w-full h-full overflow-scroll p-4 border-2 rounded-md">
        <table className="w-full  text-center">
          <tr className=" text-secondary h-16 text-xl font-medium">
            <td>#</td>
            <td>Course Name</td>
            <td>Date</td>
            <td>Verification</td>
            <td>Action</td>
          </tr>

          {courses.map((course, i: number) => (
            <tr key={i} className="font-medium text-xl bg-[#000] ">
              <td className="p-4">{i < 9 ? `0${i + 1}` : i + 1}</td>
              <td>{course.title}</td>
              <td>{new Date(course.createdAt).toLocaleDateString()}</td>
              <td>{course.verificationStatus}</td>
              <td>
                <button
                  onClick={() => setOpen(true)}
                  className="p-2 pl-4 pr-4 rounded-lg bg-primary"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </table>
        <Dialog width={700} open={open} onClose={() => null}>
          <IoMdClose
            onClick={() => setOpen(false)}
            className="absolute right-2 transition-all duration-300 top-2 text-4xl cursor-pointer p-1 rounded-full hover:bg-[#121212]"
          />
          <div className="text-[#fff] p-4 flex flex-col gap-4 items-center justify-center">
            <h2 className="text-2xl">Course Status</h2>
            <div className="flex justify-center gap-2">
              <button className="p-2 pl-4 pr-4 border rounded-full">
                Virified
              </button>
              <button className="p-2 pl-4 pr-4 border rounded-full">
                Rejected
              </button>
              <button className="p-2 pl-4 pr-4 border rounded-full">
                Pending
              </button>
            </div>
            <button className="p-2 pl-4 pr-4 border rounded-full">Edit</button>
            <div className="flex w-full">
              <p className="text-left">*You can edit the course status</p>
            </div>
            <button className="p-2 pl-8 pr-8 border rounded-full">Done</button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
export default HeroSection;
