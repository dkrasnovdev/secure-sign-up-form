'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '~/components/input';
import Lock from '~/components/lock';
import ProgressBar from '~/components/progress-bar';
import { signUpValidationSchema } from '~/schemas/sign-up-validation';
import { createAccount } from './actions';

type SignUpValidation = z.infer<typeof signUpValidationSchema>;

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<SignUpValidation>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      username: '',
      pwd: '',
      repeat: '',
    },
  });

  const onSubmit = handleSubmit(async ({ repeat }) => {
    await createAccount(repeat);
  });

  return (
    <>
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-lg border-2 border-neutral-800 bg-neutral-900 p-5 lg:p-10">
        <div className="flex flex-col items-center justify-center gap-1 pb-5">
          <Lock className="h-14 w-14 text-neutral-500" />
          <h2 className="text-xl font-medium">Secure Password</h2>
          <p className="text-center text-sm font-medium text-neutral-500">
            Discover how to create a secure sign-up form using React, React Hook
            Form, and Zod.
          </p>
          <a></a>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex w-full flex-col items-center justify-center gap-2.5"
        >
          <Input
            name="username"
            label="Username"
            control={control}
            placeholder="Username"
            displayError
          />
          <div className="w-full min-w-full space-y-2.5 pb-2.5">
            <Input
              name="pwd"
              label="Password"
              control={control}
              placeholder="Password"
              type="password"
            />
            <div className="h-10">
              <ProgressBar
                pwd={watch('pwd')}
                err={errors.pwd}
                isDirty={isDirty}
              />
            </div>
          </div>
          <Input
            name="repeat"
            label="Repeat password"
            control={control}
            placeholder="Repeat Password"
            type="password"
            displayError
          />
          <button
            type="submit"
            className="text-neutral-200 relative flex h-10 w-fit items-center justify-center rounded-lg border-2 border-neutral-800 bg-neutral-900 px-5 outline-none ring-neutral-500 hover:bg-neutral-800 focus:ring"
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
}
