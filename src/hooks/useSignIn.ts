import { useState } from 'react';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function useSignIn() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      setSuccess(true);
      console.log('user signed in', userCredential);
    } catch (error: any) {
      setError(error.message);
      console.log('error signing in', error.message);
    }
  };

  return { signIn, error, loading, success };
}
