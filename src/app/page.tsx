'use client';

import { useAtom } from 'jotai';
import Form from '~/components/form';
import GitHub from '~/components/github';
import Result from '~/components/result';
import { isSettledAtom } from '~/lib/atoms';

export default function Home() {
  const [isSettled] = useAtom(isSettledAtom);
  return (
    <>
      <main className="mx-auto flex w-full max-w-lg flex-col items-center justify-center gap-2.5 rounded-lg p-5 lg:p-10">
        <div className="flex flex-col items-center justify-center gap-2.5">
          <GitHub />
          <h2 className="text-xl font-semibold">Secure Sign Up Form</h2>
          <p className="text-center text-sm font-medium text-neutral-500">
            Discover how to create a secure sign-up form using React, React Hook
            Form, and Zod.
          </p>
        </div>
        {isSettled ? <Result /> : <Form />}
        <footer className="absolute bottom-5"></footer>
      </main>
    </>
  );
}
