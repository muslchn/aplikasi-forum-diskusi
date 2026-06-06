import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CommentForm({ isAuthenticated, loading, onSubmit }) {
  const [content, setContent] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const isSubmitted = await onSubmit(content.trim());

    if (isSubmitted) {
      setContent('');
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="empty-state">
        <p>Masuk untuk menambahkan komentar pada diskusi ini.</p>
        <Link className="primary-button" to="/login">Masuk</Link>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <label htmlFor="comment">
        Tulis komentar
        <textarea
          id="comment"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows="5"
          required
        />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim Komentar'}
      </button>
    </form>
  );
}
