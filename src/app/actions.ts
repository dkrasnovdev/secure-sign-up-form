'use server';

import { generateHash } from '~/lib/hash';
import { generateSalt } from '~/lib/salt';

const createAccount = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const salt = generateSalt(32);
  const hash = generateHash({ salt, password });

  // Censor the 'salt' and 'hash' for displaying
  // Should not be used in practice, instead write it to your database
  const censoredSalt = salt.slice(0, -(salt.length / 2)) + '*'.repeat(salt.length / 2);
  const censoredHash = hash.slice(0, -(hash.length / 2)) + '*'.repeat(hash.length / 2);

  return {
    username,
    salt: censoredSalt,
    hash: censoredHash
  };
};

export { createAccount };
