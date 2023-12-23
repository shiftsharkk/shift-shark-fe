export type TApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};
