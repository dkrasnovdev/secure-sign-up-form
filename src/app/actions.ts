"use server";

import { generateHash } from "~/lib/hash";
import { generateSalt } from "~/lib/salt";

const createAccount = async (pwd: string) => {
  const salt = generateSalt(16);
  const password = generateHash({ salt, pwd });
  console.log(password);
};

export { createAccount };
