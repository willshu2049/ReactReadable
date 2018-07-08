export function sortByVote(a, b) {
  const keyA = a['voteScore'];
  const keyB = b['voteScore'];
  return (keyA < keyB) ? 1 : (keyA === keyB) ? 0 : -1
}

export function sortByDate(a, b) {
  const keyA = a['timestamp'];
  const keyB = b['timestamp'];
  return (keyA < keyB) ? 1 : (keyA === keyB) ? 0 : -1
}
