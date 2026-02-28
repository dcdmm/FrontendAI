import { useCallback, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const comparisons = [
    {
        title: 'Updating state based on props or state',
        badDesc: 'This is more complicated than necessary. It is inefficient too: it does an entire render pass with a stale value for fullName, then immediately re-renders with the updated value.',
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
        badDesc: 'This, too, is not ideal. Every time the items change, the List and its child components will render with a stale selection value at first. Then React will update the DOM and run the Effects. Finally, the setSelection(null) call will cause another re-render of the List and its child components, restarting this whole process again.',
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
    const [navVisible, setNavVisible] = useState(true);
    const [navWidth, setNavWidth] = useState(200);
    const isDragging = useRef(false);

    const onMouseDown = useCallback(() => {
        isDragging.current = true;
        const onMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;
            const newWidth = Math.min(Math.max(e.clientX - 20, 120), 400);
            setNavWidth(newWidth);
        };
        const onMouseUp = () => {
            isDragging.current = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }, []);

    return (
        <div style={{ display: 'flex', maxWidth: 1100, margin: '40px auto', padding: '0 20px', color: '#333' }}>
            <button
                onClick={() => setNavVisible(v => !v)}
                style={{
                    position: 'fixed', left: 8, top: 50, zIndex: 10,
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1px solid #ccc', background: '#fff',
                    cursor: 'pointer', fontSize: 14, lineHeight: '28px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title={navVisible ? 'Hide navigation' : 'Show navigation'}
            >
                {navVisible ? '\u00AB' : '\u00BB'}
            </button>

            {navVisible && (
                <nav style={{
                    position: 'sticky', top: 40, alignSelf: 'flex-start',
                    width: navWidth, flexShrink: 0,
                    paddingRight: 12,
                }}>
                    <h4 style={{ fontWeight: 600, marginBottom: 12, color: '#555' }}>Navigation</h4>
                    {comparisons.map((item, i) => (
                        <a key={i} href={`#section-${i}`} style={{
                            display: 'block', padding: '6px 0',
                            color: '#1a73e8', textDecoration: 'none', fontSize: 14, lineHeight: 1.4,
                        }}>
                            {item.title}
                        </a>
                    ))}
                </nav>
            )}

            {navVisible && (
                <div
                    onMouseDown={onMouseDown}
                    style={{
                        width: 4, cursor: 'col-resize', flexShrink: 0,
                        background: '#e0e0e0', borderRadius: 2,
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1a73e8')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#e0e0e0')}
                />
            )}

            <div style={{ flex: 1, minWidth: 0, paddingLeft: navVisible ? 24 : 0 }}>
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
                    <div key={i} id={`section-${i}`} style={{ marginBottom: 48 }}>
                        <h3 style={{ fontWeight: 500, marginBottom: 12 }}>{item.title}</h3>

                        <h4 style={{ color: '#c0392b', fontWeight: 500, margin: '0 0 4px' }}>Bad</h4>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus}
                            customStyle={{ borderRadius: 8, fontSize: 13, margin: 0 }}>
                            {item.bad}
                        </SyntaxHighlighter>
                        {item.badDesc && (
                            <p style={{ color: '#e74c3c', fontSize: 14, margin: '6px 0 16px', lineHeight: 1.5 }}>
                                {item.badDesc}
                            </p>
                        )}

                        <h4 style={{ color: '#27ae60', fontWeight: 500, margin: '0 0 4px' }}>Good</h4>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus}
                            customStyle={{ borderRadius: 8, fontSize: 13, margin: 0 }}>
                            {item.good}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </div>
        </div>
    );
}
