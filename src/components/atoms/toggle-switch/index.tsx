import * as Toggle from '@radix-ui/react-toggle';
import { tmsx } from '../../../utils/tmsx';

type Props = {
  toggle: boolean;
  setToggle: (checked: boolean) => void;
  // [TODO]: implement sizes
  size?: 'sm' | 'md' | 'lg';
};

const ToggleSwitch: React.FC<Props> = ({ toggle, setToggle, size }) => {
  return (
    <Toggle.Root
      pressed={toggle}
      onPressedChange={setToggle}
      className={tmsx(
        'tw-p-0.5 | tw-border tw-border-black | tw-rounded-full | tw-relative',
        { ['tw-w-[26px]']: size === 'sm', ['tw-w-[38px]']: size === 'md' }
      )}
    >
      <span
        className={tmsx(
          'tw-block | tw-rounded-full | tw-bg-black | tw-transition-transform',
          {
            [' tw-translate-x-full']: toggle,
            ['tw-w-[10px] tw-h-[10px]']: size === 'sm',
            ['tw-w-4 tw-h-4']: size === 'md',
          }
        )}
      />
    </Toggle.Root>
  );
};

export default ToggleSwitch;
