import React, { useEffect, useState } from 'react';
import { fetchIssueComments } from '../api/githubAPI';
import {Comment} from '../interfaces/issueTypes';

function Comment({ commentId }: Comment) {
  const [commentBody, setCommentBody] = useState('');

  useEffect(() => {
    fetchIssueComments(commentId)
      .then((data: { body: React.SetStateAction<string>; }) => {
        setCommentBody(data.body);
      })
      .catch((error: any) => {
        console.error('Error fetching comment:', error);
      });
  }, [commentId]);

  return (
    <div>
      <p>{commentBody}</p>
    </div>
  );
}

export default Comment;
