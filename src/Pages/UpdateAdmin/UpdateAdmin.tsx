import { baseURL } from "@baseURL";
import Dialog from "@dialog";
import axios from "axios";
import Cookies from "js-cookie";
import { startTransition, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

interface AdminUser {
  createdAt: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
  specialization: string;
  updatedAt: string;
  __v: string;
  _id: string;
}

const UpdateAdmin = () => {
  const { id } = useParams();
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imgType, setImgType] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [gender, setGender] = useState("");

  const [open, setOpen] = useState<boolean>(false);

  const [admin, setAdmin] = useState<AdminUser | null>(null);

  console.log({
    fullName,
    phoneNumber,
    gender,
  });

  const token = Cookies.get("token");
  const getAdmin = async () => {
    try {
      const response = await axios.get(`${baseURL}/admin/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      const data = response.data.admin;
      setFullName(data.fullName);
      setPhoneNumber(data.phoneNumber);
      setAdmin(response.data.admin);
      setAvatar(response.data.admin.profileImageUrl);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        console.log(errorMessage);
      }
    }
  };

  const handleValidationUpdateAdmin = () => {
    if (fullName === "") {
      setFullName(admin?.fullName || "");
    }
    if (phoneNumber === "") {
      setPhoneNumber(admin?.phoneNumber || "");
    }
    if (gender === "") {
      setGender(admin?.gender || "");
    }
    return true;
  };

  const updateAdmin = async () => {
    const isValid = handleValidationUpdateAdmin();
    if (!isValid) {
      return;
    }
    const pendingToast = toast.loading("Updating Admin...");
    try {
      const response = await axios.patch(
        `${baseURL}/admin/profile/${id}`,
        {
          fullName: fullName,
          phoneNumber: phoneNumber,
          profileImageUrl: avatar ? avatar : admin?.profileImageUrl,
          gender: gender ? gender : admin?.gender,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status) {
        toast.dismiss(pendingToast);
        toast.success("Admin Updated!");
        startTransition(() => {
          navigate("/");
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.dismiss(pendingToast);
        const errorMessage = error.response?.data.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      }
    }
  };

  const validation = () => {
    if (imgType === "") {
      alert("Image Type is required!...");
      return false;
    }
    return true;
  };

  const handleChooseFile = () => {
    const isValid = validation();
    if (!isValid) {
      return;
    }

    if (hiddenInput.current) {
      hiddenInput.current.click();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const loadingToast = toast.loading("Uploading...");

      try {
        const extension = file.type.split("/")[1]; // Get the file extension from the MIME type
        const type = "images"; // Set type as per your requirement (e.g., "images")

        const uploadUrlResponse = await axios.post(
          `${baseURL}/admin/storage/upload`,
          {
            extension,
            type,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!uploadUrlResponse.data.status) {
          throw new Error(uploadUrlResponse.data.message);
        }

        const { uploadUrl } = uploadUrlResponse.data;

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        setAvatar(uploadUrlResponse.data.mediaUrl);
        toast.success("Upload successful!");
      } catch (error) {
        console.error(error);
        toast.error("Error uploading file!");
      } finally {
        // Dismiss the loading toast
        toast.dismiss(loadingToast);
      }

      setOpen(false); // Close the dialog after file selection
    }
  };

  useEffect(() => {
    getAdmin();
  }, [id]);

  return (
    <div className="flex flex-col gap-8 p-10 w-full  h-screen">
      <IoChevronBackCircleOutline
        onClick={() => {
          startTransition(() => {
            navigate("/");
          });
        }}
        className="text-4xl cursor-pointer text-[#fff] absolute top-8 left-8"
      />
      <h2 className="text-center text-3xl font-semibold">Update Admin </h2>
      <div className=" flex justify-center items-center w-full">
        <div className="flex gap-6">
          {avatar ? (
            <div>
              <div
                className="w-40 h-40 bg-primary bg-cover bg-no-repeat rounded-full"
                style={{ backgroundImage: `url(${avatar})` }}
              />
              <button
                onClick={() => setOpen(true)}
                className="p-2 pl-5 pr-5 transition-all duration-300 rounded-full mt-2 hover:bg-[#1b1b1b]"
              >
                Choose again
              </button>
            </div>
          ) : (
            <div
              onClick={() => setOpen(true)}
              className="w-40 h-40 rounded-full border flex flex-col justify-center items-center"
            >
              <MdOutlineFileUpload className="text-4xl cursor-pointer transition-all duration-150 p-1 hover:bg-[#1a1a1a] rounded-full" />

              <label className="cursor-pointer"> Upload File</label>
            </div>
          )}
        </div>
        <input
          type="file"
          onChange={(e) => handleFileChange(e)}
          className="hidden"
          ref={hiddenInput}
          accept={`image/${imgType || "png,jpeg,jpg"}`}
        />
        <Dialog width={400} open={open} onClose={() => null}>
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-2xl"
          >
            <IoMdClose />
          </button>
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
            <p>Image Type</p>
            <select
              className="bg-[#000] text-center p-2 border outline-none rounded-md"
              onChange={(e) => setImgType(e.target.value)}
            >
              <option value="">Select Image Type</option>
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="jpg">JPG</option>
            </select>
          </div>

          <button
            onClick={handleChooseFile}
            className="mt-4 p-2 pl-5 pr-5 bg-primary rounded-md"
          >
            Done
          </button>
        </Dialog>
      </div>

      <div className="flex flex-col items-center gap-4 pl-10 pr-10  justify-center">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-1/2 p-2 border placeholder:text-[#fff] bg-[#111111] text-lg  rounded-md"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-1/2 p-2 border placeholder:text-[#fff] bg-[#111111] text-lg  rounded-md"
        />
      </div>
      <div className="flex justify-center gap-4">
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          name="gender"
          id="male"
          className="accent-[#111111]"
          value="Male"
          checked={admin?.gender === "Male"}
          onChange={(e) => setGender(e.target.value)}
        />
        <label htmlFor="Female">Female</label>
        <input
          type="radio"
          name="gender"
          id="Female"
          className="accent-[#111111]"
          value="Female"
          checked={admin?.gender === "Female"}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>

      <div className="flex justify-center gap-8">
        <button
          onClick={updateAdmin}
          className="bg-primary w-fit pl-4 pr-4 p-2 rounded-md"
        >
          Update Admin
        </button>
        <button
          onClick={() => {
            startTransition(() => {
              navigate(`/admin/change-password?admin=${id}`);
            });
          }}
          className="bg-primary w-fit pl-4 pr-4 p-2 rounded-md"
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default UpdateAdmin;
