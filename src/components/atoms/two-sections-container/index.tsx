import { tmsx } from '../../../utils/tmsx';

type Props = {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
  leftChildClassName?: string;
  rightChildClassName?: string;
};

const TwoSectionContainer: React.FC<Props> = ({
  leftChild,
  rightChild,
  leftChildClassName,
  rightChildClassName,
}) => {
  return (
    <section className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 | tw-min-h-full lg:tw-min-h-[577px] tw-w-full lg:tw-w-[912px] | lg:tw-rounded-2xl tw-overflow-hidden | lg:tw-shadow-lg">
      <div
        className={tmsx(
          'tw-text-white | tw-flex tw-flex-col tw-justify-center | tw-bg-black | tw-relative | tw-px-12',
          leftChildClassName
        )}
      >
        <div className="tw-max-w-sm tw-h-full">{leftChild}</div>
      </div>
      <div
        className={tmsx(
          'tw-bg-white | tw-p-6 | tw-flex tw-flex-col tw-gap-8 tw-justify-start lg:tw-justify-center tw-items-center | tw-overflow-y-auto',
          rightChildClassName
        )}
      >
        {rightChild}
      </div>
    </section>
  );
};

export default TwoSectionContainer;
