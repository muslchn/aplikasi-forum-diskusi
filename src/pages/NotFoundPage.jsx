import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="empty-state">
      <h1>Halaman tidak ditemukan</h1>
      <p>Alamat yang kamu buka tidak tersedia.</p>
      <Link className="primary-button" to="/">Kembali ke Beranda</Link>
    </section>
  );
}
