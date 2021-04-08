import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BASE_URL } from '../../constants/urls';
import axios from 'axios';

axios.defaults.baseURL = BASE_URL;

const TodoView = () => {
  const router = useRouter();
  const [todoContents, setTodoContents] = useState(null);

  useEffect(() => {
    if (router.query.todoId) {
      (async () => {
        try {
          const { data } = await axios.get(`/posts/${router.query.todoId}`);
          await Promise.resolve(setTodoContents(data.title));
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [router]);

  return (
    <>
      <h1>todo view</h1>
      <div>{todoContents && todoContents}</div>
    </>
  );
};

export default TodoView;
