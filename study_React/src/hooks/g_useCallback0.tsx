import { useState, useCallback, memo } from 'react';

// memo lets you skip re-rendering a component when its props are unchanged.
const Child = memo(
    function Child({ handleClick }: { handleClick: () => void }) {
        console.log('Child渲染了');
        return <button onClick={handleClick}>点我</button>;
    }
);

// const Child = function Child({ handleClick }: { handleClick: () => void }) {
//     console.log('Child 渲染了');
//     return <button onClick={handleClick}>点我</button>;
// }

/*
只用memo,不用useCallback
1. 打字操作:打印 Child渲染了
    * text变化--->MyApp重新渲染--->handleClick重新创建(新的引用地址)--->Child props变化--->Child重新渲染
2. 点击操作:打印 Child渲染了
    * 与上同理

不用memo,只用useCallback
1. 打字操作:打印 Child渲染了
    * text变化--->MyApp重新渲染--->useCallback依赖数组为空--->只在第一次渲染时创建一次--->handleClick引用不变--->默认情况下,父组件重新渲染时,递归重新渲染所有子组件--->Child重新渲染
2. 点击操作:打印 Child渲染了
    * 与上同理

memo和useCallback都有
1. 打字操作:不打印
    * text变化--->MyApp重新渲染--->useCallback依赖数组为空--->只在第一次渲染时创建一次--->handleClick引用不变--->memo比较前后props,没有变化--->Child不重新渲染
2. 点击操作:不打印
    * 与上同理
*/
export default function MyApp() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // const handleClick = () => setCount(c => c + 1);

    /*
    useCallback(fn, dependencies)

    fn: The function value that you want to cache. It can take any arguments and return any values. React will return (not call!) your function back to you during the initial render. On next renders, React will give you the same function again if the dependencies have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. React will not call your function. The function is returned to you so you can decide when and whether to call it.

    dependencies: The list of all reactive values referenced inside of the fn code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. 
    */
    const handleClick = useCallback(() => setCount(c => c + 1), []); // 内部使用更新函数

    return (
        <div style={{ padding: 20 }}>
            <p>count: {count}</p>
            <input value={text} onChange={e => setText(e.target.value)} placeholder="打字试试" />
            <Child handleClick={handleClick} />
        </div>
    );
}

