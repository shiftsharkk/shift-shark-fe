import { isAxiosError } from 'axios';

export const parseError = (error: unknown, defaultMessage?: string): string => {
  let message = defaultMessage ?? 'Something went wrong, please try again';

  if (error instanceof Error) {
    message = error.message;
    if (isAxiosError(error)) {
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
    }
  }

  return message;
};
