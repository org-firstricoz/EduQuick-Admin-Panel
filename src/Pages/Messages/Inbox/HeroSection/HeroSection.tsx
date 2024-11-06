import Emails from "@messages/Components/Emails/Emails";
import Sidebar from "@messages/Components/Sidebar/Sidebar";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 flex flex-col font-poppins"
      style={{
        height: "calc(100vh - 100px)",
      }}
    >
      <h2 className="text-primary  text-4xl font-semibold">Inbox</h2>
      <div className="flex  h-full mt-1 gap-2">
        <Sidebar />
        <Emails />
      </div>
    </div>
  );
};

export default HeroSection;
