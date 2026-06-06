import { Link } from 'react-router-dom';
import { getVoteState, postedAt, truncateHtml } from '../../utils';
import VoteButtons from './VoteButtons';

export default function ThreadItem({
  thread,
  owner,
  authUserId,
  onVote,
}) {
  const voteState = getVoteState(thread, authUserId);

  return (
    <article className="thread-item">
      <div className="thread-item__main">
        <div className="thread-meta">
          <span className="category-pill">#{thread.category || 'general'}</span>
          <span>{postedAt(thread.createdAt)}</span>
          <span>{thread.totalComments} komentar</span>
        </div>
        <Link className="thread-title" to={`/threads/${thread.id}`}>
          {thread.title}
        </Link>
        <p>{truncateHtml(thread.body)}</p>
        <div className="user-line">
          {owner?.avatar && <img src={owner.avatar} alt="" />}
          <span>Oleh {owner?.name || 'Pengguna Forum'}</span>
        </div>
      </div>
      <VoteButtons
        upVotes={thread.upVotesBy.length}
        downVotes={thread.downVotesBy.length}
        voteState={voteState}
        disabled={!authUserId}
        onVote={(voteType) => onVote(thread.id, voteType)}
      />
    </article>
  );
}
