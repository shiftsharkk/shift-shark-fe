import { cn } from '../../../utils/utils';

export type TFormStepIndicatorElement = {
  icon: {
    active: string;
    inactive: string;
  };
  title: string;
  description: string;
  active: boolean;
  showConnector: boolean;
};

const FormStepIndicatorElement: React.FC<TFormStepIndicatorElement> = ({
  icon,
  title,
  description,
  active,
  showConnector,
}) => {
  return (
    <div className="tw-flex tw-flex-row lg:tw-flex-col tw-items-center lg:tw-items-start">
      <div className="tw-flex tw-gap-2 tw-items-center">
        <div
          className={cn(
            'tw-p-2 | tw-rounded-full | tw-border-white tw-border',
            {
              ['tw-bg-white']: active,
            }
          )}
        >
          <img
            src={active ? icon.active : icon.inactive}
            alt="icon"
            className="tw-w-6 tw-h-6"
          />
        </div>
        <div className="tw-hidden lg:tw-flex tw-flex-col">
          <p className="tw-text-sm tw-font-bold">{title}</p>
          <p className="tw-text-xs tw-text-gray-500">{description}</p>
        </div>
      </div>
      {showConnector && (
        <div className="tw-w-10 lg:tw-w-px tw-h-px lg:tw-h-10 tw-bg-white lg:tw-ml-[21px]" />
      )}
    </div>
  );
};

export default FormStepIndicatorElement;
