import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useAsync } from "../hooks/useAsync"
import { getPost } from "../services/posts"

const Context = React.createContext()


export function usePost() {
    return useContext(Context)
}


// Context is used to share state between several components
// children is wrapped by Context.Provider
// All the post and children of posts can access what is inside of this provider
// Store post info in this provider

export function PostProvider({children}) {
    const {id} = useParams()
    // useAsync takes in function called getPost with id parameter and gets updated whenever id is updated
    const { loading, error, value: post } = useAsync(() => getPost(id), [id])

    // new hook for changing comments
    const [comments, setComments] = useState([])

    // console.log(post)
    // group comments into separate array by parent ID
    const commentsByParentId = useMemo(() => {

        // if (post?.comments == null) return []

        const group = {}
        // populate the group with additional comments
        // create tag for ID
        // create empty array for group if there's nothing there.
        comments.forEach(comment => {
            group[comment.parentId] ||= []
            group[comment.parentId].push(comment)
          })
          return group
        }, [comments])

    // this hook will render the changes whenever there is a new post.
    useEffect(() => {
        if(post?.comments == null) return
        setComments(post.comments)
    }, [post?.comments])

    function getReplies(parentId) {
        return commentsByParentId[parentId]
    }

    function createLocalComment(comment) {
        setComments(prevComments => {
            return [comment, ...prevComments]
        })
    }

    // replace previous message with new message
    function updateLocalComment(id, message) {
        setComments(prevComments => {
          return prevComments.map(comment => {
            if (comment.id === id) {
              return { ...comment, message }
            } else {
              return comment
            }
          })
        })
      }

      // deletes commment stored locally
    function deleteLocalComment(id) {
        setComments(prevComments => {
            return prevComments.filter(comment => comment.id !== id)
        })
    }

    // toggle the like on specific comment
    function toggleLocalCommentLike(id, addLike) {
        setComments(prevComments => {
            return prevComments.map(comment => {
                if (id === comment.id) {
                    if (addLike) {
                        // changes values if comment in being liked
                        return {
                            ...comment,
                            likedCount: comment.likeCount + 1,
                            likedByMe: true
                        } 
                    }
                    else {
                        // change values if comment is being unliked
                        return {
                            ...comment,
                            likedCount: comment.likeCount - 1,
                            likedByMe: false
                        }
                    }
                }
                else {
                    return comment
                }
            })
        })
    }
    return (
    <Context.Provider 
    value={{
        post: {id, ...post},
        rootComments: commentsByParentId[null],
        getReplies,
        createLocalComment,
        updateLocalComment,
        deleteLocalComment,
        toggleLocalCommentLike,
    }}>
        {
            // Render what code is doing in background: loading, error, or successfully got values
        loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1 className="error-msg">{error}</h1>
      ) : (
        children
      )}
    </Context.Provider> 
    )
}