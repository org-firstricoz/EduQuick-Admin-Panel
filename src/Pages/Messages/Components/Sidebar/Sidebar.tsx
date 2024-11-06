import { mailsButton } from "@messages/constant/constant";
import { startTransition } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(`/mails/${path}`);
    });
  };

  return (
    <div className="border flex flex-col gap-2 w-72 rounded-md p-4 overflow-scroll">
      <button className="w-full bg-primary h-10 rounded-sm">+ Compose</button>
      <p className="font-medium text-sm text-secondary">My Emails</p>
      {mailsButton.map((data, i: number) => (
        <div
          onClick={() => handleNavigation(`${data.title}`)}
          key={i}
          className={`w-full h-10 flex justify-between pl-6 pr-6 font-normal text-lg cursor-pointer items-center gap-2 ${
            location.pathname === `/mails/${data.title}`
              ? "bg-[#e706111f] text-primary"
              : "text-secondary"
          }`}
        >
          <p>{data.title}</p>
          <p className="text-xs font-normal">{data.count}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
