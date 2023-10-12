import React, { useState } from 'react';
import './App.css';
import Template from './components/Template';
import Todolist from './components/Todolist';
import { MdAddCircle } from 'react-icons/md';
import TodoInsert from './components/TodoInsert';

// 이 함수가 App 함수 안에 있으면 함수가 새로 리렌더링 될때마다 처음 값으로 돌아가기 때문에 밖에 적어준다.
let nextId = 4;

const App = () => {
    const [selectedTodo, setSelectedTodo] = useState(null);
    // 입력 토글 - 기본값 false
    const [insertToggle, setInsertToggle] = useState(false);

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '할일 1',
            checked: true,
        },
        {
            id: 2,
            text: '할일 2',
            checked: false,
        },
        {
            id: 3,
            text: '할일 3',
            checked: true,
        },
    ]);

    // 플러스 버튼을 클릭했을때 발생하는 함수
    const onInsertToggle = () => {
        if (selectedTodo) {
            setSelectedTodo(null);
        }
        setInsertToggle((prev) => !prev);
    };

    const onInsertTodo = (text) => {
        if (text === '') {
            return alert('할 일을 입력해주세요.');
        } else {
            const todo = {
                id: nextId,
                text,
                checked: false,
            };
            // push가 아닌 concat을 쓰는 이유 : push를 사용하면 해당 배열 자체를 변경하고 concat을 사용하면 기존 배열을 변경시키지않고 새 배열을 리턴이 되기때문에 전에 값을 기억하고있다.
            // 상태의 불변성을 지켜준다.
            setTodos((todos) => todos.concat(todo));
            nextId++;
        }
    };

    const onCheckToggle = (id) => {
        // todos의 객체를 map함수를 이용해서  todo를 받는다.
        // todo.id와 인자의 id가 일치한다면 todo가 가지고 있는 객체 속성을 모두 가져오고 checked의 값을 !를 사용하여 반대로 바꾸어준다.
        // 같지 않다면 그대로 todo를 반환해준다.
        setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)));
    };

    const onChangeSelectedtodo = (todo) => {
        setSelectedTodo(todo);
    };

    const onRemove = (id) => {
        onInsertToggle();
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    };

    const onUpdate = (id, text) => {
        onInsertToggle();
        setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
    };

    // length로 todos의 길이(개수)를 표시  Template컴포넌트로 todoLength라는 이름으로 todos의 길이를 보냄
    return (
        <Template todoLength={todos.length}>
            {/* onCheckToggle함수를 TodoList로 보내준다. */}
            <Todolist
                todos={todos}
                onCheckToggle={onCheckToggle}
                onInsertToggle={onInsertToggle}
                onChangeSelectedtodo={onChangeSelectedtodo}
            />
            {/* onClick으로 인한 함수 실행 */}
            <div className="add-todo-button" onClick={onInsertToggle}>
                <MdAddCircle />
            </div>
            {/* insertToggle이 true인 경우에만 Todoinsert가 나오도록함 */}
            {/* TodoInsert에서 onInsertToggle인자를 사용하기때문에 보내줌 */}
            {insertToggle && (
                <TodoInsert
                    selectedTodo={selectedTodo}
                    onInsertToggle={onInsertToggle}
                    onInsertTodo={onInsertTodo}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                />
            )}
        </Template>
    );
};

export default App;
