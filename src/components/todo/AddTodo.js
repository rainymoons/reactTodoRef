import { useRef, useState } from "react";
import addTodoStyle from "./AddTodo.module.css";
import { Alert } from "../ui/Modal";

export default function AddTodo({ setTodoList }) {
  // ref부터 만든다.
  const taskRef = useRef();
  const dueDateRef = useRef();

  const alertRef = useRef();

  // task 내용과 duedate내용을 가져와서 setTodoList에 추가
  const onClickAddButtonHandler = () => {
    const task = taskRef.current.value;
    const dueDate = dueDateRef.current.value;

    let alertMessages = [];
    if (!task) {
      alertMessages.push("task를 입력하세요.");
    }

    if (!dueDate) {
      alertMessages.push("due date를 입력하세요.");
    }

    // Modal을 위한 조건
    if (!task || !dueDate) {
      // show에 전달할 배열을 만들어서 넣어줘야 함.
      alertRef.current.show(alertMessages);
      //alert("내용을 입력해야 합니다.");
      return;
    }

    // 값을 가져와서 setTodoList 호출. -> 새롭게 추가한것만 배열에 넣어야 함.
    //prevTodoList최신의 스테이트 -> 배열로 만들어야함.
    // 객체 리터럴로 넣어줌. 그렇게 만들었으니까.
    // 앞에 넣어주면 배열의 가장 앞에 들어감. 반대의 경우 제일 밑.
    setTodoList((prevTodoList) => [
      {
        id: prevTodoList.length, // 0-1-2-3-4-5 순으로 증가하므로 length로 준다.
        isDone: false,
        task, // value가 task로 같으므로 생략 가능
        dueDate, // 마찬가지로 생략 가능
      },
      ...prevTodoList,
    ]);

    // 입력값 초기화
    taskRef.current.value = "";
    dueDateRef.current.value = "";
  };

  return (
    <div className={addTodoStyle.addTodoWrapper}>
      <label className={addTodoStyle.addTodoLabel} htmlFor="task">
        Task
      </label>
      <input
        className={addTodoStyle.addTodoInput}
        type="text"
        id="task"
        placeholder="Input Task"
        ref={taskRef}
      />

      <label className={addTodoStyle.addTodoLabel} htmlFor="due-date">
        Due Date
      </label>
      <input type="date" id="due-date" ref={dueDateRef} />

      <button
        className={addTodoStyle.addTodoButton}
        onClick={onClickAddButtonHandler}
      >
        등록
      </button>

      <Alert alertRef={alertRef} />
    </div>
  );
}
