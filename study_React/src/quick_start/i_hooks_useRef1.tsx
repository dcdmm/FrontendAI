import { useRef } from 'react';


function Form0() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        const input = inputRef.current;
        console.log("input:", input);
        if (input) {
            input.focus();
        }
    }

    return (
        <>
            {/* Pass it as <input ref={inputRef}>. This tells React to put this <input>’s DOM node into inputRef.current. */}
            <input ref={inputRef} />
            <button onClick={handleClick}>
                点击我
            </button>
        </>
    );
}


function MyInput({ ref }: { ref: React.Ref<HTMLInputElement> }) {
    return <input ref={ref} />;
}

function Form1() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        const input = inputRef.current;
        if (input) {
            input.focus();
        }
    }

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>
                点击我
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