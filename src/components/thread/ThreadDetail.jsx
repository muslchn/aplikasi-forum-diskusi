import { getVoteState, postedAt } from '../../utils';
import VoteButtons from './VoteButtons';

export default function ThreadDetail({
  thread,
  authUserId,
  onVote,
}) {
  const voteState = getVoteState(thread, authUserId);

  return (
    <article className="detail-thread">
      <div className="thread-meta">
        <span className="category-pill">#{thread.category || 'general'}</span>
        <span>{postedAt(thread.createdAt)}</span>
      </div>
      <h1>{thread.title}</h1>
      <div className="user-line">
        {thread.owner.avatar && <img src={thread.owner.avatar} alt="" />}
        <span>Oleh {thread.owner.name}</span>
      </div>
      <div
        className="html-content"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      />
      <VoteButtons
        upVotes={thread.upVotesBy.length}
        downVotes={thread.downVotesBy.length}
        voteState={voteState}
        disabled={!authUserId}
        onVote={onVote}
      />
    </article>
  );
}
