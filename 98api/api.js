const BASE_URL = "https://api.cc98.org";
export const TOPIC_URL = `${BASE_URL}/topic`;
export const hotPostsURL = (topicId) => `${BASE_URL}/Topic/${topicId}/hot-post`;
export const allPostsURL = (topicId, start) =>
  `${BASE_URL}/Topic/${topicId}/post?from=${start}&size=10`;
