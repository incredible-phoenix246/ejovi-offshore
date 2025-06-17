import { compare, hash } from 'bcryptjs'
import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inDevEnvironment =
  !!process && process.env.NODE_ENV === 'development'

export async function hash_password(password: string): Promise<string> {
  return hash(password, 12)
}

export async function compare_password(
  password: string,
  hashed_password: string
): Promise<boolean> {
  return compare(password, hashed_password)
}
