import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/ui/Alert';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import { fetchLeaderboards } from '../states/leaderboardsSlice';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return (
    <section className="content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Leaderboard</p>
          <h1>Pengguna dengan kontribusi tertinggi</h1>
        </div>
      </div>
      <Alert>{error}</Alert>
      {loading ? (
        <LoadingIndicator label="Memuat leaderboard" />
      ) : (
        <div className="leaderboard-list">
          {items.map((item, index) => (
            <article className="leaderboard-item" key={item.user.id}>
              <span className="rank">#{index + 1}</span>
              <div className="user-line">
                {item.user.avatar && <img src={item.user.avatar} alt="" />}
                <span>{item.user.name}</span>
              </div>
              <strong>{item.score} poin</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
