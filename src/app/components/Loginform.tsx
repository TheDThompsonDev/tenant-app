'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginWithEmailPassword } from '@/lib/appwrite';
import LABELS from '@/app/constants/labels';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError(LABELS.login.errorMessages.missingFields);
      setLoading(false);
      return;
    }

    try {
      const result = await loginWithEmailPassword(email, password);
      console.log(result);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(LABELS.login.errorMessages.invalidCredentials);
      }
    } catch (err) {
      setError(LABELS.login.errorMessages.generalError);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-black text-center mb-6">{LABELS.login.title}</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder={LABELS.login.emailPlaceholder}
          className="w-full p-3 bg-gray-200 text-black rounded-md focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={LABELS.login.passwordPlaceholder}
          className="w-full p-3 bg-gray-200 text-black rounded-md focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-secondary-blue text-white p-3 rounded-md"
          disabled={loading}
        >
          {loading ? LABELS.login.loggingInText : LABELS.login.submitButton}
        </button>
      </form>
    </div>
  )
}