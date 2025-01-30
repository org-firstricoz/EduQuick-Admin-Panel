import { useDarkMode } from "../context/DarkModeContext";
import { MdWbSunny } from "react-icons/md";
import { IoMoonSharp } from "react-icons/io5";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded absolute text-3xl right-10 bg-[#111] dark:bg-[#fff]"
    >
      {darkMode ? <IoMoonSharp /> : <MdWbSunny />}
    </button>
  );
};

export default DarkMode;
