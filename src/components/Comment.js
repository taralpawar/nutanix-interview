import React, { useState } from 'react';
import CommentBox from './CommentBox';

const Comment = (props) => {
    const [showCommentBox, setShowCommentBox] = useState(false);

    const handleAddComment = (comment) => {
        props.addReply(comment);
        setShowCommentBox(false);
    }

    const handleDeleteComment = () => {
        props.deleteComment();
    }

    const handleEditComment = () => {
        setShowCommentBox(true);
        props.editComment();
        setShowCommentBox(false);
    }

    return(
        <>
            <div className='commentMain' style={{paddingLeft: props.level * 15 + 'px', display: "flex", width: "100%", alignItems:"center", justifyContent:"start"}}>
                <p >{props.comment}</p>
                <button onClick={(e) => setShowCommentBox(true)} style={{background: "none", border: "none", color: "blueviolet", cursor: "pointer"}}>Reply</button>
                <button onClick={(e) => handleEditComment()} style={{background: "none", border: "none", color: "green", cursor: "pointer"}}>Edit</button>
                <button onClick={(e) => handleDeleteComment()} style={{background: "none", border: "none", color: "red", cursor: "pointer"}}>Delete</button>
            </div>

            {showCommentBox && 
                <div style={{paddingLeft: props.level * 15 + 'px'}}>
                    <CommentBox addComment={(comment) => handleAddComment(comment)} />
                </div>
            }

            {props.hasChildren && props.children?.length ? 
                props.children.map((childCommentObj) => {
                    return(
                        <div style={{paddingLeft: props.level * 15 + 'px'}}>
                            <Comment 
                                {...props}
                                key={childCommentObj.id}
                                comment={childCommentObj.comment}
                                level={childCommentObj.level}
                                hasChildren={childCommentObj.hasChildren}
                                children={props.getChildren(childCommentObj.id)}
                                addReply={(reply) => props.addReplyCommentToList(reply, childCommentObj.id)}
                                deleteComment={() => props.deleteCommentFromList(childCommentObj.id)}
                                editComment={(newComment) => props.editCommentFromList(childCommentObj.id, newComment)}
                            />
                        </div>
                    )
                }) : <></>
            }
            
        </>
    );
}

export default Comment;