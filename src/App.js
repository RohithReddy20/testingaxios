import "./styles.css";
import { useState, useEffect } from "react";
// import useAxios
import { useAxios } from "./axios.hook";
import TodoItem from "./TodoItem";
export default function App() {
  const { loading, todos, error } = useAxios("/todos");
  const userInfo = useAxios("/users/1").todos;
  // setUser(useAxios("/users/1").todos)
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="todo" data-testid="todos">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {/* <h1>{JSON.stringify(userInfo)}</h1> */}
    </div>
  );
}
