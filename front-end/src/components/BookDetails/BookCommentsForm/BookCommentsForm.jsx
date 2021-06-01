import React from 'react'

const BookCommentsForm = (props) => {
    const { bookComment, bookCommentPlaceholder, handleCommentAreaFocus, handleCommentAreaChange, handleSubmit } = props;
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="comment-area"
                name="comment"
                id="comment"
                rows="4"
                placeholder={bookCommentPlaceholder}
                onFocus={handleCommentAreaFocus}
                onChange={handleCommentAreaChange}
                value={bookComment}>
            </textarea>
            <button className="form-button comment-button" type="submit">Comment</button>
        </form>
    )
}

export default BookCommentsForm;