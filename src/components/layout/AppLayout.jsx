import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../states/authSlice';

export default function AppLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function onLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">Forum Diskusi</Link>
        <nav className="site-nav" aria-label="Navigasi utama">
          <NavLink to="/">Threads</NavLink>
          <NavLink to="/leaderboards">Leaderboard</NavLink>
          {user ? (
            <>
              <NavLink to="/threads/new">Buat Thread</NavLink>
              <button className="text-button" type="button" onClick={onLogout}>
                Keluar
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Masuk</NavLink>
              <NavLink to="/register">Daftar</NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
    </div>
  );
}
