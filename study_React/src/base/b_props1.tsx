import { useState } from "react";

function ChildComponent({ onScore }: { onScore: (score: number) => void }) {
    const scores = [1, 2, 3, 4, 5];

    return (
        <div style={{ border: '1px dashed blue', padding: 10, margin: 10 }}>
            <h4>子组件：请打分</h4>
            {scores.map((s) => (
                <button
                    key={s}
                    // 点击按钮时,调用从父组件传递过来的回调函数onScore
                    onClick={() => onScore(s)}
                    style={{ marginRight: 4 }}>
                    {s} 分
                </button>
            ))}
        </div>
    );
}

export default function MyApp() {
    const [score, setScore] = useState<number | null>(null);

    function handleScore(value: number) {
        setScore(value); // 更新状态score
    }

    return (
        <div style={{ border: '2px solid red', padding: 10 }}>
            <h3>父组件：评分结果</h3>
            <p>{score !== null ? `你打了 ${score} 分` : '还没有打分'}</p>
            {/* 父组件(MyApp)--props(回调函数onScore={handleScore})-->子组件(ChildComponent) */}
            <ChildComponent onScore={handleScore} />
        </div>
    );
}
