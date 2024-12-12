import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("@dashboard/Dashboard"));
const Leaderboard = lazy(() => import("@leaderboard/Leaderboard"));
const NotFound = lazy(() => import("@notfound"));
const Login = lazy(() => import("@login/Login"));
const Settings = lazy(() => import("@settings/Settings"));
const Creators = lazy(() => import("@creators/Creators"));
const Products = lazy(() => import("@products/Products"));
const Verify = lazy(() => import("@verify/Verify"));
const Inbox = lazy(() => import("@messages/Inbox/Inbox"));
const UpdateCourse = lazy(() => import("@updateCourse/UpdateCourse"));
const TopCoursePage = lazy(
  () => import("../Pages/TopCoursePage/TopCoursePage")
);
const UpdateVideo = lazy(() => import("../Pages/UpdateVideo/UpdateVideo"));
const UpdateAdmin = lazy(() => import("../Pages/UpdateAdmin/UpdateAdmin"));
const CourseVerifycation = lazy(
  () => import("../Pages/Course Verifycation/CourseVerifycation")
);
const SubscriptionHolders = lazy(
  () => import("../Pages/SubscriptionHolders/SubscriptionHolders")
);
const UsersPage = lazy(() => import("../Pages/UsersPage/UsersPage"));

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<SubscriptionHolders />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/courses" element={<Products />} />
          <Route
            path="/course-verifycation/:id"
            element={<CourseVerifycation />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/content" element={<Creators />} />
          <Route path="/verify-report" element={<Verify />} />
          <Route path="/top-courses" element={<TopCoursePage />} />
          <Route path="/mails/Inbox" element={<Inbox />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/update-video/:id" element={<UpdateVideo />} />
          <Route path="/admin/profile/:id" element={<UpdateAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
