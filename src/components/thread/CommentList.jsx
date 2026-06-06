import { getVoteState, postedAt } from '../../utils';
import VoteButtons from './VoteButtons';

export default function CommentList({
  comments,
  authUserId,
  onVote,
}) {
  if (comments.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada komentar. Jadilah yang pertama menanggapi.</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const voteState = getVoteState(comment, authUserId);

        return (
          <article className="comment-item" key={comment.id}>
            <div className="comment-item__header">
              <div className="user-line">
                {comment.owner.avatar && <img src={comment.owner.avatar} alt="" />}
                <span>{comment.owner.name}</span>
              </div>
              <span>{postedAt(comment.createdAt)}</span>
            </div>
            <div
              className="html-content"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />
            <VoteButtons
              upVotes={comment.upVotesBy.length}
              downVotes={comment.downVotesBy.length}
              voteState={voteState}
              disabled={!authUserId}
              onVote={(voteType) => onVote(comment.id, voteType)}
            />
          </article>
        );
      })}
    </div>
  );
}
