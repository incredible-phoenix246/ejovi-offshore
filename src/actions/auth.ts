'use server'

import { compare_password } from '@/lib/utils'
import { login_schema, register_schema } from '@/schemas/auth'
import { create_new_user, get_user_by_email } from '@/services/user'
import z from 'zod/v4'

export async function create(data: z.infer<typeof register_schema>) {
  return await get_user_by_email(data.email).then(async (res) => {
    if (res) {
      return {
        error: 'User with this email already exists.',
        status: 409,
      }
    } else {
      const user = await create_new_user(data)
      return {
        data: user,
        status: 201,
      }
    }
  })
}

export async function login(data: z.infer<typeof login_schema>) {
  const user = await get_user_by_email(data.email)
  if (!user) {
    return {
      error: 'User with this email does not exist.',
      status: 404,
    }
  }
  const is_password_matched = await compare_password(
    data.password,
    user.password
  )

  if (!is_password_matched) {
    return {
      error: 'Incorrect password.',
      status: 401,
    }
  }
  return {
    data: user,
    status: 200,
  }
}
