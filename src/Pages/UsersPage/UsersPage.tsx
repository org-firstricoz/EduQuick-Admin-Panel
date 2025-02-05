import Nav from "@dashboard/Components/Nav/Nav";
import Sidebar from "@dashboard/Components/Sidebar/Sidebar";
import { useTitle } from "@hooks";
import { lazy, Suspense } from "react";
import UsersPageLoader from "../../Components/LoadingScreens/UsersPageLoader";

const HeroSection = lazy(() => import("./HeroSection"));

const UsersPage = () => {
  useTitle("Users • EduQuick");

  return (
    <div>
      <Nav />
      <div className="flex ">
        <Sidebar />
        <Suspense fallback={<UsersPageLoader />}>
          <HeroSection />
        </Suspense>
      </div>
    </div>
  );
};

export default UsersPage;
