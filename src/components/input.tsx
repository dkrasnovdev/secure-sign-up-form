import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface InputProps<FormValues extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  label: string;
  displayError?: boolean;
}

export default function Input<FormValues extends FieldValues = FieldValues>({
  name,
  label,
  displayError,
  control,
  rules,
  shouldUnregister,
  ...inputProps
}: InputProps<FormValues>) {
  const {
    field,
    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  });

  return (
    <>
      <div
        className={clsx(
          'relative flex w-full items-center space-x-3 overflow-hidden rounded-lg border px-1.5 transition focus-within:ring',
          {
            'border-red-500 bg-red-500/10 ring-red-500': !!error,
            'border-neutral-700 bg-neutral-900 ring-neutral-500': !error,
          },
        )}
      >
        <label htmlFor={label} className="sr-only">
          {label}
        </label>
        <input
          {...inputProps}
          className="h-10 w-full bg-transparent py-3 font-medium placeholder:text-neutral-500 focus:outline-none"
          defaultValue={field.value ?? undefined}
          onBlur={field.onBlur}
          onChange={field.onChange}
          ref={field.ref}
        />
      </div>
      {!!error && displayError && (
        <span className="w-full text-sm text-red-500">{error.message}</span>
      )}
    </>
  );
}
