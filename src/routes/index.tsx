import { Route, Routes as RouterRoutes } from "react-router-dom";

import Root from "../components/pages/root";
import Login from "../components/pages/login";
import Onboarding from "../components/pages/onboarding";
import ComponentsTest from "../components/pages/compo";
import RoleChecker from "../components/atoms/role-checkoer";

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Root />} />
      <Route path="/compo" element={<ComponentsTest />} />

      {/* common routes */}
      <Route element={<RoleChecker />}>
        <Route path="/:role/auth" element={<Login />} />
        <Route path="/:role/onboarding" element={<Onboarding />} />
      </Route>

      <Route
        path="/service-provider/dashboard"
        element={<div>Dashboard</div>}
      />
    </RouterRoutes>
  );
};

export default Routes;
