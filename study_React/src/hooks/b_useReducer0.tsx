import { useState, useReducer } from 'react';

// Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a reducer. 

function TodoWithState() {
    const [todos, setTodos] = useState([
        { id: 1, text: '学习Rust', done: false },
        { id: 2, text: '学习TypeScript', done: true },
    ]);
    const [nextId, setNextId] = useState(3);
    const [input, setInput] = useState('');

    function handleAdd() {
        if (!input.trim()) return;
        setTodos([...todos, { id: nextId, text: input, done: false }]);
        setNextId(nextId + 1);
        setInput('');
    }

    function handleToggle(id: number) {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    }

    function handleDelete(id: number) {
        setTodos(todos.filter(t => t.id !== id));
    }

    function handleClearAll() {
        setTodos([]);
    }

    return (
        <div style={{ border: '2px solid #e74c3c', padding: 16, borderRadius: 8 }}>
            <h3>useState版本</h3>
            <p style={{ color: '#999', fontSize: 12 }}>
                更新逻辑散落在handleAdd / handleToggle / handleDelete / handleClearAll四个函数中
            </p>
            <div>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="添加任务..." />
                <button onClick={handleAdd}>添加</button>
                <button onClick={handleClearAll}>全部清空</button>
            </div>
            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                        <span
                            onClick={() => handleToggle(t.id)}
                            style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}
                        >
                            {t.text}
                        </span>
                        <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 8 }}>删除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}


type Todo = { id: number; text: string; done: boolean };
type TodoAction =
    | { type: 'added'; text: string }
    | { type: 'toggled'; id: number }
    | { type: 'deleted'; id: number }
    | { type: 'cleared' };
type TodoState = {
    todos: Todo[];
    nextId: number;
};

// A reducer function is where you will put your state logic. It takes two arguments, the current state and the action object, and it returns the next state:
function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case 'added':
            return {
                nextId: state.nextId + 1,
                todos: [...state.todos, { id: state.nextId, text: action.text, done: false }],
            };
        case 'toggled':
            return {
                ...state,
                todos: state.todos.map(t => t.id === action.id ? { ...t, done: !t.done } : t),
            };
        case 'deleted':
            return {
                ...state,
                todos: state.todos.filter(t => t.id !== action.id),
            };
        case 'cleared':
            return { ...state, todos: [] };
        default:
            throw new Error('未知action');
    }
}

function TodoWithReducer() {
    /*
    The useReducer Hook takes two arguments:
    * A reducer function
    * An initial state
    
    And it returns:
    * A stateful value
    * A dispatch function (to “dispatch” user actions to the reducer)
    */
    const [state, dispatch] = useReducer(
        todoReducer,
        {
            todos: [
                { id: 1, text: '学习Rust', done: false },
                { id: 2, text: '学习TypeScript', done: true },
            ],
            nextId: 3,
        }
    );
    const [input, setInput] = useState('');

    function handleAdd() {
        if (!input.trim()) return;
        dispatch({ type: 'added', text: input });
        setInput('');
    }

    return (
        <div style={{ border: '2px solid #2ecc71', padding: 16, borderRadius: 8, marginTop: 16 }}>
            <h3>useReducer 版本</h3>
            <p style={{ color: '#999', fontSize: 12 }}>
                所有更新逻辑集中在todoReducer里,组件只负责dispatch action
            </p>
            <div>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="添加任务..." />
                <button onClick={handleAdd}>添加</button>
                <button onClick={() => dispatch({ type: 'cleared' })}>全部清空</button>
            </div>
            <ul>
                {state.todos.map(t => (
                    <li key={t.id}>
                        <span
                            onClick={() => dispatch({ type: 'toggled', id: t.id })}
                            style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}
                        >
                            {t.text}
                        </span>
                        <button onClick={() => dispatch({ type: 'deleted', id: t.id })} style={{ marginLeft: 8 }}>
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function MyApp() {
    return (
        <div>
            <h2>useReducer vs useState 对比</h2>
            <TodoWithState />
            <TodoWithReducer />
        </div>
    );
}
