import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useIsOnboardingRoute = () => {
  const { pathname } = useLocation();
  const isOnboardingRoute = useMemo(
    () => pathname.includes('onboarding'),
    [pathname]
  );

  return isOnboardingRoute;
};

export default useIsOnboardingRoute;
