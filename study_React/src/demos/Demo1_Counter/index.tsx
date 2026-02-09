// React component names must always start with a capital letter, while HTML tags must be lowercase.
function MyButton() {
    return (
        <>
            <h1>About</h1>
            <button>I'm a button</button>
            <p>Hello there.<br/>How do you do?</p>
        </>
    );
}


export default function MyApp() {
    return (
        <div>
            <h1>Welcome to my app</h1>
            <MyButton/>
        </div>
    );
}