import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout";

const AppRoutes = () => {
    return (
      <Routes>
        {/* <Layout>HOME PAGE</Layout> => Layout{children} */}
        <Route path="/" element={<Layout>HOME PAGE</Layout>}></Route>
        <Route
          path="/user-profile"
          element={<span>USER PROFILE PAGE</span>}
        ></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    );
}

export default AppRoutes;