import React from "react";

import * as RadioGroup from "@radix-ui/react-radio-group";

type TRadioOption = {
  value: string;
  label: string;
};

type Props = {
  options: TRadioOption[];
  id: string;
  label?: string;
  value?: string;
  onClick: (value: string) => void;
};

const RadioButton: React.FC<Props> = ({
  options,
  id,
  label,
  value,
  onClick
}) => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-0.5">
      {label && (
        <label className="tw-text-sm tw-mb-2 | tw-block | tw-font-bold">
          {label}
        </label>
      )}
      <RadioGroup.Root orientation="vertical" className="tw-flex tw-gap-4" defaultValue={value}>
        {options.map((option, idx) => (
          <div key={idx} className="tw-inline-flex tw-items-center tw-gap-1">
            <RadioGroup.Item
              className="tw-w-6 tw-h-6 | tw-rounded-full tw-border-2 tw-border-black"
              id={`${id}-${idx}`}
              value={option.value}
              onClick={() => {onClick(option.value)}}
            >
              <RadioGroup.Indicator className="tw-w-full tw-h-full | tw-flex tw-items-center tw-justify-center tw-relative || after:tw-w-3 after:tw-h-3 | after:tw-rounded-full after:tw-bg-black | after:tw-block" />
            </RadioGroup.Item>
            <label
              className="tw-font-bold tw-cursor-pointer"
              htmlFor={`${id}-${idx}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
};

export default RadioButton;
