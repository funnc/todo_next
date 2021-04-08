import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { BASE_URL } from '../constants/urls';
import { sorting } from '../libs/sorting';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

const TodoItem = ({ id, title, onClickDelete }) => (
  <li id={id}>
    <h2>
      <a href={`/${id}`}>{title}</a>
      {` `}
      <button type="button" onClick={onClickDelete}>
        delete
      </button>
    </h2>
  </li>
);

const Home = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/posts');
        await Promise.resolve(sorting(data));
        setTodoList(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  let setId = todoList.length > 0 ? todoList[0].id : 0;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onClickAddBtn = () => {
    if (text && text.length > 0) {
      (async () => {
        try {
          await axios.post('/posts', { id: ++setId, title: text });
          const { data } = await axios.get('/posts');
          await Promise.resolve(sorting(data));
          setTodoList(data);
        } catch (e) {
          console.error(e);
        }
      })();
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  const deleteItem = (id) => {
    if (todoList) {
      (async () => {
        try {
          await axios.delete(`/posts/${id}`);
          const { data } = await axios.get('/posts');
          await Promise.resolve(sorting(data));
          setTodoList(data);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  };

  console.log(todoList);

  return (
    <>
      <h1>todo list</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button type="button" onClick={onClickAddBtn}>
        add
      </button>
      <ul>
        {todoList.length > 0 &&
          todoList.map(({ id, title }) => (
            <TodoItem
              key={id}
              id={id}
              title={title}
              onClickDelete={() => deleteItem(id)}
            />
          ))}
      </ul>
    </>
  );
};

TodoItem.defaultProps = {
  id: 1,
  title: '',
  onClickDelete: () => {},
};
TodoItem.propTypes = {
  id: propTypes.number,
  title: propTypes.string,
  onClickDelete: propTypes.func,
};

export default Home;
