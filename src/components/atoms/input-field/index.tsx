import React, { ReactElement, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type TInputProps = {
  type?: 'text' | 'password';
  label?: string;
  prefixElement?: ReactElement;
  error?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      type = 'text',
      label,
      className,
      prefixElement,
      error,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="tw-w-full">
        {label && (
          <label className="tw-text-sm tw-mb-2 | tw-block | tw-font-bold">
            {label}
          </label>
        )}
        <div className="tw-flex tw-w-full">
          {prefixElement && (
            <span className="tw-flex tw-items-center tw-justify-center | tw-border tw-border-[#e7e7e7] tw-rounded-l-lg | tw-px-2 tw-py-1">
              {prefixElement}
            </span>
          )}
          <input
            disabled={disabled}
            className={cn(
              'tw-px-4 tw-py-3 | tw-bg-[#FAFAFA] | tw-rounded-lg | tw-border-[#e7e7e7] tw-border',
              {
                ['tw-flex-1 tw-border-l-0 tw-rounded-l-none']: !!prefixElement,
                ['tw-w-full']: !prefixElement,
                ['tw-opacity-50 tw-cursor-not-allowed']: disabled,
              },
              className
            )}
            {...rest}
            type={type}
            ref={ref}
          />
        </div>
        {error && <p className="tw-text-red-500 tw-text-xs tw-mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
