import React, { useState, useEffect } from 'react';
import CommentBox from './components/CommentBox';
import Comment from './components/Comment';
import {v4 as uuid} from 'uuid';

function App() {

  const [commentList, setCommentList] = useState([]);

  const addRootCommentToList = (comment) => {
    let newObj = {
      id: uuid(),
      comment: comment,
      parentId: null,
      hasChildren: null,
      level: 0
    }

    setCommentList([...commentList, newObj]);
  }

  const addReplyCommentToList = (comment, parentId) => {
    let parentCommentObj = commentList.find((commentObj) => commentObj.id === parentId);
    let parentLevel = parentCommentObj?.level;

    if(parentCommentObj !== "undefined"){
      parentCommentObj.hasChildren = true;
    }

    let newObj = {
      id: uuid(),
      comment: comment,
      parentId: parentId,
      hasChildren: null,
      level: parseInt(parentLevel) + 1
    }

    setCommentList([...commentList, newObj]);
  }

  const deleteCommentFromList = (id) => {
    let dummyCommentList = [...commentList];
    let newCommentList = dummyCommentList.filter((commentObj) => commentObj.id !== id);
    setCommentList([...newCommentList]);
  }

  const editCommentFromList = (id, newComment) => {
    let dummyCommentList = [...commentList];
    let parentCommentObj = dummyCommentList.find((commentObj) => commentObj.id === id);
    parentCommentObj.comment = newComment;
    setCommentList(dummyCommentList);

  }

  const getChildren = (id) => {
    let dummyCommentList = [...commentList];
    let childrenList = dummyCommentList.filter((commentObj) => commentObj.parentId === id);
    return childrenList;
  }
  return (
    <div className="App">
      <div className='main' style={{padding: "2em"}}>
        <h1>Add new comment</h1>
        <CommentBox addComment={(comment) => addRootCommentToList(comment)}/>

        <hr/>

        <h2>Comments</h2>
        {console.log(commentList)}
        {commentList?.length ? commentList.map((commentObj) => {
          if(commentObj.level == 0){
            return(
              <Comment 
                key={commentObj.id}
                comment={commentObj.comment}
                level={commentObj.level}
                hasChildren={commentObj.hasChildren}
                children={getChildren(commentObj.id)}
                getChildren={(id) => getChildren(id)}
                addReply={(reply) => addReplyCommentToList(reply, commentObj.id)}
                addReplyCommentToList={addReplyCommentToList}
                deleteComment={() => deleteCommentFromList(commentObj.id)}
                editComment={(newComment) => editCommentFromList(commentObj.id, newComment)}
                deleteCommentFromList={deleteCommentFromList}
                editCommentFromList={editCommentFromList}
              />) 
          }
        }) : <></>}
      </div>
    </div>
  );
}

export default App;
