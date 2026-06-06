import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/forms/AuthForm';
import { register } from '../states/authSlice';

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  async function handleSubmit(payload) {
    const result = await dispatch(register(payload));

    if (register.fulfilled.match(result)) {
      navigate('/');
    }
  }

  return (
    <section className="narrow-page content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Daftar</p>
          <h1>Buat akun untuk mulai berpartisipasi</h1>
        </div>
      </div>
      <AuthForm
        type="register"
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
      <p className="helper-text">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </section>
  );
}
