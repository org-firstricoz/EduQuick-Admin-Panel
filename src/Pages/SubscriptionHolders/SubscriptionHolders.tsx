import { useTitle } from "@hooks";
import HeroSection from "./HeroSection";

const SubscriptionHolders = () => {
  useTitle("Subscription Holders • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default SubscriptionHolders;
