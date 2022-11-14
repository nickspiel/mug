const REACTIONS = new Map([
  ["+1", 1],
  ["-1", -2], 
  ["smile", 1],
  ["tada", 2],
  ["thinking_face", -1],
  ["heart", 2],
  ["rocket", 2],
  ["eyes", 0],
  ["fishing_pole_and_fish", 0],
  ["monocle_face", 0],
]);

function getScore(reactionNode) {
  const alias = reactionNode.querySelector('g-emoji[alias]').getAttribute('alias');
  const count = reactionNode.querySelector('.js-discussion-reaction-group-count').textContent || 0;
  const score = REACTIONS.get(alias) * parseInt(count);
  
  return score;
};

async function mugMe() {
  const comments = document.querySelectorAll('.timeline-comment-group') || [];
  const sortedComments = Array.from(comments).map((comment) => {
    const commentId = comment.getAttribute('id');
    const reactions = comment.querySelectorAll(".social-reaction-summary-item") || [];
    const score = Array.from(reactions).reduce((total, reaction) => total + getScore(reaction), 0);

    return { commentId, score }
  }).sort((a, b) => b.score - a.score);

  const bestComment = sortedComments.find(Boolean);
  
  window.location.hash = bestComment.commentId;
}

mugMe();
