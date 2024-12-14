import { baseURL } from "@baseURL";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
interface Course {
  avgRating?: string;
  category?: string;
  createdAt?: string;
  description?: string;
  freeCourse?: boolean;
  imgUrl?: string;
  rating?: string;
  tags?: string[];
  title?: string;
  trending?: boolean;
  updatedAt?: string;
  videoIds?: string[];
  views?: string;
  __v?: string;
  _id?: string;
}

interface Video {
  description: string;
  dislikes: string;
  duration: string;
  id: string;
  likes: string;
  quality: string;
  thumbnailUrl: string;
  title: string;
  uploadedBy: string;
  videoSequence: string;
  videoUrl: string;
  views: string;
  watchTime: string;
}

const CourseVerifycation = () => {
  const { id } = useParams();
  // const navigate = useNavigate();

  // const handleNavigation = (path: string) => {
  //   startTransition(() => {
  //     navigate(path);
  //   });
  // };

  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoIds, setVideoIds] = useState();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getCourse = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/course-by-courseId?id=${id}`
      );
      setCourse(response.data.course);
      setVideoIds(response.data.course.videoIds);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  const getVideos = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/user/video-by-videoId?id=${videoIds}`
      );
      setVideos(response.data.videos);
    } catch (error) {
      console.log(error);
    }
  };

  if (videoIds !== "") {
    getVideos();
  }

  useEffect(() => {
    getCourse();
  }, [id]);

  return (
    <div className="w-screen h-screen flex gap-6 p-10">
      <div className="h-full overflow-scroll flex flex-col gap-4 w-2/3">
        {selectedVideo?.videoUrl ? (
          <video
            src={selectedVideo?.videoUrl}
            controls
            className="w-full h-96"
          />
        ) : (
          <img
            src={course?.imgUrl}
            alt={course?.title}
            className="w-full h-96"
          />
        )}
        <h2 className="text-2xl">{selectedVideo?.title}</h2>
        <p className="font-normal text-base">{selectedVideo?.description}</p>
        <div className="flex gap-8 font-normal mt-2 items-center">
          <button className="p-2 pl-6 pr-6 border rounded-md">Edit</button>
          <button className="p-2 pl-6 pr-6 border rounded-md">Verify</button>
          <button className="underline">Back</button>
        </div>
      </div>

      <div className="h-full rounded-md w-5/12 pt-8 pb-8 bg-[#242428]">
        <h1 className="text-center text-2xl font-semibold">{course?.title}</h1>
        {/* <p className="text-center text-sm font-semibold">
          {course?.videoIds?.length}
        </p> */}

        {videos.map((video, i) => (
          <div
            onClick={() => setSelectedVideo(video)}
            key={i}
            className={`flex gap-4 p-4 cursor-pointer hover:bg-[#303035] ${
              selectedVideo?.videoUrl === video.videoUrl && "bg-[#303035]"
            }`}
          >
            <input type="checkbox" id="" className="accent-[#E70612]" />
            <h2>
              {video.title.length > 40
                ? video.title.slice(0, 40) + "..."
                : video.title}
            </h2>
            <p>{video.duration}sec</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseVerifycation;
