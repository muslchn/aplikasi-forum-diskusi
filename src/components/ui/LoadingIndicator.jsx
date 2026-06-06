import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoadingIndicator({ label = 'Memuat data' }) {
  return (
    <div className="loading" role="status" aria-live="polite">
      <span className="spinner" />
      <span>{label}</span>
      <Skeleton className="loading__skeleton" count={2} />
    </div>
  );
}
