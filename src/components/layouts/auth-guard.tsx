import { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { TAuthUser } from '../../types/user';

import { getAccessToken } from '../../utils/auth';

import { useAuthStore } from '../../stores/auth.store';
import { TDecodedToken } from '@/types/auth';
import { getUser } from '@/api-calls/user';
import { useUserStore } from '@/stores/user.store';
import Loader from '../molecules/Loader';

const AuthGuard: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const makeApiCall = useRef(false);
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  const setAuthUser = useAuthStore((state) => state.setUser);

  const initAuthStore = useCallback(
    (user: TAuthUser) => {
      setAuthUser(user);
    },
    [setAuthUser]
  );

  useEffect(() => {
    const storeUser = async () => {
      try {
        setIsLoading(true);
        const res = await getUser();
        if (res.data) {
          setUser(res.data.user);
          console.log(res.data.user, 'user');
        }
      } catch (error) {
        navigate(`/${role}/auth?redirect=no-token`);
      } finally {
        setIsLoading(false);
      }
    };
    if (makeApiCall.current) {
      storeUser();
    }
    makeApiCall.current = true;
  }, [navigate, role, setUser]);

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

  if (isLoading) {
    <Loader />;
  }

  return <Outlet />;
};

export default AuthGuard;
