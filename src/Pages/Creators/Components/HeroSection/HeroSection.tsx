import { baseURL } from "@baseURL";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa6";
import ContentCreators from "../ContentCreators/ContentCreators";
import ThumbnailDialog from "../ThumbnailDialog/ThumbnailDialog";
import VideoDialog from "../VideoDialog/VideoDialog";
import Dialog from "@dialog";

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
  const [tags, setTags] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [free, setFree] = useState<boolean>(false);
  const [trending, setTrending] = useState<boolean>(false);

  // Video URL
  const [videoURls, setVideoURLs] = useState<string[]>([]);

  const [tag, setTag] = useState("");

  useEffect(() => {
    setVideoURLs(videoURls);
  }, [videoURls]);

  //   Dialog States
  const [openThumbnailDialog, setOpenThumbnailDialog] =
    useState<boolean>(false);
  const [openCreatorsDialog, setOpenCreatorsDialog] = useState<boolean>(false);
  const [openVideoDialog, setOpenVideoDialog] = useState<boolean>(false);
  const [openTagDialog, setOpenTagDialog] = useState<boolean>(false);

  const handleUploadCourse = async () => {
    const pendingToast = toast.loading("Uploading course...");
    try {
      setVideoIds(videoIds);
      setTags(tags);
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
          tags,
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

  const validation = () => {
    if (tag === "") {
      toast.error("Tag is required!");
      return free;
    }
    return true;
  };

  const handleAddTag = () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }
    tags.push(tag);
    setTag("");
    setOpenTagDialog(false);
  };

  return (
    <div
      className="w-full bg-secondary p-6 shadow-[#000] shadow-md rounded-md overflow-scroll flex flex-col gap-4 m-4"
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
        <button className=" borrder w-fit flex items-center gap-2 rounded-md border p-2 ">
          {creator.profileImageUrl ? (
            <img
              src={creator.profileImageUrl}
              alt={creator.Name}
              className=" rounded-full w-14 h-14"
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
        className="w-1/2 bg-secondary placeholder:text-[#fff] outline-none border p-3 text-lg rounded-md"
      />
      <div className="w-1/2 border rounded-md ">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded-md p-2 placeholder:text-[#fff] text-lg outline-none h-16 bg-secondary"
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
          videoURLs={videoURls}
        />
        <label>Select Video</label>
        <div
          onClick={() => setOpenVideoDialog(true)}
          className="border cursor-pointer rounded-md w-48 flex items-center justify-center text-lg h-fit p-2"
        >
          upload file
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {videoURls.map((videoURL, i) => (
          <div key={i} className="w-fit p-2 ">
            <video src={videoURL} />
          </div>
        ))}
      </div>
      <div className="flex w-1/2 gap-6">
        <div className="flex flex-col gap-2">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-fit p-2 rounded-md border outline-none bg-secondary"
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
          <label>Trending</label>
          <select
            value={trending.toString()} // Convert boolean to string for the select value
            onChange={(e) => setTrending(e.target.value === "true")} // Convert string back to boolean
            className="w-fit p-2 rounded-md border outline-none bg-secondary"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label> Free Course</label>
          <select
            value={free.toString()} // Convert boolean to string for the select value
            onChange={(e) => setFree(e.target.value === "true")} // Convert string back to boolean
            className="w-fit p-2 rounded-md border outline-none bg-secondary"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="w-1/2 border p-2 rounded-md">
        <div className="grid grid-cols-4 gap-4">
          {tags.map((tag, i) => (
            <p
              className="text-base p-2 text-center rounded-full font-medium border"
              key={i}
            >
              {tag}
            </p>
          ))}
        </div>
        <div className="flex justify-end">
          <Dialog open={openTagDialog} width={400} onClose={() => null}>
            <div className="flex items-center flex-col gap-3 w-full h-full">
              <input
                type="text"
                placeholder="Enter tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border rounded-md w-full bg-[#1d1d1d] outline-none p-2"
              />
              <button
                onClick={handleAddTag}
                className="bg-primary pl-6 pr-6 rounded-md w-fit p-2 "
              >
                Add Tag
              </button>
            </div>
          </Dialog>
          <button
            onClick={() => setOpenTagDialog(true)}
            className="p-2 pl-6 pr-6 bg-primary  rounded-full"
          >
            Add Tag
          </button>
        </div>
      </div>
      {/* <AddTags
        openTagDialog={openTagDialog}
        tags={tags}
        setOpenTagDialog={setOpenCreatorsDialog}
      /> */}
      <button
        onClick={handleUploadCourse}
        className=" w-fit rounded-md  bg-primary p-2 pl-6 pr-6"
      >
        upload course
      </button>
    </div>
  );
};

export default HeroSection;
