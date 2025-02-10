import { useTitle } from "@hooks";
import { lazy, Suspense } from "react";
import DashboardLoader from "../../Components/LoadingScreens/DashboardLoader";

const HeroSection = lazy(
  () => import("@dashboard/Components/HeroSection/HeroSection")
);

const Dashboard = () => {
  useTitle("Dashboard • EduQuick");

  return (
    <div>
      <Suspense fallback={<DashboardLoader />}>
        <HeroSection />
      </Suspense>
    </div>
  );
};

export default Dashboard;
