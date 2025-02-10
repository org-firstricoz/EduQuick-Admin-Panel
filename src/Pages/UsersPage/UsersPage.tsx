import { useTitle } from "@hooks";
import { lazy, Suspense } from "react";
import UsersPageLoader from "../../Components/LoadingScreens/UsersPageLoader";

const HeroSection = lazy(() => import("./HeroSection"));

const UsersPage = () => {
  useTitle("Users • EduQuick");

  return (
    <div>
      <Suspense fallback={<UsersPageLoader />}>
        <HeroSection />
      </Suspense>
    </div>
  );
};

export default UsersPage;
