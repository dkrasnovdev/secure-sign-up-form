import clsx from 'clsx';
import type { FieldError } from 'react-hook-form';
import { containsSpecialChars } from '~/lib/contains-special-chars';

export default function ProgressBar({
  pwd,
  err,
  isDirty,
}: {
  pwd: string;
  err: FieldError | undefined;
  isDirty: boolean;
}) {
  const specialChars = containsSpecialChars(pwd);

  const empty = !pwd;
  const weak = !!pwd && !!err;
  const medium = !!pwd && !err && !specialChars;
  const strong = !!pwd && !err && specialChars;

  const message = empty
    ? 'The password must be at least 8 characters long and contain numbers and special characters (! “ # $ % ‘ () *)'
    : !!err
      ? err.message
      : medium
        ? 'Not a bad password: but you can make a great one - add a couple of special characters (! “ # $ % ‘ () *)'
        : 'Strong password';

  return (
    <div
      role="progressbar"
      className="mb-9 h-1 w-full space-y-1 rounded bg-neutral-700"
    >
      <div
        role="status"
        className={clsx('h-full rounded transition-all duration-300', {
          'w-0': empty,
          'w-1/3 bg-red-500': weak,
          'w-2/3 bg-yellow-500': medium,
          'w-full bg-green-500': strong,
        })}
      ></div>
      <p
        className={clsx('w-full text-xs font-medium', {
          'text-neutral-500': empty && !err,
          'text-red-500': (weak || !!err) && isDirty,
          'text-yellow-500': medium,
          'text-green-500': strong,
        })}
      >
        {message}
      </p>
    </div >
  );
}
