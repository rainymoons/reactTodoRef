import { useState } from "react";
import Todo from "./components/todo/Todo";
import AddTodo from "./components/todo/AddTodo";

export default function App() {
  const todoItemList = [
    { id: 0, isDone: true, task: "ref", dueDate: "2024-11-19" },
    { id: 1, isDone: false, task: "ContextAPI", dueDate: "2024-11-20" },
  ];

  const [todoList, setTodoList] = useState(todoItemList);

  // 하나만 바꿀 것이기 때문에 event가 필요.
  const onDoneHandler = (event) => {
    const checkedDoneId = parseInt(event.target.value);
    const isChecked = event.target.checked;

    // 배열 카피를 해서 새로운 메모리를 생성 -> isDone의 값을 바꿀 수 없다. 그리고 최신 아이템 확신 못함.
    //setTodoList([...todoList]);
    // ()안에 함수를 넣어버린다.
    // 앞에는 이전까지 관리하던 가장 최신의 state
    // map -> 새로운 메모리주소를 참조하는 새 배열을 만들어서 반환함. [...]을 사용할 필요가 없음.
    setTodoList((prevTodoItemList) =>
      prevTodoItemList.map((todo) => {
        if (todo.id === checkedDoneId) {
          todo.isDone = isChecked; // 체크를 했던 todo는 값이 바뀌어서 반환된다.
        }
        return todo;
      })
    );
  };

  return (
    <>
      <h4>
        완료: {todoList.filter((todo) => todo.isDone).length} / 미완료:{" "}
        {todoList.filter((todo) => !todo.isDone).length}
      </h4>
      <ul>
        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} onClickDoneHandler={onDoneHandler} />
        ))}
      </ul>
      {/* 일정추가 */}
      <AddTodo setTodoList={setTodoList} />
    </>
  );
}
