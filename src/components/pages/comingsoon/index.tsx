import Sidebar from '@/components/organisms/sidebar';
import comingsoonImage from '../../../assets/images/comingsoon.svg';
const ComingSoon = () => {
  return (
    <div className="tw-flex tw-w-screen tw-h-screen">
      <Sidebar />
      <div className="tw-w-[calc(100%-264px)] tw-h-full tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center">
        <h3 className="tw-text-[32px] tw-font-semibold">
          Your registration was successful!
        </h3>
        <img src={comingsoonImage} alt="coming-soon" />
        <p className="tw-mb-5">
          Our Team is hard at work to deliver an amazing experience! <br />
          You’ll be notified as soon as we are live
        </p>
        <p>
          Meanwhile our team will reach out to you for{' '}
          <span className="tw-font-semibold">Document Verification</span>
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
