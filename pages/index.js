import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

let getId = 1;

const TodoItem = ({ id, title, onClickDelete }) => (
  <li id={id}>
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
      setTodoList([...todoList, { id: ++getId, title: text }]);
      setText('');
    } else {
      alert('내용을 입력하세요.');
    }
  };

  const deleteItem = (id) => {
    setTodoList(todoList && todoList.filter((item) => item.id !== id));
  };

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
