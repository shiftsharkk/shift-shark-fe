import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { toast } from "../../atoms/toast";
import OnboardingSteps from "../../templates/onboarding-steps";

const Onboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestToken = searchParams.get("requestToken");

  const { role } = useParams();

  useEffect(() => {
    if (!requestToken) {
      toast.error("Please verify your phone number first");
      navigate(`/${role}/auth?intent=login`);
      return;
    }
  }, [requestToken, navigate, role]);

  return <OnboardingSteps type={role as "hirer" | "service-provider"} />;
};

export default Onboarding;
