import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Alert from '../components/ui/Alert';
import CommentForm from '../components/forms/CommentForm';
import CommentList from '../components/thread/CommentList';
import LoadingIndicator from '../components/ui/LoadingIndicator';
import ThreadDetail from '../components/thread/ThreadDetail';
import {
  addComment,
  applyCommentVote,
  applyDetailThreadVote,
  clearThreadDetail,
  fetchThreadDetail,
  voteComment,
} from '../states/threadDetailSlice';
import { applyThreadVote, voteThread } from '../states/threadsSlice';
import { getVoteState } from '../utils';

export default function ThreadDetailPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { item: thread, loading, error } = useSelector((state) => state.threadDetail);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchThreadDetail(threadId));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, threadId]);

  async function handleThreadVote(voteType) {
    if (!user || !thread) {
      return;
    }

    const previousVoteType = getVoteState(thread, user.id);

    dispatch(applyDetailThreadVote({ userId: user.id, voteType }));
    dispatch(applyThreadVote({ threadId, userId: user.id, voteType }));
    const result = await dispatch(voteThread({ threadId, voteType }));

    if (voteThread.rejected.match(result)) {
      dispatch(applyDetailThreadVote({ userId: user.id, voteType: previousVoteType }));
      dispatch(applyThreadVote({ threadId, userId: user.id, voteType: previousVoteType }));
    }
  }

  async function handleCommentVote(commentId, voteType) {
    if (!user || !thread) {
      return;
    }

    const comment = thread.comments.find((item) => item.id === commentId);
    const previousVoteType = comment ? getVoteState(comment, user.id) : 0;

    dispatch(applyCommentVote({
      commentId,
      userId: user.id,
      voteType,
    }));
    const result = await dispatch(voteComment({ threadId, commentId, voteType }));

    if (voteComment.rejected.match(result)) {
      dispatch(applyCommentVote({
        commentId,
        userId: user.id,
        voteType: previousVoteType,
      }));
    }
  }

  async function handleAddComment(content) {
    const result = await dispatch(addComment({ threadId, content }));
    return addComment.fulfilled.match(result);
  }

  if (loading && !thread) {
    return <LoadingIndicator label="Memuat detail thread" />;
  }

  return (
    <section className="content-stack">
      <Alert>{error}</Alert>
      {thread && (
        <>
          <ThreadDetail
            thread={thread}
            authUserId={user?.id}
            onVote={handleThreadVote}
          />
          <section className="content-stack">
            <h2>Komentar ({thread.comments.length})</h2>
            <CommentForm
              isAuthenticated={Boolean(user)}
              loading={loading}
              onSubmit={handleAddComment}
            />
            <CommentList
              comments={thread.comments}
              authUserId={user?.id}
              onVote={handleCommentVote}
            />
          </section>
        </>
      )}
    </section>
  );
}
