import { ReactNode, startTransition } from "react";
import { useNavigate } from "react-router-dom";

interface props {
  icon: ReactNode;
  text: string;
  count: number | undefined;
}

const SupportCard = ({ icon, text, count }: props) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(`/admins?specialization=${path}`);
    });
  };

  return (
    <div
      onClick={() => handleNavigation(text)}
      className="w-1/5 bg-secondary p-3 rounded-md flex items-center gap-2 shadow-md shadow-[#000]"
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
