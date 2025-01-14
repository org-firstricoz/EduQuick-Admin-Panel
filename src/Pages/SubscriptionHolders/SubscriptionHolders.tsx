import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import HeroSection from "./HeroSection";
import { useTitle } from "@hooks";

const SubscriptionHolders = () => {
  useTitle("Subscription Holders • EduQuick");
  return (
    <div>
      <Nav />
      <div className="flex">
        <Sidebar />
        <HeroSection />
      </div>
    </div>
  );
};

export default SubscriptionHolders;
