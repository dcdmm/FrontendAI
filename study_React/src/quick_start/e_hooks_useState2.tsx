import { useState } from 'react'


function UserForm() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(18)
    const [hobbies, setHobbies] = useState<string[]>([])

    function addHobby() {
        const hobby = prompt('输入一个爱好：')
        if (hobby) {
            setHobbies([...hobbies, hobby])
        }
    }

    return (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, marginBottom: 16 }}>
            <h3>📝 useState - 表单数据</h3>
            <div style={{ marginBottom: 8 }}>
                <label>姓名：</label>
                <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 8 }}>
                <label>年龄：</label>
                <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
            <div style={{ marginBottom: 8 }}>
                <button onClick={addHobby}>添加爱好</button>
                {hobbies.length > 0 && <span> 爱好：{hobbies.join('、')}</span>}
            </div>
            <p style={{ color: '#666' }}>
                你好，{name || '???'}！你今年 {age} 岁。
            </p>
        </div>
    )
}


export default function MyApp() {
    return (
        <div>
            <h1>更新数组</h1>
            <UserForm />
        </div>
    )
}
