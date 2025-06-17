import z from 'zod/v4'

export const login_schema = z.object({
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    error: 'Password must be at least 6 characters.',
  }),
  remember: z.boolean().default(false),
})

export const register_schema = z.object({
  name: z.string().min(2, {
    error: 'Name must be at least 2 characters.',
  }),
  email: z.email({
    error: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    error: 'Password must be at least 6 characters.',
  }),
})
