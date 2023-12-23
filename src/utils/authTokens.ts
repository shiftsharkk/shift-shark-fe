import { LOCAL_STORAGE_KEYS } from "../constants/local-storage-keys"

import { TAuthUser } from "../types/user"

export type TDecodedToken = {
  iat: number
  exp: number
} & TAuthUser

export const getAccessToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
  return token
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
}

export const getRefreshToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  return token
}

export const setRefreshToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, token)
}