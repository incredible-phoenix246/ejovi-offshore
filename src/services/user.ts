import prisma from '@/lib/primsa'
import { hash_password } from '@/lib/utils'
import { register_schema } from '@/schemas/auth'
import z from 'zod/v4'

const db = prisma

export async function create_new_user(data: z.infer<typeof register_schema>) {
  const hashedPassword = await hash_password(data.password)
  return db.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name,
    },
  })
}

export async function get_user_by_email(email: string) {
  return db.user.findUnique({
    where: {
      email: email,
    },
  })
}
