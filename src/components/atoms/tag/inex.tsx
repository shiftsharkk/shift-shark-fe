import CloseIcon from '../../../assets/icons/close-circle-black-bg.svg';
import { cn } from '../../../utils/utils';

type Props = {
  name: string;
  onClickDelete?: () => void;
};

const Tag: React.FC<Props> = ({ name, onClickDelete }) => {
  return (
    <span
      className={cn(
        'tw-inline-flex tw-gap-1 tw-items-center | tw-p-1 tw-pl-2',
        'tw-border tw-border-black | tw-shadow-sm | tw-rounded-full | tw-font-bold',
        'tw-text-xs'
      )}
    >
      {name}
      {onClickDelete && (
        <button type="button" onClick={onClickDelete}>
          <img src={CloseIcon} alt="remove" />
        </button>
      )}
    </span>
  );
};

export default Tag;
