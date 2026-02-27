import { useState, useRef, useEffect } from 'react';

/*
function MyComponent() {
    useEffect(() => {
        // Code here will run after *every* render
    });
    return <div />;
}

Every time your component renders, React will update the screen and then run the code inside useEffect. In other words, useEffect “delays” a piece of code from running until that render is reflected on the screen.
*/

function VideoPlayer0({ src, isPlaying }: { src: string; isPlaying: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);

    // When your VideoPlayer component renders (either the first time or if it re-renders), a few things will happen. First, React will update the screen, ensuring the <video> tag is in the DOM with the right props. Then React will run your Effect. Finally, your Effect will call play() or pause() depending on the value of isPlaying.
    useEffect(() => {
        if (ref.current) {
            if (isPlaying) {
                console.log('VideoPlayer0 video.play()');
                ref.current.play();
            } else {
                console.log('VideoPlayer0 video.pause()');
                ref.current.pause();
            }
        }
    });
    return <video ref={ref} src={src} loop playsInline width={300} />;
}


function VideoPlayer1({ src, isPlaying }: { src: string; isPlaying: boolean }) {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (isPlaying) {
                console.log('VideoPlayer1 video.play()');
                ref.current.play();
            } else {
                console.log('VideoPlayer1 video.pause()');
                ref.current.pause();
            }
        }
    }, [isPlaying]); 
    return <video ref={ref} src={src} loop playsInline width={300} />;
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [text, setText] = useState('');
    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <hr />
            <VideoPlayer0
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
            <hr />
            <VideoPlayer1
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    );
}