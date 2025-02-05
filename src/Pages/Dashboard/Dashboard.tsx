import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
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
      <Nav />
      <div className="flex pr-7">
        <Sidebar />

        <Suspense fallback={<DashboardLoader />}>
          <HeroSection />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
