export default function VoteButtons({
  upVotes,
  downVotes,
  voteState,
  disabled,
  onVote,
}) {
  return (
    <div className="vote-actions" aria-label="Aksi vote">
      <button
        className={voteState === 1 ? 'vote-button active-up' : 'vote-button'}
        type="button"
        disabled={disabled}
        onClick={() => onVote(voteState === 1 ? 0 : 1)}
        aria-label="Up vote"
      >
        <span aria-hidden="true">▲</span>
        {upVotes}
      </button>
      <button
        className={voteState === -1 ? 'vote-button active-down' : 'vote-button'}
        type="button"
        disabled={disabled}
        onClick={() => onVote(voteState === -1 ? 0 : -1)}
        aria-label="Down vote"
      >
        <span aria-hidden="true">▼</span>
        {downVotes}
      </button>
    </div>
  );
}
