'use server';

import { generateHash } from '~/lib/hash';
import { generateSalt } from '~/lib/salt';

const createAccount = async (pwd: string) => {
  const salt = generateSalt(16);
  const hash = generateHash({ salt, pwd });
  return {
    salt: salt.slice(0, -(salt.length / 2)) + '*'.repeat(salt.length / 2),
    hash: hash.slice(0, -(hash.length / 2)) + '*'.repeat(hash.length / 2),
  };
};

export { createAccount };
