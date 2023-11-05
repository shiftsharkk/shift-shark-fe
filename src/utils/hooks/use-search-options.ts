import { useMemo } from 'react';

type Args<T = string> = {
  options: T[];
  matchFunction?: (option: T, searchValue: string) => boolean;
  searchValue: string;
};

const useSearchOptions = <T = string>({
  options,
  matchFunction,
  searchValue,
}: Args<T>): T[] => {
  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const _matchFunction =
      matchFunction ??
      ((option: T, searchValue: string) => option === searchValue);
    return options.filter((option) => _matchFunction(option, searchValue));
  }, [options, matchFunction, searchValue]);

  return filteredOptions;
};

export default useSearchOptions;
