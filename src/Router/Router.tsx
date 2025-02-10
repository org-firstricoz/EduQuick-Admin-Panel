import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layouts/Layout";

const Dashboard = lazy(() => import("@dashboard/Dashboard"));
const Leaderboard = lazy(() => import("@leaderboard/Leaderboard"));
const NotFound = lazy(() => import("@notfound"));
const Login = lazy(() => import("@login/Login"));
const SignUp = lazy(() => import("../Pages/SignUp/SignUp"));
const Settings = lazy(() => import("@settings/Settings"));
const Creators = lazy(() => import("@creators/Creators"));
const Products = lazy(() => import("@products/Products"));
const Verify = lazy(() => import("@verify/Verify"));
const Inbox = lazy(() => import("@messages/Inbox/Inbox"));
const UpdateCourse = lazy(() => import("../Pages/UpdateCourse/UpdateCourse"));
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
const AdminPage = lazy(() => import("../Pages/Admin/Admin"));
const OTPVerification = lazy(
  () => import("../Pages/OTP Verification/OTPVerification")
);
const PendingAdmins = lazy(
  () => import("../Pages/PendingAdmins/PendingAdmins")
);
const UpdatePassword = lazy(
  () => import("../Pages/UpdatePassword/UpdatePassword")
);

const VerifyEmail = lazy(() => import("../Pages/VerifyEmail/VerifyEmail"));

const AdminBySpecialization = lazy(
  () => import("../Pages/AdminBySpecialization/AdminBySpecialization")
);

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/subscription"
            element={
              <Layout>
                <SubscriptionHolders />
              </Layout>
            }
          />
          <Route
            path="/users"
            element={
              <Layout>
                <UsersPage />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminPage />
              </Layout>
            }
          />
          <Route path="/admins" element={<AdminBySpecialization />} />
          <Route path="/admin/change-password" element={<UpdatePassword />} />
          <Route path="/admin/profile/:id" element={<UpdateAdmin />} />
          <Route path="/pending-requests" element={<PendingAdmins />} />
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <Layout>
                <Leaderboard />
              </Layout>
            }
          />
          <Route
            path="/courses"
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />
          <Route
            path="/course-verifycation/:id"
            element={<CourseVerifycation />}
          />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/create"
            element={
              <Layout>
                <Creators />
              </Layout>
            }
          />
          <Route
            path="/verify-course"
            element={
              <Layout>
                <Verify />
              </Layout>
            }
          />
          <Route path="/top-courses" element={<TopCoursePage />} />
          <Route
            path="/support"
            element={
              <Layout>
                <Inbox />
              </Layout>
            }
          />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/update-video/:id/videos" element={<UpdateVideo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
