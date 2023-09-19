'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '~/components/input';
import Lock from '~/components/lock';
import ProgressBar from '~/components/progress-bar';
import { signUpValidationSchema } from '~/schemas/sign-up-validation';
import { createAccount } from './actions';

type SignUpValidation = z.infer<typeof signUpValidationSchema>;

const defaultValues: SignUpValidation = {
  username: '',
  pwd: '',
  repeat: '',
};

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<SignUpValidation>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpValidationSchema),
    defaultValues,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = useState(false);

  const onSubmit = handleSubmit(async ({ repeat }) => {
    setIsLoading(true);
    const [{ salt, password }] = await Promise.all([
      await createAccount(repeat),
      await new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
    setIsLoading(false);
  });

  return (
    <>
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center rounded-lg p-5 lg:p-10">
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
              isVisible={isPasswordVisible}
              onEyeClick={() => setIsPasswordVisible((current) => !current)}
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
            isVisible={isRepeatVisible}
            onEyeClick={() => setIsRepeatVisible((current) => !current)}
          />
          <button
            type="submit"
            className="relative flex h-10 w-full items-center justify-center rounded-lg border-2 border-neutral-200 bg-neutral-200 px-5 text-sm font-medium text-neutral-900 outline-none ring-neutral-500 hover:border-neutral-300 hover:bg-neutral-300 focus:border-neutral-400 focus:bg-neutral-400 disabled:pointer-events-none disabled:opacity-50 sm:w-fit"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </form>
      </main>
    </>
  );
}
