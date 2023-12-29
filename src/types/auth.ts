
import { TRole } from '../types/user';

export type TDecodedToken = {
  userId: string,
  role: TRole,
  type: "access" | "refresh",
  iat: number,
  exp: number
};
