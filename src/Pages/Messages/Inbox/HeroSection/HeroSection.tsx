import Emails from "@messages/Components/Emails/Emails";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 flex flex-col font-poppins"
      style={{
        height: "calc(100vh - 65px)",
      }}
    >
      <h2 className="text-primary  text-4xl font-semibold">Complaints</h2>
      <div className="flex  h-full mt-1 gap-2">
        <Emails />
      </div>
    </div>
  );
};

export default HeroSection;
