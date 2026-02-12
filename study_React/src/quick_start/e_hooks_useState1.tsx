// State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.

import { useState } from 'react';


function Form() {
    const [person, setPerson] = useState({
        name: 'Niki de Saint Phalle',
        artwork: {
            title: 'Blue Nana',
            city: 'Hamburg',
            image: 'https://i.imgur.com/Sd1AgUOm.jpg',
        }
    });

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            name: e.target.value
        });
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                title: e.target.value
            }
        });
    }

    function handleCityChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                city: e.target.value
            }
        });
    }

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            artwork: {
                ...person.artwork,
                image: e.target.value
            }
        });
    }

    return (
        <>
            <label>
                Name:
                <input
                    value={person.name}
                    onChange={handleNameChange}
                />
            </label>
            <label>
                Title:
                <input
                    value={person.artwork.title}
                    onChange={handleTitleChange}
                />
            </label>
            <label>
                City:
                <input
                    value={person.artwork.city}
                    onChange={handleCityChange}
                />
            </label>
            <label>
                Image:
                <input
                    value={person.artwork.image}
                    onChange={handleImageChange}
                />
            </label>
            <p>
                <i>{person.artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {person.artwork.city})
            </p>
            <img
                src={person.artwork.image}
                alt={person.artwork.title}
            />
        </>
    );
}



export default function MyApp() {
    const [person, setPerson] = useState({
        firstName: 'dc',
        lastName: 'dmm',
        email: 'bhepworth@sculpture.com'
    });

    function handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person, // 浅拷贝
            firstName: e.target.value
        } // 对象合并(后面的属性会覆盖前面的同名属性)
        );
    }

    function handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            lastName: e.target.value
        });
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPerson({
            ...person,
            email: e.target.value
        });
    }

    return (
        <>
            <h1>更新对象</h1>
            <label>
                First name:
                <input
                    value={person.firstName}
                    onChange={handleFirstNameChange}
                />
            </label>
            <label>
                Last name:
                <input
                    value={person.lastName}
                    onChange={handleLastNameChange}
                />
            </label>
            <label>
                Email:
                <input
                    value={person.email}
                    onChange={handleEmailChange}
                />
            </label>
            <p>
                {person.firstName}{' '}
                {person.lastName}{' '}
                ({person.email})
            </p>

            <h1>更新嵌套对象</h1>
            <Form />
        </>
    );
}