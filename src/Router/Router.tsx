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

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/content" element={<Creators />} />
          <Route path="/verify-report" element={<Verify />} />
          <Route path="/mails/Inbox" element={<Inbox />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
