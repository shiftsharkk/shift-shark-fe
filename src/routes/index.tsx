import { Route, Routes as RouterRoutes } from 'react-router-dom';

import Root from '../components/pages/root';
import Login from '../components/pages/login';
import Onboarding from '../components/pages/onboarding';
import ComponentsTest from '../components/pages/compo';
import RoleChecker from '../components/atoms/role-checkoer';
import AuthGuard from '../components/layouts/auth-guard';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Root />} />
      <Route path="/compo" element={<ComponentsTest />} />

      {/* role checked routes */}
      <Route element={<RoleChecker />}>
        <Route path="/:role/auth" element={<Login />} />
        <Route path="/:role/onboarding" element={<Onboarding />} />
        {/* protected routes */}
        <Route element={<AuthGuard />}>
          <Route path="/:role/dashboard" element={<div>Dashboard</div>} />
        </Route>
        {/* end of protected routes */}
      </Route>
      {/* end of role checked routes */}
    </RouterRoutes>
  );
};

export default Routes;
