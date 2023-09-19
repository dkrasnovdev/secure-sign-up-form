'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Input from '~/components/input';
import Lock from '~/components/lock';
import ProgressBar from '~/components/progress-bar';
import Result from '~/components/result';
import { isSettledAtom, resultAtom } from '~/lib/atoms';
import { signUpValidationSchema } from '~/schemas/sign-up-validation';
import { createAccount } from './actions';

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
  } = useForm<z.infer<typeof signUpValidationSchema>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpValidationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isSettled, setIsSettled] = useAtom(isSettledAtom);
  const [_, setResult] = useAtom(resultAtom)

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = useState(false);

  const onSubmit = handleSubmit(async ({ repeat }) => {
    setIsLoading(true);
    const [res] = await Promise.all([
      await createAccount(repeat),
      await new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
    setResult(res);
    setIsLoading(false);
    setIsSettled(true);
    reset();
  });

  return (
    <>
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-2.5 rounded-lg p-5 lg:p-10">
        <div className="flex flex-col items-center justify-center gap-1 pb-5">
          <Lock className="h-14 w-14 text-neutral-500" />
          <h2 className="text-xl font-semibold">Secure Sign Up Form</h2>
          <p className="text-center text-sm font-medium text-neutral-500">
            Discover how to create a secure sign-up form using React, React Hook
            Form, and Zod.
          </p>
        </div>
        {isSettled ? (
          <Result />
        ) : (
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
        )}
      </main>
    </>
  );
}
