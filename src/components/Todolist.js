// 할 일의 목록을 담고 있는 리스트
import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

// onCheckToggle 함수를 App.js에서 받아온다.
const Todolist = ({ todos, onCheckToggle, onInsertToggle, onChangeSelectedtodo }) => {
    return (
        <div className="TodoList">
            {todos.map((todo) => (
                <TodoItem
                    todo={todo}
                    key={todo.id}
                    onCheckToggle={onCheckToggle}
                    onInsertToggle={onInsertToggle}
                    onChangeSelectedtodo={onChangeSelectedtodo}
                />
            ))}
            {/* 각각의 자식 요소들은 unique한 key 값을 가져줘야해서 키값으로 todo의 id를 사용 */}
            {/* TodoItem에서 할일들의 체크박스를 사용하기위해 onCheckToggle 함수를 보내준다. */}
        </div>
    );
};

export default Todolist;
