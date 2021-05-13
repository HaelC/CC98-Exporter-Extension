const BASE_URL = "https://api.cc98.org";
const TOPIC_URL = `${BASE_URL}/topic`;
const hotPostsURL = (topicId) => `${BASE_URL}/Topic/${topicId}/hot-post`;
const allPostsURL = (topicId, start) =>
  `${BASE_URL}/Topic/${topicId}/post?from=${start}&size=10`;

export async function getTopic(topic) {
  const topicId = topic.id;
  const response = await fetch(`${TOPIC_URL}/${topicId}`);
  if (response.status === 200) {
    const result = await response.json();
    const { hitCount, replyCount, title, time } = result;
    // console.log(hitCount, replyCount, title, time);
    topic.hitCount = hitCount;
    topic.replyCount = replyCount;
    topic.title = title;
    topic.time = time;
  }
}

export async function getHotPosts(topic) {
  const topicId = topic.id;
  const response = await fetch(hotPostsURL(topicId));
  if (response.status === 200) {
    const result = await response.json();
    // console.log(result);
    topic.hotPosts = result;
  }
}

export async function getAllPosts(topic) {
  let start = 0;
  const topicId = topic.id;
  while (true) {
    const response = await fetch(allPostsURL(topicId, start));
    if (response.status === 200) {
      const result = await response.json();
      // console.log(result);
      topic.posts = topic.posts.concat(
        result.map((post) => getPostFields(post))
      );
      if (result.length < 10) {
        return;
      }
      start += 10;
    }
  }
}

function getPostFields(post) {
  return {
    content: post.content,
    awards: post.awards.map((award) => getAwardFields(award)),
    dislikeCount: post.dislikeCount,
    likeCount: post.likeCount,
    username: post.userName,
    time: post.time,
    lastUpdateTime: post.lastUpdateTime,
    lastUpdateAuthor: post.lastUpdateAuthor,
  };
}

function getAwardFields(award) {
  return {
    content: award.content,
    reason: award.reason,
    operatorName: award.operatorName,
  };
}
