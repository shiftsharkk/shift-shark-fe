import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { toast } from '../../atoms/toast';

import Onboarding from '../../templates/onboarding';

const OnboardingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestToken = searchParams.get('requestToken');

  const { role } = useParams();

  useEffect(() => {
    if (!requestToken) {
      toast.error('Please verify your phone number first');
      navigate(`/${role}/auth?intent=login`);
      return;
    }
  }, [requestToken, navigate, role]);

  return <Onboarding />;
};

export default OnboardingPage;
