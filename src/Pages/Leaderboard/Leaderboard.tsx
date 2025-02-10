import { useTitle } from "@hooks";
import HeroSection from "./Components/HeroSection/HeroSection";

const Leaderboard = () => {
  useTitle("Leaderboard • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Leaderboard;
