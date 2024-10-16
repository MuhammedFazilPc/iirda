import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { SignInResponse } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'phone') setMobile(value);
    if (id === 'password') setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true

    const result = (await signIn('credentials', {
      redirect: false,
      mobile: mobile,
      password,
      callbackUrl: '/partner/dashboard', // Dynamic redirect URL
    })) as SignInResponse | null;

    setLoading(false); // Reset loading state

    if (result?.error) {
      setError(result.error);
    } else {
      // Clear input fields on successful login
      setMobile('');
      setPassword('');
      setError(null);
      router.push(result?.url || '/partner/dashboard'); // Redirect to callbackUrl or default dashboard
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col relative">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="phone" className="block text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={mobile}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2 focus:ring focus:outline-none"
            required // Make the field required for better accessibility
          />

          <label htmlFor="password" className="block text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2 focus:ring focus:outline-none"
            required // Make the field required for better accessibility
          />

          <div className="mt-6">
            <Button 
              type="submit" 
              className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 rounded`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Not a partner yet?{' '}
          <Button className="bg-transparent border border-blue-500 hover:bg-blue-100 px-2 py-1">
            <a href="/partner/register" className="text-blue-500 hover:underline">
              Register for partner
            </a>
          </Button>
        </p>

        <Button onClick={onClose} className="absolute top-2 right-2">
          X
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;
