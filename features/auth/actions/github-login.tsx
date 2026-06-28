import { signIn } from 'next-auth/react';
import { homePath } from '@/paths';

const githubLogin = async (provider: string) => {
  await signIn(provider, { 
    callbackUrl: homePath() 
  });
};

export { githubLogin };
