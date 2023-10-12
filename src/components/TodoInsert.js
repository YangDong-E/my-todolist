// 할일 입력

import React, { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { TiTrash, TiPencil } from 'react-icons/ti';
import './TodoInsert.css';

const TodoInsert = ({ onInsertToggle, onInsertTodo, selectedTodo, onRemove, onUpdate }) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    };
    const onSubmit = (e) => {
        // form의 Submit특성 : 새로고침이 된다.
        // 그것을 막아주기위해 preventDefault 함수를 사용
        e.preventDefault();
        // value를 넣어준다.
        onInsertTodo(value);
        // value값을 빈 문자열로 초기화
        setValue('');
        // 창 닫기
        onInsertToggle();
    };
    // 렌더링이 되면 컴포넌트가 처음 렌더링 될때 어떤 것을 실행할지 결정하는 함수
    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.text);
        }
    }, [selectedTodo]);
    return (
        <div>
            {/* 어두운 백그라운드를 클릭하면 함수를 실행 */}
            <div className="background" onClick={onInsertToggle}></div>
            <form
                onSubmit={
                    selectedTodo
                        ? () => {
                              onUpdate(selectedTodo.id, value);
                          }
                        : onSubmit
                }
            >
                {/* value로 값과 onChange로 바뀔때마다 실행하는 함수 적용 */}
                <input placeholder="please type" value={value} onChange={onChange}></input>
                {selectedTodo ? (
                    <div className="rewrite">
                        <TiPencil onClick={() => onUpdate(selectedTodo.id, value)} />
                        <TiTrash onClick={() => onRemove(selectedTodo.id)} />
                    </div>
                ) : (
                    <button type="submit">
                        <MdAddCircle />
                    </button>
                )}
            </form>
        </div>
    );
};

export default TodoInsert;
