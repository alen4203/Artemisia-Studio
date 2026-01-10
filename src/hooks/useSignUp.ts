import { useState } from 'react';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function useSignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      setSuccess(true);
      console.log('user signed up', userCredential);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      console.log('error signing up', error.message);
    }
  };

  return { signUp, error, loading, success };
}
