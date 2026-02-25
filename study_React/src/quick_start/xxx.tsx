import { useState, createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';

let nextId = 3;

const TasksContext = createContext<Task[]>([]);

const TasksDispatchContext = createContext<Dispatch<TaskAction>>(() => { });

interface Task {
    id: number;
    text: string;
    done: boolean;
}

type TaskAction =
    | { type: 'added'; id: number; text: string }
    | { type: 'changed'; task: Task }
    | { type: 'deleted'; id: number };

function tasksReducer(tasks: Task[], action: TaskAction): Task[] {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + (action as TaskAction).type);
        }
    }
}

const initialTasks = [
    { id: 0, text: '早睡早起', done: true },
    { id: 1, text: '持续学习', done: false },
    { id: 2, text: '努力工作', done: false }
];

function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );
    return (
        <TasksContext value={tasks}>
            <TasksDispatchContext value={dispatch}>
                {children}
            </TasksDispatchContext>
        </TasksContext>
    );
}

function AddTask() {
    const [text, setText] = useState('');
    const dispatch = useContext(TasksDispatchContext);
    return (
        <>
            <input
                placeholder="Add task"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => {
                setText('');
                dispatch({
                    type: 'added',
                    id: nextId++,
                    text: text,
                });
            }}>Add</button>
        </>
    );
}

function Task({ task }: { task: Task }) {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatchContext);
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={e => {
                        dispatch({
                            type: 'changed',
                            task: {
                                ...task,
                                text: e.target.value
                            }
                        });
                    }} />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    dispatch({
                        type: 'changed',
                        task: {
                            ...task,
                            done: e.target.checked
                        }
                    });
                }}
            />
            {taskContent}
            <button onClick={() => {
                dispatch({
                    type: 'deleted',
                    id: task.id
                });
            }}>
                Delete
            </button>
        </label>
    );
}

function TaskList() {
    const tasks = useContext(TasksContext);
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            ))}
        </ul>
    );
}

export default function App() {
    return (
        <TasksProvider>
            <h1>每日计划</h1>
            <AddTask />
            <TaskList />
        </TasksProvider>
    );
}