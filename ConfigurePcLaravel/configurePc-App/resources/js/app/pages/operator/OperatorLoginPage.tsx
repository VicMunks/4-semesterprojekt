import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Factory } from 'lucide-react';
import { useProduction } from '../../context/ProductionContext';

export function OperatorLoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const { login }               = useProduction();
  const navigate                = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate('/operator/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl p-8 bg-zinc-900 border border-zinc-800">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-zinc-800 p-4 rounded-full mb-4">
            <Factory size={48} className="text-blue-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Cyber-Physical Production System</h1>
          <p className="text-zinc-400 mt-2 text-sm">Operator Control Interface</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-zinc-300 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="operator@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {error && (
            <div className="rounded-lg p-3 bg-red-500/10 border border-red-500/30">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
