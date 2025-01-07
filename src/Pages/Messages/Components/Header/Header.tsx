import { IoSearch } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { TbInfoHexagonFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

const Header = () => {
  return (
    <div className="flex  justify-between pl-6  pr-6">
      <div className="w-1/2 flex items-center justify-center gap-2 pl-4 bg-[#D5D5D5] rounded-xl">
        <label htmlFor="search" className="text-2xl cursor-pointer">
          <IoSearch className="text-2xl text-[#000]" />
        </label>

        <input
          type="text"
          className="h-10 w-full rounded-xl outline-none bg-[#D5D5D5] text-[#000] placeholder:text-[#000]"
          placeholder="Search mail"
          id="search"
        />
      </div>
      <div className="bg-[#D5D5D5] text-[#000] text-4xl gap-4 rounded-xl pl-4 pr-4 w-fit flex justify-center items-center">
        <FaDownload className="cursor-pointer p-2 hover:bg-[#c4c4c4] rounded-full transition-all duration-200" />
        <TbInfoHexagonFilled className="cursor-pointer p-2 hover:bg-[#c4c4c4] rounded-full transition-all duration-200" />
        <MdDelete className="cursor-pointer p-2 hover:bg-[#c4c4c4] rounded-full transition-all duration-200" />
      </div>
    </div>
  );
};

export default Header;
