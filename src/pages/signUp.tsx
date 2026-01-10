import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import useSignUp from '../hooks/useSignUp';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, error, loading, success } = useSignUp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, password);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.push('/signIn');
      }, 2000);
    }
  }, [success, router]);

  return (
    <div className="h-[100vh]">
      <div className="relative border-red-400 border-4 rounded-xl w-[480px] py-4 px-4 mx-auto top-[50%] -translate-y-1/2">
        <h1 className="text-center mb-6 font-bold text-2xl">Sign Up</h1>
        {/* Sign up form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mx-16 mb-4">
            <label htmlFor="email" className="text-lg mr-4 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center mx-16 mb-4">
            <label htmlFor="password" className="text-lg mr-4 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="block bg-red-500 rounded-md text-white px-6 py-2 mx-auto mb-4 text-lg hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading && <p className="text-red-300 text-center">Loading...</p>}
        {success && (
          <p className="text-green-500 text-center">
            Success! You can now login with this account.
          </p>
        )}
      </div>
    </div>
  );
}
