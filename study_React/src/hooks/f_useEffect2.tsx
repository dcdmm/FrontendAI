import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const comparisons = [
    {
        title: 'Updating state based on props or state',
        bad: `\
function Form() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');

    // 🔴 Avoid: redundant state and unnecessary Effect
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        setFullName(firstName + ' ' + lastName);
    }, [firstName, lastName]);
}\
`,
        good: `\
function Form() {
    const [firstName, setFirstName] = useState('Taylor');
    const [lastName, setLastName] = useState('Swift');
    // ✅ Good: calculated during rendering
    const fullName = firstName + ' ' + lastName;
    // ...
}\
`,
    },
    {
        title: 'Adjusting some state when a prop changes ',
        bad: `\
function List({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);

    // 🔴 Avoid: Adjusting state on prop change in an Effect
    useEffect(() => {
        setSelection(null);
    }, [items]);
    // ...
}\
`,
        good: `\
function List({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);

    // ✅ Better: Adjust the state while rendering
    const [prevItems, setPrevItems] = useState(items);
    if (items !== prevItems) {
        setPrevItems(items);
        setSelection(null);
    }
    // ...
}\
`,
    },
];


const tips = [
    'If you can calculate something during render, you don\'t need an Effect.',
    'To cache expensive calculations, add useMemo instead of useEffect.',
    'To reset the state of an entire component tree, pass a different key to it.',
    'To reset a particular bit of state in response to a prop change, set it during rendering.',
    'Code that runs because a component was displayed should be in Effects, the rest should be in events.',
    'If you need to update the state of several components, it\'s better to do it during a single event.',
    'Whenever you try to synchronize state variables in different components, consider lifting state up.',
    'You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.',
];

export default function MyApp() {
    return (
        <div style={{ maxWidth: 960, margin: '40px auto', padding: '0 20px', color: '#333' }}>
            <h2 style={{ fontWeight: 600, marginBottom: 8 }}>You Might Not Need an Effect</h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 20 }}>
                Effects are an <b>escape hatch</b> from the React paradigm.
                They let you step outside of React and synchronize your components
                with some external system. If there is no external system involved,
                you shouldn't need an Effect.
            </p>

            <ul style={{ color: '#444', lineHeight: 2, paddingLeft: 20, marginBottom: 28 }}>
                {tips.map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>

            {comparisons.map((item, i) => (
                <div key={i} style={{ marginBottom: 40 }}>
                    <h3 style={{ fontWeight: 500, textAlign: 'center', marginBottom: 12 }}>{item.title}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ color: '#c0392b', fontWeight: 500, margin: '0 0 4px' }}>Bad</h4>
                            <SyntaxHighlighter language="tsx" style={vscDarkPlus}
                                customStyle={{ borderRadius: 8, fontSize: 13, flex: 1, margin: 0 }}>
                                {item.bad}
                            </SyntaxHighlighter>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ color: '#27ae60', fontWeight: 500, margin: '0 0 4px' }}>Good</h4>
                            <SyntaxHighlighter language="tsx" style={vscDarkPlus}
                                customStyle={{ borderRadius: 8, fontSize: 13, flex: 1, margin: 0 }}>
                                {item.good}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

