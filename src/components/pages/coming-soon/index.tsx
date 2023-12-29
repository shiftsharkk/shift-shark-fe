import Sidebar from '@/components/organisms/sidebar';
import comingsoonImage from '../../../assets/images/comingsoon.svg';
import { useUserStore } from '@/stores/user.store';
import { useMemo } from 'react';

const ComingSoon = () => {
  const { user } = useUserStore();
  const reqMessage = useMemo(() => {
    return !user?.bankDetails || !user.additionalDetails
      ? 'Please complete your profile'
      : 'Meanwhile our team will verify your documents and approve your profile';
  }, [user]);

  return (
    <div className="tw-flex tw-w-screen tw-h-screen">
      <Sidebar />
      <div className="tw-w-full lg:tw-w-[calc(100%-264px)] tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
        <h3 className="tw-text-[32px] tw-font-semibold">
          Your registration was successful!
        </h3>
        <img src={comingsoonImage} alt="coming-soon" />
        <p className="tw-mb-5">
          Our Team is hard at work to deliver an amazing experience! <br />
          You’ll be notified as soon as we are live
        </p>
        <p className="tw-font-semibold">{reqMessage}</p>
      </div>
    </div>
  );
};

export default ComingSoon;
