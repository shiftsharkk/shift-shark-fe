import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="tw-w-screen tw-h-screen tw-grid tw-place-items-center">
      <div className="tw-flex tw-items-center">
        <Loader2 className="tw-w-10 tw-h-10 md:tw-w-20 md:tw-h-20 tw-mr-2 md:tw-mr-6 tw-animate-spin" />
        <h1 className="tw-text-2xl md:-text-5xl tw-font-semibold">Loading</h1>
      </div>
    </div>
  );
};

export default Loader;
