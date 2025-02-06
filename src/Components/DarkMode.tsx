import Switch from "react-switch";
import { useDarkMode } from "../context/DarkModeContext";

const DarkMode = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  console.log(darkMode);

  return (
    <button
      // onClick={toggleDarkMode}
      className="p-2 rounded relative text-3xl flex gap-2 right-0 bg-[#111] dark:bg-[#fff]"
    >
      <Switch
        onChange={toggleDarkMode}
        checked={darkMode}
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </button>
  );
};

export default DarkMode;
