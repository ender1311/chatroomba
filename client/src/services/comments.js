import { makeRequest } from "./makeRequest";

// service functions for performing differnet actions: post, put, delete
export function createComment({ postId, message, parentId }) {
    return makeRequest(`posts/${postId}/comments`, {
        method: "POST",
        data: {message, parentId},
    })
}

export function updateComment({ postId, message, id }) {
    return makeRequest(`posts/${postId}/comments/${id}`, {
        method: "PUT",
        data: {message},
    })
}

export function deleteComment({ postId, id }) {
    return makeRequest(`posts/${postId}/comments/${id}`, {
        method: "DELETE",
    })
}

// service function for toggling like button
export function toggleCommentLike({ id, postId }) {
    return makeRequest(`/posts/${postId}/comments/${id}/toggleLike`, {
      method: "POST",
    })
  }