import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "../../atoms/toast";
import OnboardingSteps from "../../templates/onboarding-steps";

const Onboarding: React.FC<{ type: "hirer" | "service-provider" }> = ({
  type,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const requestToken = searchParams.get("requestToken");

  useEffect(() => {
    if (!requestToken) {
      toast.error("Please verify your phone number first");
      navigate("/login?intent=login");
      return;
    }
  }, [requestToken, navigate]);

  return <OnboardingSteps type={type} />;
};

export default Onboarding;
