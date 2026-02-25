import { useState, createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react';

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
            throw new Error('Unknown action');
        }
    }
}

const initialTasks = [
    { id: 0, text: '早睡早起', done: true },
    { id: 1, text: '持续学习', done: false },
    { id: 2, text: '努力工作', done: false }
];

let nextId = initialTasks.length;

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

// 直接props传递:
/*
function AddTask({ dispatch }: { dispatch: Dispatch<TaskAction> }) {
    // ...原有逻辑不变
}

function TaskList({ tasks, dispatch }: { tasks: Task[]; dispatch: Dispatch<TaskAction> }) {
    // ...原有逻辑不变
}

function Task({ task, dispatch }: { task: Task; dispatch: Dispatch<TaskAction> }) {
    // ....原有逻辑不变
}

function MyApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    return (
        <>
            <h1>每日计划</h1>
            <AddTask dispatch={dispatch} />
            <TaskList tasks={tasks} dispatch={dispatch} />
        </>
    );
}
*/
export default function MyApp() {
    return (
        <TasksProvider>
            <h1>每日计划</h1>
            <AddTask />
            <TaskList />
        </TasksProvider>
    );
}
/*
当组件树层级较深时(如下所示),若仅少数深层组件(如AddTask、TaskList、Task)需要访问共享状态(tasks)或更新函数(dispatch),
若采用props逐层传递,则中间层组件(Layout / Sidebar / Panel / Section)即使不消费这些数据,也必须承担“接收并继续透传”的职责,
从而形成典型的props drilling(属性透传)问题.这会导致组件接口膨胀、职责不清、耦合度上升.
对此,可通过Context将tasks与dispatch上移至Provider统一提供,由实际需要的后代组件通过useContext按需消费,从而避免无意义的层层传参

MyApp
    └───Layout                     ← 不需要,但若用props须透传
        └───Sidebar                ← 不需要,但若用props须透传
            └───Panel              ← 不需要,但若用props须透传
                └───Section        ← 不需要,但若用props须透传
                    └───AddTask    ← 需要dispatch
                    └───TaskList   ← 需要tasks
                        └───Task    ← 需要dispatch
*/