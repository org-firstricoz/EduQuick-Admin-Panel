import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "@messages/Inbox/HeroSection/HeroSection";

const Inbox = () => {
  return (
    <div>
      <Nav />
      <div className="flex ">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Inbox;
