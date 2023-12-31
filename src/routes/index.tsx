import { Route, Routes as RouterRoutes } from 'react-router-dom';

import RoleChecker from '../components/atoms/role-checkoer';

import AuthGuard from '../components/layouts/auth-guard';

import Root from '../components/pages/root';
import Login from '../components/pages/login';
import Onboarding from '../components/pages/onboarding';
import ComponentsTest from '../components/pages/compo';
import ComingSoon from '@/components/pages/coming-soon';
import Dashboard from '@/components/pages/dashboard';
import Profile from '@/components/pages/profile';

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
          <Route path="/:role/dashboard" element={<Dashboard />} />
          <Route path="/:role/coming-soon" element={<ComingSoon />} />
          <Route path="/:role/profile-settings" element={<Profile />} />
        </Route>
        {/* end of protected routes */}
      </Route>
      {/* end of role checked routes */}
    </RouterRoutes>
  );
};

export default Routes;
