import { useMemo } from "react";
import { tmsx } from "../../../utils/tmsx";

import Tag from "../../atoms/tag/inex";
import { TInputProps } from "../../atoms/input-field";

import SearchInput, { TSearchInputOption } from "../search-input";

type Props = {
  options: TSearchInputOption[];
  selectedOptions: TSearchInputOption[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<TSearchInputOption[]>
  >;
  label?: string;
  maxSelections?: number;
} & Omit<TInputProps, "ref" | "onSelect">;

const MultiInputField: React.FC<Props> = ({
  options,
  selectedOptions,
  setSelectedOptions,
  label,
  maxSelections,
  disabled,
  className,
  ...rest
}) => {
  const _options = useMemo(() => {
    return options.filter((option) => {
      return !selectedOptions.find((selectedOption) => {
        return selectedOption.value === option.value;
      });
    });
  }, [options, selectedOptions]);

  const handleRemoveItem = (value: string) => {
    setSelectedOptions((_selectedOptions) =>
      _selectedOptions.filter((option) => option.value !== value)
    );
  };

  return (
    <div className={tmsx(className)}>
      <SearchInput
        label={`${label} (${selectedOptions.length}/${maxSelections})`}
        options={_options}
        onSelect={(val) => {
          setSelectedOptions((_options) => [
            ..._options,
            options.find(
              (option) => val === option.value
            ) as TSearchInputOption,
          ]);
        }}
        disabled={maxSelections? (selectedOptions.length >= maxSelections || disabled ) : disabled}
        {...rest}
      />

      <div className="tw-flex tw-flex-wrap tw-gap-1 | tw-mt-1">
        {selectedOptions.map((option, index) => (
          <Tag
            key={index}
            name={option.title}
            onClickDelete={() => handleRemoveItem(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default MultiInputField;
