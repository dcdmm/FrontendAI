// Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

import { useState } from 'react'

function UserForm() {
    const [name, setName] = useState('')
    const [age, setAge] = useState(18)
    const [hobbies, setHobbies] = useState<string[]>([])

    function addHobby() {
        const hobby = prompt('输入一个爱好：')
        if (hobby) {
            setHobbies([...hobbies, hobby]) // 添加元素
        }
    }

    function removeHobby(index: number) {
        setHobbies(hobbies.filter((_, i) => i !== index)) // 删除元素(生成一个新数组)
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
                {hobbies.length > 0 && (
                    <span> 爱好：{hobbies.map((hobby, index) => (
                        <span key={index}>
                            {hobby}
                            <button onClick={() => removeHobby(index)} style={{ marginLeft: 4, cursor: 'pointer' }}>❌</button>
                            {index < hobbies.length - 1 && '、'}
                        </span>
                    ))}</span>
                )}
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
