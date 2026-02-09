import './a_base.css';

// React component names must always start with a capital letter, while HTML tags must be lowercase.
function MyButton() {
	// JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper:
	return (
		<>
			<h1>About</h1>
			<button>I'm a button</button>
			<p>Hello there.<br />How do you do?</p>
		</>
	);
}

const user = {
	name: '海蒂·拉玛',
	imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
	imageSize: 90,
};

export default function MyApp() {
	// In React, you specify a CSS class with className. It works the same way as the HTML class attribute:
	return (
		<div>
			<h1>Welcome to my app</h1>
			<MyButton />

			<h1>{user.name}</h1>
			<img
				className="avatar"
				src={user.imageUrl}
				alt={user.name + "的照片"}
				style={{
					width: user.imageSize,
					height: user.imageSize
				}}
			/>
		</div>
	);
}

