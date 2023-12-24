import React, { forwardRef } from 'react';
import { tmsx } from '../../../utils/tmsx';

import loaderWhite from '../../../assets/icons/loader-white.svg';

import styles from './styles.module.css';

type Props = {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  loading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      variant = 'primary',
      className,
      size = 'md',
      block = false,
      children,
      type = 'button',
      loading = false,
      disabled,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type={type}
        className={tmsx(
          'tw-rounded-lg tw-inline-flex tw-items-center',
          {
            ['tw-p-4 tw-text-base tw-font-bold']: size === 'lg',
            ['tw-w-full']: block,
            ['tw-bg-black | tw-text-white']: variant === 'primary',
            ['tw-bg-transparent | tw-text-black | tw-border tw-border-black']:
              variant === 'secondary',
            ['tw-opacity-50 tw-pointer-events-none tw-cursor-not-allowed']:
              disabled,
          },
          className
        )}
        ref={ref}
        disabled={disabled}
        {...rest}
      >
        <img
          src={loaderWhite}
          alt="loading"
          className={tmsx(styles.loader, { [styles.active]: loading })}
        />
        <span className="tw-flex-1">{children}</span>
      </button>
    );
  }
);

export default Button;
