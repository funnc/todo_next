import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

const mockData = [
  { id: 20, title: '데이터 2' },
  { id: 19, title: '데이터 1' },
];

let itemId = mockData[0].id;

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

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const onClickAddBtn = () => {
    if (text && text.length > 0) {
      setTodoList([{ id: ++itemId, title: text }, ...todoList]);
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  const deleteItem = (id) => {
    setTodoList(todoList && todoList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (mockData) {
      setTodoList(mockData);
    }
  }, []);

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
