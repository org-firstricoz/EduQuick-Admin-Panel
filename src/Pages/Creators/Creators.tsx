import HeroSection from "@creators/Components/HeroSection/HeroSection";
import { useTitle } from "@hooks";

const Creators = () => {
  useTitle("Create Course • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Creators;
