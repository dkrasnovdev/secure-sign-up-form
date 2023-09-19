import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { EyeOff, EyeOn } from './eyes';

interface InputProps<FormValues extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  label: string;
  displayError?: boolean;
  isVisible?: boolean;
  onEyeClick?: () => void;
}

export default function Input<FormValues extends FieldValues = FieldValues>({
  name,
  label,
  displayError,
  isVisible,
  onEyeClick,
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
            'border-neutral-700 bg-neutral-800 ring-neutral-500': !error,
          },
        )}
      >
        <label htmlFor={name}>
          <span className="sr-only">{name}</span>
        </label>
        <input
          {...inputProps}
          id={name}
          className="h-10 w-full bg-transparent py-3 font-medium placeholder:text-neutral-500 focus:outline-none"
          defaultValue={field.value ?? undefined}
          onBlur={field.onBlur}
          onChange={field.onChange}
          ref={field.ref}
          type={
            inputProps.type === 'password'
              ? isVisible
                ? 'text'
                : 'password'
              : inputProps.type
          }
        />
        {inputProps.type === 'password' && (
          <button
            type="button"
            className="absolute right-5 h-fit w-fit cursor-pointer rounded-lg outline-none ring-neutral-500 focus:ring"
            onClick={onEyeClick}
          >
            {isVisible ? (
              <EyeOff className="h-6 w-6 cursor-pointer text-neutral-500 transition-opacity duration-300 hover:opacity-50" />
            ) : (
              <EyeOn className="h-6 w-6 cursor-pointer text-neutral-500 transition-opacity duration-300 hover:opacity-50" />
            )}
          </button>
        )}
      </div>
      {!!error && displayError && (
        <span className="w-full text-xs font-medium text-red-500">
          {error.message}
        </span>
      )}
    </>
  );
}
