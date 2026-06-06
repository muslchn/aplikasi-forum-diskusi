import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/forms/AuthForm';
import { login } from '../states/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(payload) {
    const result = await dispatch(login(payload));

    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  }

  return (
    <section className="narrow-page content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Masuk</p>
          <h1>Lanjutkan diskusi dengan akunmu</h1>
        </div>
      </div>
      <AuthForm
        type="login"
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
      <p className="helper-text">
        Belum punya akun? <Link to="/register">Daftar sekarang</Link>
      </p>
    </section>
  );
}
