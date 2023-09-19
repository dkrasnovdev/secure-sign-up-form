'use client';

import { useAtom } from 'jotai';
import Link from 'next/link';
import Form from '~/components/form';
import Lock from '~/components/lock';
import Result from '~/components/result';
import { isSettledAtom } from '~/lib/atoms';

export default function Home() {
  const [isSettled] = useAtom(isSettledAtom);
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
        {isSettled ? <Result /> : <Form />}
        <footer className="absolute bottom-5">
          <Link
            href="https://github.com/dkrasnovdev/secure-sign-up-form"
            target="_blank"
            className="rounded-lg p-1 text-sm font-medium text-neutral-600 outline-none ring-neutral-500 transition-colors hover:text-neutral-300 focus:text-neutral-500 focus:ring"
          >
            GitHub
          </Link>
        </footer>
      </main>
    </>
  );
}
