import { type ReactNode, useState } from 'react';

// Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.

interface PanelProps {
    title: string;
    children: ReactNode;
    isActive: boolean;
    onShow: () => void;
}

function Panel({
    title,
    children,
    isActive,
    onShow
}: PanelProps) {
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ?
                (
                    <p>{children}</p>) : (
                    <button onClick={onShow}>
                        Show
                    </button>
                )
            }
        </section>
    );
}


export default function MyApp() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <>
            <h2>中国介绍</h2>
            {/* 共享父组件状态activeIndex(任何时候都只有一个面板处于展开状态 */}
            <Panel
                title="人口"
                isActive={activeIndex === 0}
                onShow={() => setActiveIndex(0)}
            >
                <p style={{ color: 'red' }}>中国是世界上人口第二多的国家，拥有超过14亿的人口。</p>
            </Panel>
            <Panel
                title="地理"
                isActive={activeIndex === 1}
                onShow={() => setActiveIndex(1)}
            >
                <p style={{ color: 'blue' }}>中国的地理位置非常广阔，拥有多样的地形和气候条件。</p>
            </Panel>
        </>
    );
}