import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { BASE_URL } from '../constants/urls';
import { sorting } from '../libs/sorting';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

let todoListId = 0;

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
  const [sortOrder, setSortOrder] = useState('descendente');

  useEffect(async () => {
    const setTodoListFunc = async () => {
      try {
        const { data } = await axios.get('/posts');
        await Promise.resolve(sorting(data, sortOrder));
        setTodoList(data);
      } catch (e) {
        console.error(e);
      }
    };
    setTodoListFunc();
  }, [sortOrder]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onClickAddBtn = async () => {
    if (text && text.length > 0) {
      try {
        if (todoList.length > 0) {
          todoListId = todoList[0].id;
        }
        await axios.post('/posts', {
          id: ++todoListId,
          title: text,
          comments: [],
        });
        const { data } = await axios.get('/posts');
        await Promise.resolve(sorting(data));
        setTodoList(data);
      } catch (e) {
        console.error(e);
      }
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  const deleteItem = async (id) => {
    if (todoList) {
      try {
        await axios.delete(`/posts/${id}`);
        const { data } = await axios.get('/posts');
        await Promise.resolve(sorting(data));
        setTodoList(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSortOrder = () => {
    sortOrder === 'descendente'
      ? setSortOrder('asec')
      : setSortOrder('descendente');
  };

  return (
    <>
      <h1>todo list</h1>
      <div>
        <span>정렬 : </span>{' '}
        <span onClick={() => handleSortOrder()}>
          {sortOrder === 'asec' ? '오름차순' : '내림차순'}
        </span>
      </div>
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
