import { Route, Routes as RouterRoutes } from "react-router-dom";

import Root from "../components/pages/root";
import Login from "../components/pages/login";
import Onboarding from "../components/pages/onboarding";
import ComponentsTest from "../components/pages/compo";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Root />} />
      <Route path="/compo" element={<ComponentsTest />} />
      <Route path="/service-provider/login" element={<Login />} />
      <Route path="/hirer/login" element={<Login />} />
      <Route
        path="/service-provider/onboarding"
        element={<Onboarding type="service-provider" />}
      />
      <Route path="/hirer/onboarding" element={<Onboarding type="hirer" />} />
      <Route
        path="/service-provider/dashboard"
        element={<div>Dashboard</div>}
      />
    </RouterRoutes>
  );
};

export default Routes;
