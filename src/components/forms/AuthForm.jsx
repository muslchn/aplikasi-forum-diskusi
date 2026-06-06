import { useState } from 'react';
import Alert from '../ui/Alert';

export default function AuthForm({
  type,
  loading,
  error,
  onSubmit,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isRegister = type === 'register';

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name,
      email,
      password,
    });
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <Alert>{error}</Alert>
      {isRegister && (
        <label htmlFor="name">
          Nama
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
      )}
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          value={password}
          minLength="6"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'Memproses...' : isRegister ? 'Daftar' : 'Masuk'}
      </button>
    </form>
  );
}
