import { useState, useEffect } from 'react';

function Playground() {
    const [text, setText] = useState('a');

    useEffect(() => {
        function onTimeout() {
            console.log('⏰ ' + text);
        }

        console.log('🔵 Schedule "' + text + '" log');
        const timeoutId = setTimeout(onTimeout, 3000); // 定时器(3秒后执行onTimeout函数)

        // React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed).
        return () => {
            console.log('🟡 Cancel "' + text + '" log');
            clearTimeout(timeoutId); // 取消定时器
        }; // 添加清理函数
    }, [text]);

    return (
        <>
            <label>
                What to log:{' '}
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </label>
            <h1>{text}</h1>
        </>
    );
}

/*
执行流程:

* 点击"安装组件"按钮,触发初始渲染: text='a'
$ 打印: 🔵 Schedule "a" log

# 等待3秒......
$ 打印: ⏰ a

* 用户输入'ab',触发重新渲染: text='ab'
===>执行上一轮清理函数.("a")定时器已触发,clearTimeout无实际效果
$ 打印: 🟡 Cancel "a" log
$ 打印: 🔵 Schedule "ab" log

# 等待3秒......
$ 打印: ⏰ ab

* 用户输入'abc',触发重新渲染: text='abc'
===>执行上一轮清理函数.("ab")定时器已触发,clearTimeout无实际效果
$ 打印: 🟡 Cancel "ab" log          
$ 打印: 🔵 Schedule "abc" log

* 用户输入'abcd',触发重新渲染: text='abcd'
===>执行上一轮清理函数.("abc")定时器未触发,clearTimeout取消该定时器(即不打印"⏰ abc")
$ 打印: 🟡 Cancel "abc" log  
$ 打印: 🔵 Schedule "abcd" log

* 点击"卸载组件"按钮,
===>移除组件,执行最后一次清理函数,状态重置
$ 打印: 🟡 Cancel "abcd" log

......
*/
export default function MyApp() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(!show)}>
                {show ? '卸载' : '安装'}组件
            </button>
            {show && <hr />}
            {show && <Playground />}
        </>
    );
}