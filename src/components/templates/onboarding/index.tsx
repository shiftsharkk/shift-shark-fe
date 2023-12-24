import { useParams } from 'react-router-dom';

import UserDetailsForm from '../../molecules/register-forms/hirer/user-details';
import CompanyDetailsForm from '../../molecules/register-forms/hirer/company-details';
import OnboardingSteps from '../../organisms/onboarding-steps';
import BasicDetailsForm from '../../molecules/register-forms/service-provider/basic-details';
import BankingDetailsForm from '../../molecules/register-forms/service-provider/banking-details';
import AdditionalDetailsForm from '../../molecules/register-forms/service-provider/additional-details';

import BriefcaseWhiteIcon from '../../../assets/icons/briefcase-white.svg';
import BriefcaseBlackIcon from '../../../assets/icons/briefcase-black.svg';
import UserBlackIcon from '../../../assets/icons/user-black.svg';
import UserWhiteIcon from '../../../assets/icons/user-white.svg';
import DollarSignBlackIcon from '../../../assets/icons/dollar-sign-black.svg';
import DollarSignWhiteIcon from '../../../assets/icons/dollar-sign-white.svg';
import FileTextBlackIcon from '../../../assets/icons/file-text-black.svg';
import FileTextWhiteIcon from '../../../assets/icons/file-text-white.svg';

// hirer onboarding forms
const hirerSteps = [
  {
    title: 'User Details',
    component: <UserDetailsForm />,
    slug: 'user-details',
  },
  {
    title: 'Company Details',
    component: <CompanyDetailsForm />,
    slug: 'company-details',
  },
];

const hirerIndicator = [
  {
    icon: {
      active: UserBlackIcon,
      inactive: UserWhiteIcon,
    },
    description: 'Basic details of the employee creating the account',
    title: 'User Details',
  },
  {
    icon: {
      active: BriefcaseBlackIcon,
      inactive: BriefcaseWhiteIcon,
    },
    description: 'Basic identification details about the company',
    title: 'Company Details',
  },
];

const HirerOnboarding = () => {
  return <OnboardingSteps steps={hirerSteps} indicator={hirerIndicator} />;
};

const serviceProviderSteps = [
  {
    title: 'Basic Details',
    component: <BasicDetailsForm />,
    slug: 'basic-details',
  },
  {
    title: 'Banking Details',
    component: <BankingDetailsForm />,
    slug: 'banking-details',
    skipVisible: true,
  },
  {
    title: 'Additional Details',
    component: <AdditionalDetailsForm />,
    slug: 'additional-details',
    skipVisible: true,
  },
];

// service provider onboarding forms
const serviceProviderIndicator = [
  {
    icon: {
      active: UserBlackIcon,
      inactive: UserWhiteIcon,
    },
    description: 'Some personal details to know you better',
    title: 'Basic Details',
  },
  {
    icon: {
      active: DollarSignBlackIcon,
      inactive: DollarSignWhiteIcon,
    },
    description: 'Where do you like to cash in your hard earned money?',
    title: 'Bank Details',
  },
  {
    icon: {
      active: FileTextBlackIcon,
      inactive: FileTextWhiteIcon,
    },
    description: 'Some additional details to help us serve you better',
    title: 'Additional Details',
  },
];

const ServiceProviderOnboarding = () => {
  return (
    <OnboardingSteps
      steps={serviceProviderSteps}
      indicator={serviceProviderIndicator}
    />
  );
};

const Onboarding = () => {
  const { role } = useParams();
  if (role === 'hirer') return <HirerOnboarding />;
  if (role === 'service-provider') return <ServiceProviderOnboarding />;
  return null;
};

export default Onboarding;
