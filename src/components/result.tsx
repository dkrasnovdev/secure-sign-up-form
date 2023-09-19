import { useAtom } from 'jotai';
import Link from 'next/link';
import { isSettledAtom, resultAtom } from '~/lib/atoms';

export default function Result() {
  const [_, setIsSettled] = useAtom(isSettledAtom);
  const [result] = useAtom(resultAtom);

  if (!result) return null;
  return (
    <div className="max-w-full space-y-2.5">
      <div className="flex w-full flex-col gap-2.5 rounded-lg border-2 border-neutral-800 p-5">
        <p className="border-b border-neutral-800 pb-2.5 italic">
          You can safely store salt alongside hash in your database.
        </p>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
      <div className="mt-2.5 flex w-full flex-col gap-2.5 sm:flex-row">
        <Link
          href="/"
          className="pointer-events-none relative flex h-10 w-full items-center justify-center rounded-lg border-2 border-green-600 bg-green-600 px-5 text-center text-sm font-medium text-neutral-100 opacity-50 outline-none ring-neutral-500 hover:border-neutral-300 hover:bg-neutral-300 focus:border-neutral-400 focus:bg-neutral-400 disabled:pointer-events-none disabled:opacity-50 sm:w-1/2"
        >
          Open Tutorial (Soon)
        </Link>
        <button
          className="relative flex h-10 w-full items-center justify-center rounded-lg border-2 border-neutral-200 bg-neutral-200 px-5 text-center text-sm font-medium text-neutral-900 outline-none ring-neutral-500 hover:border-neutral-300 hover:bg-neutral-300 focus:border-neutral-400 focus:bg-neutral-400 disabled:pointer-events-none disabled:opacity-50 sm:w-1/2"
          onClick={() => setIsSettled(false)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
