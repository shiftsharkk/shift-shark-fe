import CloseIcon from '../../../assets/icons/close-circle-black-bg.svg';
import { tmsx } from '../../../utils/tmsx';

type Props = {
  name: string;
  onClickDelete?: () => void;
};

const Tag: React.FC<Props> = ({ name, onClickDelete }) => {
  return (
    <span
      className={tmsx(
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
