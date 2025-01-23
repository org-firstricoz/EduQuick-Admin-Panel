import Emails from "@messages/Components/Emails/Emails";
import FilterDialog from "@messages/Components/FilterDialog";
import Header from "@messages/Components/Header/Header";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const HeroSection = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query] = useSearchParams();

  const filter = query.get("filter");

  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 65px)",
      }}
    >
      <div className="flex justify-between">
        <h2 className="text-primary  text-4xl font-semibold">Complaints</h2>
        <div
          onClick={() => setOpen(true)}
          className="border flex cursor-pointer items-center p-2 rounded-md"
        >
          <FaFilter className="w-12" />
          {!filter ? "Filter" : filter}
        </div>
        <FilterDialog open={open} setOpen={setOpen} />
      </div>
      <Header />
      <div className="flex  h-full mt-1 gap-2">
        <Emails />
      </div>
    </div>
  );
};

export default HeroSection;
