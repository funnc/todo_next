import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9001';

const TodoItem = ({ title, onClickDelete }) => (
  <li>
    <h2>
      <a href="#">{title}</a>
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
      setTodoList([{ id: ++setId, title: text }, ...todoList]);
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  const deleteItem = (id) => {
    setTodoList(todoList && todoList.filter((item) => item.id !== id));
  };

  console.log(todoList);

  return (
    <>
      <h1>nextJs</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button type="button" onClick={onClickAddBtn}>
        add
      </button>
      <ul>
        {todoList.length > 0 &&
          todoList.map(({ id, title }) => (
            <TodoItem
              key={id}
              title={title}
              onClickDelete={() => deleteItem(id)}
            />
          ))}
      </ul>
    </>
  );
};

TodoItem.defaultProps = {
  title: '',
  onClickDelete: () => {},
};
TodoItem.propTypes = {
  title: propTypes.string,
  onClickDelete: propTypes.func,
};

export default Home;
