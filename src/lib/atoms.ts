import { atom } from 'jotai';
import { createAccount } from '~/app/actions';

const isSettledAtom = atom<boolean>(false);
const resultAtom = atom<Awaited<ReturnType<typeof createAccount>> | null>(null);

export { isSettledAtom, resultAtom };
