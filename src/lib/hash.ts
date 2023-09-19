import { createHash } from 'crypto';

const generateHash = ({
  salt,
  password,
}: {
  salt: string;
  password: string;
}) => {
  const saltHash = createHash('sha256').update(salt, 'utf8').digest('hex');
  return createHash('sha256').update(password).update(saltHash).digest('hex');
};

export { generateHash };
