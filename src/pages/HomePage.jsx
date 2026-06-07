import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/ui/Alert';
import CategoryFilter from '../components/thread/CategoryFilter';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import ThreadList from '../components/thread/ThreadList';
import { fetchUsers } from '../states/usersSlice';
import {
  applyThreadVote,
  fetchThreads,
  setCategory,
  voteThread,
} from '../states/threadsSlice';
import { getVoteState } from '../utils';

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    items: threads,
    category,
    loading,
    error,
  } = useSelector((state) => state.threads);
  const { items: users, loading: usersLoading } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);

  const categories = useMemo(() => (
    [...new Set(threads.map((thread) => thread.category).filter(Boolean))]
  ), [threads]);

  const filteredThreads = category === 'all'
    ? threads
    : threads.filter((thread) => thread.category === category);

  async function handleVote(threadId, voteType) {
    if (!user) {
      return;
    }

    const thread = threads.find((item) => item.id === threadId);
    const previousVoteType = thread ? getVoteState(thread, user.id) : 0;

    dispatch(applyThreadVote({ threadId, userId: user.id, voteType }));
    const result = await dispatch(voteThread({ threadId, voteType }));

    if (voteThread.rejected.match(result)) {
      dispatch(applyThreadVote({ threadId, userId: user.id, voteType: previousVoteType }));
    }
  }

  return (
    <section className="content-stack">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Diskusi terbaru</p>
          <h1>Temukan dan ikuti percakapan komunitas</h1>
        </div>
      </div>
      <CategoryFilter
        categories={categories}
        selected={category}
        onSelect={(nextCategory) => dispatch(setCategory(nextCategory))}
      />
      <Alert>{error}</Alert>
      {(loading || usersLoading) ? (
        <LoadingIndicator label="Memuat daftar thread" />
      ) : (
        <ThreadList
          threads={filteredThreads}
          users={users}
          authUserId={user?.id}
          onVote={handleVote}
        />
      )}
    </section>
  );
}
