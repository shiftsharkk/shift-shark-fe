import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { getAccessToken } from '@/utils/auth';

const LoggedInAuthRouteGuard: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      return navigate(`/${role}/dashboard`);
    }
  }, [navigate, role]);

  return <Outlet />;
};

export default LoggedInAuthRouteGuard;
