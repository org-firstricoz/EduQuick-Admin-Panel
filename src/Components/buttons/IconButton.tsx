import { ReactNode } from "react";

interface props {
  children: ReactNode;
  onClick: () => void;
  sx: object;
}

const IconButton = ({ children, onClick, sx }: props) => {
  return (
    <div
      style={sx}
      onClick={onClick}
      className="p-2 rounded-full w-8 h-8 flex justify-center items-center hover:bg-[#252525] transition-all duration-300 active:bg-[#1f1f1f]"
    >
      {children}
    </div>
  );
};

export default IconButton;
