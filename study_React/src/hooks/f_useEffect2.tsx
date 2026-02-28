import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

/*
Effects are an escape hatch from the React paradigm. They let you "step outside" of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component's state when some props or state change), you shouldn't need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.

* If you can calculate something during render, you don’t need an Effect.
* To cache expensive calculations, add useMemo instead of useEffect.
* To reset the state of an entire component tree, pass a different key to it.
* To reset a particular bit of state in response to a prop change, set it during rendering.
* Code that runs because a component was displayed should be in Effects, the rest should be in events.
* If you need to update the state of several components, it’s better to do it during a single event.
* Whenever you try to synchronize state variables in different components, consider lifting state up.
* You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.
*/

const badCode = `\
function Form() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');

    // 🔴 Avoid: redundant state and unnecessary Effect
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        setFullName(firstName + ' ' + lastName);
    }, [firstName, lastName]);
}\
`;

const goodCode = `\
function Form() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');
    // ✅ Good: calculated during rendering
    const fullName = firstName + ' ' + lastName;
    // ...
}\
`;

export default function MyApp() {
    return (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
            <h3>🔴 Bad: redundant state + unnecessary Effect</h3>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
                {badCode}
            </SyntaxHighlighter>

            <h3>✅ Good: calculated during rendering</h3>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
                {goodCode}
            </SyntaxHighlighter>
        </div>
    );
}
