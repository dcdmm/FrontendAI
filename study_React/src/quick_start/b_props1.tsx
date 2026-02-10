import { useState } from "react";

function Child({ onScore }: { onScore: (score: number) => void }) {
    const scores = [1, 2, 3, 4, 5];

    return (
        <div style={{ border: '1px dashed blue', padding: 10, margin: 10 }}>
            <h4>子组件：请打分</h4>
            {scores.map((s) => (
                <button
                    key={s}
                    onClick={() => onScore(s)}
                    style={{ marginRight: 24 }}>
                    {s} 分
                </button>
            ))}
        </div>
    );
}

export default function MyApp() {
    const [score, setScore] = useState<number | null>(null);

    function handleScore(value: number) {
        setScore(value);
    }

    return (
        <div style={{ border: '2px solid red', padding: 10 }}>
            <h3>父组件：评分结果</h3>
            <p>{score !== null ? `你打了 ${score} 分` : '还没有打分'}</p>
            <Child onScore={handleScore} />
        </div>
    );
}
