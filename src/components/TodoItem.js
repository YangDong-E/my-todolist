// 할일 목록 아이템

import React from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import './TodoItem.css';

// TodoList에서 onCheckToggle함수를 받아옴
const TodoItem = ({ todo, onCheckToggle, onInsertToggle, onChangeSelectedtodo }) => {
    // todo 객체를 받아옴
    const { id, text, checked } = todo; // 객체 구조 분해를 이용해서 todo객체에서 text를 가져옴
    return (
        <div className="TodoItem">
            <div className={`content ${checked ? 'checked' : ''}`}>
                {/* checked의 체크가 되있으면 calssName을 checked 아니면 빈자리 - 체크유무의 따른 CSS 변경을 위해서 */}
                {checked ? (
                    <MdCheckBox
                        onClick={() => {
                            onCheckToggle(id);
                        }}
                    />
                ) : (
                    <MdCheckBoxOutlineBlank
                        onClick={() => {
                            onCheckToggle(id);
                        }}
                    />
                )}
                {/* 글씨를 클릭했을때 수정할 수 있어야하기 때문에 onInsertToggle인자를 받아온다. */}
                <div
                    className="text"
                    onClick={() => {
                        onChangeSelectedtodo(todo);
                        onInsertToggle();
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
