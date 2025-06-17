'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod/v4'
import BlurImage from '@/components/miscellaneous/blur-image'
import { customResolver } from '@/lib/resolver'
import { register_schema } from '@/schemas/auth'
import { useState, useTransition } from 'react'
import { create } from '@/actions/auth'
import { toast } from 'sonner'
import { EyeOff, Eye, Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from '@bprogress/next/app'

export default function SignupPage() {
  const [isPening, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof register_schema>>({
    resolver: customResolver(register_schema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  function onSubmit(values: z.infer<typeof register_schema>) {
    startTransition(async () => {
      await create(values).then(async (res) => {
        if (res.error) {
          toast.error('An account with this email already exists.', {
            description: res.error,
            position: 'top-right',
          })
        } else {
          await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
          })
          toast.success('Account created successfully!', {
            description: 'You can now log in with your new account.',
            position: 'top-right',
          })

          form.reset()
          router.push('/')
        }
      })
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-center">
            <BlurImage src="/logo.png" alt="Logo" width={125} height={48} />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get started with your free account today.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        {...field}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              {isPening ? 'Creating account...' : 'Create Account'}
              {isPening && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}
