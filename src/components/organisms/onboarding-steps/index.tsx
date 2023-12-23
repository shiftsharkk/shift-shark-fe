import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import FormStepIndicator from '../../molecules/form-step-indicator';

import TwoSectionContainer from '../../atoms/two-sections-container';

import logo from '../../../assets/logo.svg';

type Props = {
  steps: {
    title: string;
    component: JSX.Element;
    slug: string;
    skipVisible?: boolean;
  }[];
  indicator: {
    icon: {
      active: string;
      inactive: string;
    };
    description: string;
    title: string;
  }[];
};

const OnboardingSteps: React.FC<Props> = ({ indicator, steps }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepSlug = searchParams.get('step');

  const { role } = useParams();

  const getStepIndex = (slug: string) => {
    return steps.findIndex((step) => step.slug === slug);
  };

  useEffect(() => {
    if (!stepSlug) {
      setSearchParams(
        (params) => {
          params.set('step', steps[0].slug);
          return params;
        },
        { replace: true }
      );
    }
  }, [setSearchParams, stepSlug, steps]);

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
              activeStep={getStepIndex(stepSlug ?? '')}
            />
          </div>
        }
        rightChild={
          <div className="tw-flex tw-flex-col  | lg:tw-max-w-[320px] tw-w-full">
            <h1 className="tw-flex tw-items-center | tw-text-2xl tw-font-bold | tw-mb-6">
              {steps[getStepIndex(stepSlug ?? '')].title}
              {steps[getStepIndex(stepSlug ?? '')].skipVisible && (
                <Link
                  to={`/${role}/auth?intent=login&createAccount=true`}
                  className="tw-ml-auto tw-text-xs tw-font-medium"
                >
                  Skip
                </Link>
              )}
            </h1>
            {steps[getStepIndex(stepSlug ?? '')].component}
          </div>
        }
      />
    </div>
  );
};

export default OnboardingSteps;
