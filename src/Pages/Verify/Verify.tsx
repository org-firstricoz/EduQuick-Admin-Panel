import { useTitle } from "@hooks";
import HeroSection from "@verify/Components/HeroSection/HeroSection";

const Verify = () => {
  useTitle("Verify Course • EduQuick");
  return (
    <div>
      <HeroSection />
    </div>
  );
};

export default Verify;
