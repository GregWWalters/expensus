import { AxiosError } from 'axios'

export function isAxiosError(err: any): err is AxiosError {
  return Boolean((err as AxiosError).response)
}
