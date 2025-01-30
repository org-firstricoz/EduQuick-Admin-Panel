import { IoMoonSharp } from "react-icons/io5";
import { MdWbSunny } from "react-icons/md";
import Switch from "react-switch";
import { useDarkMode } from "../context/DarkModeContext";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  console.log(darkMode);

  return (
    <button
      // onClick={toggleDarkMode}
      className="p-2 rounded absolute text-3xl flex gap-2 right-10 bg-[#111] dark:bg-[#fff]"
    >
      <Switch
        onChange={toggleDarkMode}
        checked={darkMode}
        uncheckedIcon={false}
        checkedIcon={false}
      />
      {darkMode ? <IoMoonSharp /> : <MdWbSunny />}
    </button>
  );
};

export default DarkMode;
