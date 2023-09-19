'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createAccount } from '~/app/actions';
import Input from '~/components/input';
import ProgressBar from '~/components/progress-bar';
import { isSettledAtom, resultAtom } from '~/lib/atoms';
import { signUpValidationSchema } from '~/schemas/sign-up-validation';

export default function Form() {
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

  const [_, setIsSettled] = useAtom(isSettledAtom);
  const [__, setResult] = useAtom(resultAtom);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatVisible, setIsRepeatVisible] = useState(false);

  const onSubmit = handleSubmit(async ({ username, password }) => {
    setIsLoading(true);
    const [res] = await Promise.all([
      await createAccount({ username, password }),
      await new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
    setResult(res);
    setIsLoading(false);
    setIsSettled(true);
    reset();
  });
  return (
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
        autoComplete="off"
      />
      <Input
        name="password"
        label="Password"
        control={control}
        placeholder="Password"
        type="password"
        isVisible={isPasswordVisible}
        onEyeClick={() => setIsPasswordVisible((current) => !current)}
      />
      <ProgressBar
        pwd={watch('password')}
        err={errors.password}
        isDirty={isDirty}
      />
      <Input
        name="confirm_password"
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
  );
}
