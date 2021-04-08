import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import { sorting } from '../../libs/sorting';
import { BASE_URL } from '../../constants/urls';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

let commentId = 0;

const CommentItem = ({ id, content }) => (
  <li id={id}>
    <p>{content}</p>
  </li>
);

const TodoView = () => {
  const router = useRouter();
  const [todoContents, setTodoContents] = useState(null);
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);

  const todoId = router.query.todoId;

  useEffect(async () => {
    if (router.query.todoId) {
      try {
        const title = (await axios.get(`/posts/${todoId}`)).data.title;
        await Promise.resolve(setTodoContents(title));
        const allComments = (await axios.get('/comments')).data;
        if (allComments.length > 0) {
          await Promise.resolve(sorting(allComments, 'descendente'));
          commentId = allComments[allComments.length - 1].id;
          const filteredComments = allComments.filter(
            (post) => post.postId.toString() === todoId
          );
          if (filteredComments.length > 0) {
            await Promise.resolve(setComments(filteredComments));
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [router]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onClickWriteBtn = async () => {
    if (text && text.length > 0) {
      try {
        await axios.post('/comments', {
          id: ++commentId,
          postId: +todoId,
          content: text,
        });
        const comment = (await axios.get('/comments')).data.filter(
          (post) => post.postId.toString() === todoId
        );
        if (comment.length > 0) {
          await Promise.resolve(setComments(comment));
        }
      } catch (e) {
        console.error(e);
      }
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  return (
    <>
      <h1>todo view</h1>
      <div>{todoContents && todoContents}</div>
      <h2>reply</h2>
      <input type="text" value={text} onChange={handleChange} />
      <button type="button" onClick={onClickWriteBtn}>
        write
      </button>
      <ul>
        {comments.length > 0 &&
          comments.map(({ id, content }) => (
            <CommentItem key={id} id={id} content={content} />
          ))}
      </ul>
    </>
  );
};

CommentItem.defaultProps = {
  id: 1,
  content: '',
};
CommentItem.propTypes = {
  id: propTypes.number,
  content: propTypes.string,
};

export default TodoView;
