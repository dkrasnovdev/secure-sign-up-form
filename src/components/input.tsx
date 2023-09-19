import clsx from "clsx";
import { InputHTMLAttributes } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface InputProps<FormValues extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue">,
    UseControllerProps<FormValues> {
  label: string;
}

export default function Input<FormValues extends FieldValues = FieldValues>({
  name,
  label,
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
    <div className="">
      <label className="" htmlFor={label}>
        {label}
      </label>
      <div className="">
        <input
          {...inputProps}
          className={clsx("", {
            "": !!error,
          })}
          defaultValue={field.value ?? undefined}
          onBlur={field.onBlur}
          onChange={field.onChange}
          ref={field.ref}
        />
        {!!error && <span className="">{error.message}</span>}
      </div>
    </div>
  );
}
