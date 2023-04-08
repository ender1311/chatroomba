import { useState } from "react"
import { usePost } from "../contexts/PostContext"
import { CommentList } from "./CommentList"
import { IconBtn } from "./IconBtn"
import { FaHeart, FaReply, FaEdit, FaTrash, FaRegHeart } from "react-icons/fa"
import { CommentForm } from "./CommentForm"
import { useAsyncFn } from "../hooks/useAsync"
import { createComment, deleteComment, toggleCommentLike, updateComment } from "../services/comments"
import { useUser } from "../hooks/useUser"


const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle:"medium", 
    timeStyle: "short",})


export function Comment({id, message, user, createdAt, likeCount, likedByMe}) {


    const {
        getReplies, 
        createLocalComment, 
        updateLocalComment, 
        deleteLocalComment, 
        toggleLocalCommentLike,
        post 
    } = usePost()

    
    const [areChildrenHidden, setAreChildrenHidden ]=useState(false)
    const [isReplying, setIsReplying ]=useState(false)
    const [isEditing, setIsEditing ]=useState(false)

    // store replies in this variable
    const childComments = getReplies(id)
    const currentUser = useUser()

    // declare variables for useAsync which enables reusing of code
    const createCommentFn = useAsyncFn(createComment)
    const updateCommentFn = useAsyncFn(updateComment)
    const deleteCommentFn = useAsyncFn(deleteComment)
    const toggleCommentLikeFn = useAsyncFn(toggleCommentLike)

    

    // function to handle replies
    function onCommentReply(message) {
        return createCommentFn.execute({postId: post.id, message, parentId: id}).then(comment => {
            setIsReplying(false)
            createLocalComment(comment)
        })
    }

    // function to handle edits
    function onCommentUpdate(message) {
        return updateCommentFn
        .execute({postId: post.id, message, id})
        .then(comment => {
            setIsEditing(false)
            console.log(comment)
            updateLocalComment(id, comment.message)
        })
    }


    // function to handle delete of a specific message
    function onCommentDelete(message) {
        return deleteCommentFn
        .execute({postId: post.id, message, id})
        .then(comment => deleteLocalComment(comment.id))
    }

    function onToggleCommentLike() {
        return toggleCommentLikeFn
          .execute({ id, postId: post.id })
          .then(({ addLike }) => toggleLocalCommentLike(id, addLike))
      }

    return (<>
    <div className="comment">
        <div className="header">
            <span className="name">{user.name}</span>
            <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
        
        </div>
        {isEditing ? (<CommentForm onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            autoFocus 
            initialValue={message}
            error={updateCommentFn.error} />
            ) : (
            <div className="message">{message}</div>
            )}
            

  
            <div className="footer">
                <IconBtn 
                // if current user has liked this comment, display red heart
                    onClick={onToggleCommentLike}
                    disabled={toggleCommentLikeFn.loading}
                    
                    Icon={likedByMe ? FaHeart : FaRegHeart} 

                    // if current user has not liked this comment, display empty gray heart
                    aria-label={likedByMe ? "Unlike" : "Like"}
                    >
                    {likeCount}
                </IconBtn>
                <IconBtn 
                // this logic toggles back and forth between reply mode on and off
                    onClick={() => setIsReplying(prev => !prev)} 
                    isActive={isReplying}
                    Icon={FaReply} 
                    aria-label={isReplying ? "Cancel Reply" : "Reply"}
                />

                {/* Restrict user's ability to edit or delete comments created by other users */}
                {user.id === currentUser.id && (
                    <>
                <IconBtn 
                    // this logic toggles back and forth between edit mode on and off
                    onClick={() => setIsEditing(prev => !prev)} 
                    isActive={isEditing}
                    Icon={FaEdit} 
                    aria-label={isEditing ? "Cancel Edit" : "Edit"} />
                <IconBtn 
                //prevents delete button from being clicked twice which could cause issues
                    disabled={deleteCommentFn.loading}
                    onClick={onCommentDelete}
                    Icon={FaTrash} 
                    aria-label="Delete" 
                    color="danger"/>

                    </>
                    )}
            


            </div>
// if user tries to delete a comment that they did not create, display error message

            {/* Inform user that they don't have authority to delete another user's comment */}
            {deleteCommentFn.error && (
                <div className="error-msg mtg-1">{deleteCommentFn.error}</div>
            )}
        </div>
        
  
    {isReplying && (
        <div className="mt-1 ml-3">
            <CommentForm autoFocus onSubmit={onCommentReply} loading={createCommentFn.loading} error />
        </div>
    )}
    {/* 
        if there are comments below this post then render out all child components in a nested format.
        This would continue to display more child component comments until all child components are displayed 
    */}
    {childComments?.length > 0 && (
        <>
        <div className={`nested-comments-stack ${areChildrenHidden ? "hide": ""}`}>
            <button 
            className="collapse-line" 
            aria-label="Hide Replies"
            onClick={() => setAreChildrenHidden(true)}
             />
                <div className="nested-comments">
                    <CommentList comments={childComments} />
                </div>
            
        </div>
        <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show Replies
          </button>
        </>
    )}
    </>
    )
}