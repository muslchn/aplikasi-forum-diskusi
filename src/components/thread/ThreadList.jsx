import ThreadItem from './ThreadItem';

export default function ThreadList({
  threads,
  users,
  authUserId,
  onVote,
}) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada thread untuk kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          owner={users.find((user) => user.id === thread.ownerId)}
          authUserId={authUserId}
          onVote={onVote}
        />
      ))}
    </div>
  );
}
