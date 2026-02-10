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


export default function Profile() {
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
            <Avatar
                size={80}
                person={{
                    name: 'Aklilu Lemma',
                    imageId: 'OKS67lh'
                }}
                detail={{ age: 70, gender: true, nation: 'Ethiopia' }}
            />
            <Avatar
                size={50}
                person={{
                    name: 'Lin Lanying',
                    imageId: '1bX5QH6'
                }}
                detail={{ age: 75, gender: false, nation: 'China' }}
            />
        </div>
    );
}