import { signIn} from 'next-auth/react';
import { homePath } from '@/paths';

const loginWithSocials = async (formData: FormData) => {
  const provider = formData.get("action") as string;
  await signIn(provider, {
    callbackUrl: homePath()
  });
};


export { loginWithSocials };

