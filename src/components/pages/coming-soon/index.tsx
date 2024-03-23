import Sidebar from '@/components/organisms/sidebar';
// import comingsoonImage from '../../../assets/images/comingsoon.svg';
// import { useUserStore } from '@/stores/user.store';
// import { useMemo } from 'react';
import MessageBar from '@/components/organisms/messageBar';

const ComingSoon = () => {
  // const { user } = useUserStore();
  // const reqMessage = useMemo(() => {
  //   return !user?.bankDetails || !user.additionalDetails
  //     ? 'Please complete your profile'
  //     : 'Meanwhile our team will verify your documents and approve your profile';
  // }, [user]);

  return (
    <div className="tw-flex tw-w-screen tw-h-screen">
      <Sidebar />
      <div className="tw-w-full lg:tw-w-[calc(100%-264px)] tw-h-full tw-flex tw-justify-center tw-items-center">
        <div className="tw-flex tw-flex-grow"></div>
        <MessageBar />
      </div>
    </div>
  );
};

export default ComingSoon;
