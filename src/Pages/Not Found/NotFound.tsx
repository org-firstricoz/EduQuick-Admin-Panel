import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Nav from "@dashboard/Components/Nav/Nav";

const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };
  return (
    <>
      <Nav />
      <div className="w-screen font-poppins  flex flex-col gap-2 justify-center items-center">
        <h2 className="font-jacques  text-primary" style={{ fontSize: 180 }}>
          404
        </h2>
        <p className="font-normal text-3xl">
          <span className="font-bold">Oops</span>, you’ve lost
        </p>
        <p className="font-light ">
          We can’t find the page that you’re looking for...
        </p>
        <button
          onClick={() => handleNavigation("/")}
          className="cursor-pointer border rounded-full w-64 h-12 flex justify-center items-center"
        >
          Back to Dashboard
        </button>
        <div className="absolute bottom-0  flex items-center justify-between p-8 w-full">
          <div className="flex gap-6">
            <div className=" border-2 rounded-full p-3 active:bg-[#2b2b2b] cursor-pointer">
              <FaLinkedinIn className="text-2xl " />
            </div>
            <div className=" border-2 rounded-full p-3 active:bg-[#2b2b2b] cursor-pointer">
              <FaFacebookF className="text-2xl " />
            </div>
            <div className=" border-2 rounded-full p-3 active:bg-[#2b2b2b] cursor-pointer">
              <FaTwitter className="text-2xl " />
            </div>
          </div>
          <p>© 2024 EDUQUICK. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
