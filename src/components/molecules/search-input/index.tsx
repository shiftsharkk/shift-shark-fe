import { useRef, useState } from 'react';

import Input, { TInputProps } from '../../atoms/input-field';

import useSearchOptions from '../../../utils/hooks/use-search-options';
import useOnClickOutside from '../../../utils/hooks/use-on-click-outside';

export type TSearchInputOption = {
  title: string;
  value: string;
};

type Props = {
  options: TSearchInputOption[];
  onSelect: (value: string) => void;
  label?: string;
  closeOnSelect?: boolean;
} & Omit<TInputProps, 'ref'>;

const SearchInput: React.FC<Props> = ({
  options,
  onSelect,
  label,
  closeOnSelect = true,
  disabled,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState('');

  const optionsRef = useRef<HTMLDivElement>(null);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const filteredOptions = useSearchOptions<TSearchInputOption>({
    options,
    searchValue: inputValue,
    matchFunction: (option, searchValue) => {
      return option.title.toLowerCase().includes(searchValue.toLowerCase());
    },
  });

  useOnClickOutside(optionsRef, () => {
    setIsOptionsVisible(false);
  });

  return (
    <div className="tw-relative">
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onFocus={() => {
          setIsOptionsVisible(true);
        }}
        onClick={() => {
          setIsOptionsVisible(true);
        }}
        label={label}
        disabled={disabled}
        {...rest}
      />
      {isOptionsVisible && !disabled && (
        <div
          className="tw-absolute tw-w-full | tw-bg-white | tw-rounded | tw-shadow-lg | tw-flex tw-flex-col | tw-max-h-[240px] tw-overflow-y-auto"
          ref={optionsRef}
        >
          {filteredOptions.map((option, index) => (
            <button
              className="tw-px-2 tw-py-2 | tw-font-medium | hover:tw-bg-slate-100 | tw-text-left "
              key={index}
              type="button"
              onClick={() => {
                onSelect(option.value);
                setInputValue('');
                if (closeOnSelect) setIsOptionsVisible(false);
              }}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
