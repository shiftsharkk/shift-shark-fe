import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { TAuthUser } from '../../types/user';

import { TDecodedToken, getAccessToken } from '../../utils/authTokens';

import { useAuthStore } from '../../stores/auth.store';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams();

  const setUser = useAuthStore((state) => state.setUser);

  const initAuthStore = useCallback(
    (user: TAuthUser) => {
      setUser(user);
    },
    [setUser]
  );

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      navigate(`/${role}/auth?redirect=no-token`);
      return;
    }

    const decodedToken = jwtDecode(token) as TDecodedToken;

    if (role && decodedToken.role !== role) {
      navigate(`/${role}/auth?redirect=forbidden`);
      return;
    }

    // [TODO] : handle token expiry
    // [TODO] : update decoded token type. It ain't TAuthUser
    initAuthStore(decodedToken);
  }, [initAuthStore, navigate, role]);

  return <Outlet />;
};

export default AuthGuard;
