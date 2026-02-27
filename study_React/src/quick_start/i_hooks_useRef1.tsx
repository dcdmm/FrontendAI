import { useRef } from 'react';

// Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.
// If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to modify the DOM manually, you can risk conflicting with the changes React is making.

function Form0() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        const input = inputRef.current;
        console.log("DOM:", input);
        if (input) {
            input.focus(); // 获得焦点
            input.select(); // 选中文本
        }
    }

    return (
        <>
            {/* Pass it as <input ref={inputRef}>. This tells React to put this <input>’s DOM node into inputRef.current. */}
            <input ref={inputRef} defaultValue={"dmm"} />
            <button onClick={handleClick}>
                选中文本
            </button>
        </>
    );
}


function MyInput({ ref }: { ref: React.Ref<HTMLInputElement> }) {
    return <input ref={ref} defaultValue={"dc"} />;
}

function Form1() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        const input = inputRef.current;
        if (input) {
            input.focus();
            input.select();
        }
    }

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>
                选中文本
            </button>
        </>
    );
}

export default function MyApp() {
    return (
        <>
            <h2>useRef对象直接操作DOM</h2>
            <Form0 />
            <h2>useRef对象操作子组件DOM</h2>
            <Form1 />
        </>
    );
}