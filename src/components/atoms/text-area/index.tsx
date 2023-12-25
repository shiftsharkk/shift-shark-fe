import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  error?: string;
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, className, ...rest }, ref) => (
    <div className="tw-w-full">
      {label && (
        <label className="tw-text-sm tw-mb-2 | tw-block | tw-font-bold">
          {label}
        </label>
      )}
      <div className="tw-flex tw-w-full">
        <textarea
          className={cn(
            'tw-px-4 tw-py-3 | tw-bg-[#FAFAFA] | tw-rounded-lg | tw-border-[#e7e7e7] tw-border | tw-w-full',
            className
          )}
          {...rest}
          ref={ref}
        />
      </div>
      {error && <p className="tw-text-red-500 tw-text-xs tw-mt-1">{error}</p>}
    </div>
  )
);

export default TextArea;
