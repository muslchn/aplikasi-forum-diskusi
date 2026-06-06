function postedAt(date) {
  const formatter = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' });
  const diff = new Date(date).getTime() - Date.now();
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (Math.abs(days) >= 1) {
    return formatter.format(days, 'day');
  }

  if (Math.abs(hours) >= 1) {
    return formatter.format(hours, 'hour');
  }

  if (Math.abs(minutes) >= 1) {
    return formatter.format(minutes, 'minute');
  }

  return formatter.format(seconds, 'second');
}

function truncateHtml(html, maxLength = 160) {
  const plainText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return plainText.length > maxLength ? `${plainText.slice(0, maxLength)}...` : plainText;
}

function getVoteState(item, authUserId) {
  if (!authUserId) {
    return 0;
  }

  if (item.upVotesBy.includes(authUserId)) {
    return 1;
  }

  if (item.downVotesBy.includes(authUserId)) {
    return -1;
  }

  return 0;
}

function updateVoteList(item, userId, voteType) {
  const upVotesBy = item.upVotesBy.filter((id) => id !== userId);
  const downVotesBy = item.downVotesBy.filter((id) => id !== userId);

  if (voteType === 1) {
    upVotesBy.push(userId);
  }

  if (voteType === -1) {
    downVotesBy.push(userId);
  }

  return {
    ...item,
    upVotesBy,
    downVotesBy,
  };
}

export {
  postedAt,
  truncateHtml,
  getVoteState,
  updateVoteList,
};
