import Emails from "@messages/Components/Emails/Emails";
import Header from "@messages/Components/Header/Header";

const HeroSection = () => {
  return (
    <div
      className=" w-full overflow-scroll pl-4 pr-4 flex flex-col gap-4 font-poppins"
      style={{
        height: "calc(100vh - 65px)",
      }}
    >
      <h2 className="text-primary  text-4xl font-semibold">Complaints</h2>
      <Header />
      <div className="flex  h-full mt-1 gap-2">
        <Emails />
      </div>
    </div>
  );
};

export default HeroSection;
