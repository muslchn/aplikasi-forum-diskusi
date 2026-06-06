import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/ui/Alert';
import ThreadForm from '../components/forms/ThreadForm';
import { addThread } from '../states/threadsSlice';

export default function NewThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.threads);

  async function handleSubmit(payload) {
    const result = await dispatch(addThread(payload));

    if (addThread.fulfilled.match(result)) {
      navigate('/');
    }
  }

  return (
    <section className="narrow-page content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Thread baru</p>
          <h1>Mulai diskusi yang jelas dan bermanfaat</h1>
        </div>
      </div>
      <Alert>{error}</Alert>
      <ThreadForm loading={loading} onSubmit={handleSubmit} />
    </section>
  );
}
