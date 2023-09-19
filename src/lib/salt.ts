import { randomBytes } from "crypto";

const generateSalt = (length: number) => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export { generateSalt };
