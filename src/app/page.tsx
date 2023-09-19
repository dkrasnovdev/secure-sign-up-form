"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { passwordValidationSchema } from "~/schemas/password-validation";
import Input from "~/components/input";
import { createAccount } from "./actions";

type PasswordValidation = z.infer<typeof passwordValidationSchema>;

export default function Home() {
  const { register, control, handleSubmit } = useForm<PasswordValidation>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(passwordValidationSchema),
    defaultValues: {
      pwd: "",
      repeat: "",
    },
  });

  const onSubmit = handleSubmit(async ({ repeat }) => {
    await createAccount(repeat);
  });

  return (
    <main>
      <form onSubmit={onSubmit}>
        <Input name="pwd" label="Password" control={control} />
        <Input name="repeat" label="Repeat password" control={control} />
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
