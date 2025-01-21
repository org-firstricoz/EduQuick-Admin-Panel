import { ReactNode } from "react";

interface props {
  icon: ReactNode;
  text: string;
  count: number | undefined;
  onClick: () => void;
  width: number;
}

const SupportCard = ({ icon, text, count, onClick, width }: props) => {
  return (
    <div
      onClick={onClick}
      className={`w-1/${width} bg-secondary p-3 cursor-pointer rounded-md flex items-center gap-2 shadow-md shadow-[#000]`}
    >
      <div className="p-2 bg-primary text-[#fff] rounded-full text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-xs text-nowrap font-semibold">{text}</p>
        <p className="text-sm text-nowrap font-semibold">{count}</p>
      </div>
    </div>
  );
};

export default SupportCard;
