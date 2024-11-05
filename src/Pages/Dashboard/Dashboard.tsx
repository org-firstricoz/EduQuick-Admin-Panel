import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { lazy, Suspense } from "react";

const HeroSection = lazy(
  () => import("@dashboard/Components/HeroSection/HeroSection")
);

const DashboardSkeleton = lazy(
  () => import("@dashboard/Components/DashboardSkeleton/DashboardSkeleton")
);

const Dashboard = () => {
  return (
    <div>
      <Nav />
      <div className="flex pl-7 pr-7">
        <Sidebar />
        <Suspense fallback={<DashboardSkeleton />}>
          <HeroSection />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
