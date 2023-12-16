import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import TwoSectionContainer from "../../atoms/two-sections-container";
import type { TFormStepIndicatorElement } from "../../atoms/form-step-indicator-element";

import BasicDetailsForm from "../../molecules/register-forms/basic-details";
import BankingDetailsForm from "../../molecules/register-forms/banking-details";
import AdditionalDetailsForm from "../../molecules/register-forms/additional-details";
import FormStepIndicator from "../../molecules/form-step-indicator";

import logo from "../../../assets/logo.svg";

import DollarSignBlackIcon from "../../../assets/icons/dollar-sign-black.svg";
import FileTextBlackIcon from "../../../assets/icons/file-text-black.svg";
import UserBlackIcon from "../../../assets/icons/user-black.svg";

import DollarSignWhiteIcon from "../../../assets/icons/dollar-sign-white.svg";
import FileTextWhiteIcon from "../../../assets/icons/file-text-white.svg";
import UserWhiteIcon from "../../../assets/icons/user-white.svg";

const steps = [
  {
    title: "Basic Details",
    component: <BasicDetailsForm />,
    slug: "basic-details",
  },
  {
    title: "Banking Details",
    component: <BankingDetailsForm />,
    slug: "banking-details",
  },
  {
    title: "Additional Details",
    component: <AdditionalDetailsForm />,
    slug: "additional-details",
  },
];

const indicator: Omit<TFormStepIndicatorElement, "active" | "showConnector">[] =
  [
    {
      icon: {
        active: UserBlackIcon,
        inactive: UserWhiteIcon,
      },
      description: "Some personal details to know you better",
      title: "Basic Details",
    },
    {
      icon: {
        active: DollarSignBlackIcon,
        inactive: DollarSignWhiteIcon,
      },
      description: "Where do you like to cash in your hard earned money?",
      title: "Bank Details",
    },
    {
      icon: {
        active: FileTextBlackIcon,
        inactive: FileTextWhiteIcon,
      },
      description: "Some additional details to help us serve you better",
      title: "Additional Details",
    },
  ];

const OnboardingSteps: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepSlug = searchParams.get("step");

  const getStepIndex = (slug: string) => {
    return steps.findIndex((step) => step.slug === slug);
  };

  useEffect(() => {
    if (!stepSlug) {
      setSearchParams(
        (params) => {
          params.set("step", steps[0].slug);
          return params;
        },
        { replace: true }
      );
    }
  }, [setSearchParams, stepSlug]);

  if (!stepSlug) return null;

  return (
    <div className="tw-grid tw-place-items-center | tw-min-h-screen tw-min-w-full">
      <TwoSectionContainer
        leftChild={
          <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-min-h-[300px] tw-justify-end lg:tw-justify-center tw-items-start tw-pb-10 lg:tw-pb-0">
            <img
              src={logo}
              alt="shift shark logo"
              className="tw-absolute tw-top-6 tw-left-6"
            />
            <p className="tw-font-bold tw-text-base | tw-mb-6">
              Few Things before we get started...
            </p>
            <FormStepIndicator
              steps={indicator}
              activeStep={getStepIndex(stepSlug ?? "")}
            />
          </div>
        }
        rightChild={
          <div className="tw-flex tw-flex-col  | lg:tw-max-w-[320px] tw-w-full">
            <h1 className="tw-flex tw-items-center | tw-text-2xl tw-font-bold | tw-mb-6">
              {steps[getStepIndex(stepSlug ?? "")].title}
              {steps[getStepIndex(stepSlug ?? "")].slug !== "basic-details" && (
                <Link
                  to="/login?intent=login"
                  className="tw-ml-auto tw-text-xs tw-font-medium"
                >
                  Skip
                </Link>
              )}
            </h1>
            {steps[getStepIndex(stepSlug ?? "")].component}
          </div>
        }
      />
    </div>
  );
};

export default OnboardingSteps;
