import { useState } from "react";
import ThumbnailDialog from "../ThumbnailDialog/ThumbnailDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "@baseURL";
import Cookies from "js-cookie";
import ContentCreators from "../ContentCreators/ContentCreators";
import { FaUser } from "react-icons/fa6";
import VideoDialog from "../VideoDialog/VideoDialog";

interface Creator {
  BillingCycle: string;
  Email: string;
  ExpiryDate: string;
  Name: string;
  PhoneNumber: string;
  RegisteredDate: string;
  Role: string;
  StartDate: string;
  Subscription: string;
  id: string;
  profileImageUrl: string;
}

const HeroSection = () => {
  const token = Cookies.get("token");

  // States
  const [creator, setCreator] = useState<Creator | null>(null);

  // Course Details
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [free, setFree] = useState<boolean>(false);
  const [trending, setTrending] = useState<boolean>(false);

  //   Dialog States
  const [openThumbnailDialog, setOpenThumbnailDialog] =
    useState<boolean>(false);
  const [openCreatorsDialog, setOpenCreatorsDialog] = useState<boolean>(false);
  const [openVideoDialog, setOpenVideoDialog] = useState<boolean>(false);

  const handleUploadCourse = async () => {
    const pendingToast = toast.loading("Uploading course...");
    try {
      setVideoIds(videoIds);
      const response = await axios.post(
        `${baseURL}/admin/course`,
        {
          title,
          description,
          imgUrl: thumbnail,
          videoIds,
          category,
          trending,
          freeCourse: free,
          tags: ["Mobile"],
          uploadedBy: creator?.id,
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
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error)) {
        toast.dismiss(pendingToast);
        const errorMessage = error.response?.data.error;
        toast.error(errorMessage || "Server Error!");
      }
    }
  };

  return (
    <div
      className="w-full p-6 rounded-md overflow-scroll flex flex-col gap-4 border m-4"
      style={{
        maxHeight: 520,
      }}
    >
      <ContentCreators
        openCreatorsDialog={openCreatorsDialog}
        setOpenCreatorsDialog={setOpenCreatorsDialog}
        setCreator={setCreator}
      />
      {creator ? (
        <button className="w-fit borrder flex items-center gap-2 rounded-md border p-2 ">
          {creator.profileImageUrl ? (
            <img
              src={creator.profileImageUrl}
              alt={creator.Name}
              className=" rounded-full w-14"
            />
          ) : (
            <FaUser className="border p-2 rounded-full text-5xl" />
          )}
          <p>{creator.Name}</p>
        </button>
      ) : (
        <button
          onClick={() => setOpenCreatorsDialog(true)}
          className="w-fit borrder rounded-md border p-2 "
        >
          List of Content Creators
        </button>
      )}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title"
        className="w-1/2 bg-[#111111] placeholder:text-[#fff] outline-none border p-3 text-lg rounded-md"
      />
      <div className="w-1/2 border rounded-md ">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded-md p-2 placeholder:text-[#fff] text-lg outline-none h-16 bg-[#111111]"
        />
      </div>
      <div>
        <ThumbnailDialog
          openThumbnailDialog={openThumbnailDialog}
          setOpenThumbnailDialog={setOpenThumbnailDialog}
          setThumbnail={setThumbnail}
        />
        <label>Thumbnail</label>
        <div
          onClick={() => setOpenThumbnailDialog(true)}
          className="border cursor-pointer rounded-md w-48 flex items-center justify-center text-lg h-28"
        >
          {thumbnail ? (
            <>
              <div
                className="w-full h-full bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${thumbnail})`,
                }}
              />
            </>
          ) : (
            " upload file"
          )}
        </div>
        {thumbnail && (
          <button
            onClick={() => setOpenThumbnailDialog(true)}
            className="mt-4 p-2 pl-6 pr-6 border rounded-md"
          >
            Choose again
          </button>
        )}
      </div>
      <div>
        <VideoDialog
          openVideoDialog={openVideoDialog}
          setOpenVideoDialog={setOpenVideoDialog}
          videoIds={videoIds}
          uploadedBy={creator?.id ? creator.id : ""}
        />
        <label>Select Video</label>
        <div
          onClick={() => setOpenVideoDialog(true)}
          className="border rounded-md w-48 flex items-center justify-center text-lg h-fit p-2"
        >
          upload file
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-fit p-2 rounded-md border outline-none bg-[#111111]"
        >
          <option value="">Select</option>
          <option value="Mobile Tricks">Mobile Tricks</option>
          <option value="Share Market">Share Market</option>
          <option value="YouTube">YouTube</option>
          <option value="Part Time">Part Time</option>
          <option value="Sarkari Kaam">Sarkari Kaam</option>
          <option value="Business">Business</option>
          <option value="Astrology">Astrology</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label> Free Course</label>
        <select
          value={free.toString()} // Convert boolean to string for the select value
          onChange={(e) => setFree(e.target.value === "true")} // Convert string back to boolean
          className="w-fit p-2 rounded-md border outline-none bg-[#111111]"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label>Trending</label>
        <select
          value={trending.toString()} // Convert boolean to string for the select value
          onChange={(e) => setTrending(e.target.value === "true")} // Convert string back to boolean
          className="w-fit p-2 rounded-md border outline-none bg-[#111111]"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button
        onClick={handleUploadCourse}
        className="fixed bottom-8 rounded-md right-16 bg-primary p-2 pl-6 pr-6"
      >
        upload course
      </button>
    </div>
  );
};

export default HeroSection;
