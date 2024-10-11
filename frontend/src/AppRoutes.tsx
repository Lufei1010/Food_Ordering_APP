import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Layout>HOME PAGE</Layout> => Layout{children} */}
      <Route
        path="/"
        element={
          <Layout showHero> 
          {/* it is true, then UserProfilePage is false */}
            <HomePage />
          </Layout>
        }
      />
      <Route path="auth-callback" element={<AuthCallbackPage />} />
      <Route path="/user-profile" 
      element={
      <Layout>
        <UserProfilePage />
        </Layout>}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
