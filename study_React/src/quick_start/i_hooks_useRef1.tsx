import { useRef } from 'react';


function Form0() {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>
                Focus the input
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
        inputRef.current?.focus();
    }

    return (
        <>
            <MyInput ref={inputRef} />
            <button onClick={handleClick}>
                Focus the input
            </button>
        </>
    );
}

export default function MyApp() {
    return (
        <>
            <h2></h2>
            <Form0 />
            <h2></h2>
            <Form1 />
        </>
    );
}