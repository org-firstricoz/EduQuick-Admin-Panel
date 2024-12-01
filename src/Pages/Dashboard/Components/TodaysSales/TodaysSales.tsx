import { todaysSalesData } from "@dashboard/constant/constant";
import { startTransition } from "react";
import { PiExportBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const TodaysSales = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className=" w-3/5 border p-4 rounded-xl shadow-[#0a0a0a] shadow-xl ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col ">
          <p className="text-primary text-xl font-semibold">Today's Sales</p>
          <p className="text-secondary text-base font-normal">Sales Summery</p>
        </div>
        <button className="border hover:bg-[#292929] transition-all duration-150 active:bg-[#464646] flex items-center gap-2 text-primary p-2 pl-4 pr-4 font-medium text-sm rounded-md">
          <PiExportBold className="text-lg" />
          Export
        </button>
      </div>
      <div className="flex items-center  justify-center gap-6 mt-4">
        {todaysSalesData.map((data, i: number) => (
          <div
            key={i}
            className="w-60 flex cursor-pointer hover:scale-105 transition-all duration-300 flex-col gap-2 h-44 bg-[#E7061240] pl-6 p-2 rounded-2xl"
            onClick={() =>
              handleNavigation(data.title.toLowerCase().split(" ").join(""))
            }
          >
            <div className="p-2 bg-primary w-12 rounded-full">
              <img
                src={data.icon}
                alt=""
                className="bg-[#fff] rounded-lg w-12"
              />
            </div>
            <p className="text-2xl font-semibold">{data.sales}</p>
            <p className="text-base font-medium ">{data.title}</p>
            <p className="text-[#399918] text-sm font-medium">{data.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSales;
