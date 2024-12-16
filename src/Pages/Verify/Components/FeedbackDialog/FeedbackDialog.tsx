import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface props {
  id: string;
  openFeedback: boolean;
  setOpenFeedback: (value: boolean) => void;
  setOpen: (value: boolean) => void;
}

const FeedbackDialog = ({
  id,
  openFeedback,
  setOpenFeedback,
  setOpen,
}: props) => {
  const [feedback, setFeedback] = useState("");

  const token = Cookies.get("token");

  const validation = () => {
    if (feedback.length < 20) {
      toast.error("Feedback must be at least 20 characters long.");
      return false;
    }
    if (feedback.length > 200) {
      toast.error("Feedback must not exceed 200 characters.");
      return false;
    }
    return true;
  };

  const handleCourseReject = async () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Rejecting Course...");
    try {
      const response = await axios.patch(
        `${baseURL}/user/courses/${id}/update-course-verification-status`,
        {
          status: "Rejected",
          feedback,
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
        toast.success("Course Rejected!");
        setOpenFeedback(false);
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

  return (
    <Dialog open={openFeedback} width={800} onClose={() => null}>
      <div className="flex flex-col gap-4 p-10">
        <p>Feedback*</p>
        <div className="border rounded-md w-full">
          <textarea
            placeholder="Write a message"
            value={feedback}
            minLength={20}
            maxLength={200}
            onChange={(e) => setFeedback(e.target.value)}
            className="bg-[#111111] w-full h-56 rounded-md outline-none p-2"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleCourseReject}
            className="p-2 pl-6 pr-6 rounded-md bg-primary w-fit"
          >
            Send
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default FeedbackDialog;
