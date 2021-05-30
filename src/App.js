import React from 'react';
import './style.css';
import { useState, useCallback, useEffect } from 'react';

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const onNewTodoChange = useCallback(e => {
    setNewTodo(e.target.value);
  });
  const formSubmitted = useCallback(
    e => {
      e.preventDefault();
      console.log('Submitted');
      setTodos([
        ...todos,
        {
          id: +Math.random()
            .toString()
            .substr(2),
          content: newTodo,
          done: false
        }
      ]);
    },
    [newTodo, todos]
  );

  const todoCheck = (todo, e) => {
    todo.done = !todo.done;
  };

  useEffect(() => {
    console.log(todos);
    setNewTodo('');
  }, [todos]);

  const removeTodo = useCallback((todo) => (event) => {
    setTodos(todos.filter(othertodo => othertodo != todo))
  }, [todos])

  return (
    <div>
      <form onSubmit={formSubmitted}>
        <label htmlFor="newTodo">Enter a todo:</label>
        <input
          value={newTodo}
          id="newTodo"
          name="newTodo"
          type="text"
          onChange={onNewTodoChange}
        />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <div key={todo.id + 2}>
            <input
              key={todo.id + 1}
              type="checkbox"
              checked={todo.done}
              onChange={event => {
                const newTodos = todos.slice();
                newTodos.splice(index, 1, {
                  ...todo,
                  done: !todo.done
                });
                setTodos(newTodos);
              }}
            />
            <li key={todo.id} onClick={e => todoCheck(todo, e)}>
              <span className={todo.done ? 'done' : ''}>{todo.content}</span>
              <button onClick={removeTodo(todo)}>Remove todo</button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
