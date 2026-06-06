import { useState } from 'react';

export default function ThreadForm({ loading, onSubmit }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      title,
      category,
      body,
    });
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <label htmlFor="title">
        Judul
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>
      <label htmlFor="category">
        Kategori
        <input
          id="category"
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          placeholder="Contoh: react"
        />
      </label>
      <label htmlFor="body">
        Isi Thread
        <textarea
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows="10"
          required
        />
      </label>
      <button className="primary-button" type="submit" disabled={loading}>
        {loading ? 'Menyimpan...' : 'Publikasikan Thread'}
      </button>
    </form>
  );
}
