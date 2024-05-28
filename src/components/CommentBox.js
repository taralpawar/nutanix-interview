import React, { useState } from 'react';

const CommentBox = ({addComment}) => {
    const [content, setContent] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addComment(content);
        setContent('');
        //handle adding comment
    }

    return(
        <>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    rows={5}
                    style={{width: "40%"}}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
                <br/>
                <button type='submit' disabled={!content.length}>Add</button>
            </form>

        </>
    );
}

export default CommentBox;