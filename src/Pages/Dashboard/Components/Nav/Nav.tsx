import { IoSearch } from "react-icons/io5";
import user from "@dashboard/Assets/user.png";

const Nav = () => {
  return (
    <div className="flex justify-between pl-7 p-4 pr-7 items-center">
      <h1 className="text-primary font-jockey font-normal text-4xl">
        EDUQUICK
      </h1>
      <div className="h-full flex items-center gap-10">
        <h2 className="text-3xl font-semibold font-poppins text-primary">
          Dashboard
        </h2>
        <div className="border p-4 flex items-center rounded-3xl gap-2">
          <IoSearch className="text-primary text-xl" />
          <input
            type="text"
            className="h-5 bg-[#111111] placeholder:text-primary outline-none text-primary font-poppins text-lg "
            placeholder="Search"
            style={{
              width: 500,
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img src={user} alt="User" className="w-16 rounded-full" />
        <div>
          <p className="font-medium text-base text-primary">Rutik</p>
          <p className="text-sm text-secondary">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
