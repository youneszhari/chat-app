import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { registerUser } from '../lib/api';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(null); // Clear previous errors
    setLoading(true);
    try {
      const response = await registerUser({ name, username, email, password });
      console.log('Registration successful:', response);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleRegister} className="w-full" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </Button>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;