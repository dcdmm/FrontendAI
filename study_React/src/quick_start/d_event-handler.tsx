function MyButton() {
    // 事件处理函数
    function handleClick() {
        alert('你点击了我!');
    }

    return (
        // Notice how onClick={handleClick} has no parentheses at the end! Do not call the event handler function: you only need to pass it down. React will call your event handler when the user clicks the button.
        <button onClick={handleClick}>
            Click me
        </button>
    );
}

export default function MyApp() {
    return (
        <MyButton />
    );
}