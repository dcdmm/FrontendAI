import type React from "react";

interface Person {
    name: string;
    imageId: string;
}

interface Detail {
    age: number;
    gender: boolean;
    nation: string;
}

function getImageUrl(person: Person, size: string = 's') {
    return (
        'https://i.imgur.com/' +
        person.imageId +
        size +
        '.jpg'
    );
}

function ShowDetail(detail: Detail) {
    return (
        <div>
            <p>Age: {detail.age}</p>
            <p>Gender: {detail.gender ? 'Male' : 'Female'}</p>
            <p>Nation: {detail.nation}</p>
        </div>
    );
}

// function Avatar(props: { person: Person; size: number; detail: Detail }) {
//     return (
//         <>
//             <img
//                 className="avatar"
//                 src={getImageUrl(props.person)}
//                 alt={props.person.name}
//                 width={props.size}
//                 height={props.size}
//             />
//             <ShowDetail {...props.detail} />
//         </>
//     );
// }

// 解构对象(与上等价)
function Avatar({ person, size, detail }: { person: Person; size: number; detail: Detail }) {
    return (
        <>
            <img
                className="avatar"
                src={getImageUrl(person)}
                alt={person.name}
                width={size}
                height={size}
            />
            {/* 等价于 <ShowDetail age={detail.age} gender={detail.gender} nation={detail.nation} /> */}
            <ShowDetail {...detail} /> {/* spread (...) syntax */}
        </>
    );
}

// title带有默认值并为可选
// When you nest content inside a JSX tag, the parent component will receive that content in a prop called children. 
function Box({ title = "人物卡片", children }: { title?: string | React.ReactElement; children: React.ReactNode }) {
    return (
        <div style={{ border: '2px solid red', padding: 10 }}>
            <h3>{title}</h3>
            <ul>{children}</ul>
        </div>
    );
}

export default function MyApp() {
    return (
        <div>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
                detail={{ age: 80, gender: false, nation: 'Japan' }}
            />
            <Box>
                <Avatar
                    size={80}
                    person={{
                        name: 'Aklilu Lemma',
                        imageId: 'OKS67lh'
                    }}
                    detail={{ age: 70, gender: true, nation: 'Ethiopia' }}
                />
            </Box>
            <Box title={<span style={{ color: 'red' }}>人物详细信息</span>}>
                <Avatar
                    size={50}
                    person={{
                        name: 'Lin Lanying',
                        imageId: '1bX5QH6'
                    }}
                    detail={{ age: 75, gender: false, nation: 'China' }}
                />
                <li style={{ color: 'blue', fontWeight: 'bold' }}>
                    职业：<em>物理学家</em>
                </li>
                <li>薪资：$100,000</li>
                <li>
                    标签：{['物理', '科学家', '女性先驱', '中国'].map((tag, i) => (
                        <span key={i} style={{
                            background: '#eee',
                            borderRadius: 4,
                            padding: '2px 6px',
                            marginRight: 4,
                            fontSize: 12
                        }}>
                            {tag}
                        </span>
                    ))}
                </li>
                <li>兴趣：阅读、写作、旅行</li>
            </Box>
        </div>
    );
}