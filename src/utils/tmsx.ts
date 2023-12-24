import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const tmsx = (...classes: ClassValue[]) => twMerge(clsx(...classes));
