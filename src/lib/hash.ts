import { createHash } from "crypto";

const generateHash = ({ salt, pwd }: { salt: string; pwd: string }) => {
  const saltHash = createHash("sha256").update(salt, "utf8").digest("hex");
  return createHash("sha256").update(pwd).update(saltHash).digest("hex");
};

export { generateHash };
