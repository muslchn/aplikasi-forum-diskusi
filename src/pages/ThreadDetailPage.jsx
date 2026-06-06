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

  function handleThreadVote(voteType) {
    if (!user) {
      return;
    }

    dispatch(applyDetailThreadVote({ userId: user.id, voteType }));
    dispatch(applyThreadVote({ threadId, userId: user.id, voteType }));
    dispatch(voteThread({ threadId, voteType }));
  }

  function handleCommentVote(commentId, voteType) {
    if (!user) {
      return;
    }

    dispatch(applyCommentVote({
      commentId,
      userId: user.id,
      voteType,
    }));
    dispatch(voteComment({ threadId, commentId, voteType }));
  }

  function handleAddComment(content) {
    dispatch(addComment({ threadId, content }));
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
