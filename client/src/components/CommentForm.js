import { useState } from "react"

export function CommentForm({
    loading, 
    error, 
    autoFocus=false, 
    onSubmit, 
    initialValue=""
}) {

        // set initial value of message to what was already there upon user edit
    const [message, setMessage] = useState(initialValue)

    function handleSubmit(e) {
        e.preventDefault()
        // If submit is successful, then clear message for user to begin writing
        onSubmit(message).then(() => setMessage(""))
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSubmit(e);
        }
      }

    return (
        <form onSubmit={handleSubmit}>
            <div className="comment-form-row">
                <textarea 
                value={message} 
                onChange={e=> setMessage(e.target.value)}
                className="message-input" 
                // autofocus will scroll webpage to the text area for inputting new comment
                autoFocus={autoFocus}
                onKeyDown={handleKeyDown}
                />

                <button 
                className="btn" 
                type="submit" 
                disabled={loading}>
                    {loading? "Loading" : "Post"}
                </button>
            </div>
            <div className="error-msg">{error}</div>
        </form>
    )
}