import { createContext, useContext, type ReactNode } from 'react';

// 创建Context(默认值为1)
const LevelContext = createContext(1);

function Heading({ children }: { children: ReactNode }) {
    // useContext tells React that the Heading component wants to read the LevelContext.
    const level = useContext(LevelContext);
    switch (level) {
        case 1:
            return <h1>{children}</h1>;
        case 2:
            return <h2>{children}</h2>;
        case 3:
            return <h3>{children}</h3>;
        case 4:
            return <h4>{children}</h4>;
        case 5:
            return <h5>{children}</h5>;
        case 6:
            return <h6>{children}</h6>;
        default:
            throw Error('Unknown level: ' + level);
    }
}

function Section({ children }: { children: ReactNode }) {
    const level = useContext(LevelContext);
    return (
        // This tells React: “if any component inside this <Section> asks for LevelContext, give them this level.” The component will use the value of the nearest <LevelContext> in the UI tree above it.
        <section className="section">
            {/* Since context lets you read information from a component above, each Section could read the level from the Section above, and pass level + 1 down automatically. Here is how you could do it: */}
            <LevelContext value={level + 1}>
                {children}
            </LevelContext>
        </section>
    );
}


export default function MyApp() {
    return (
        <Section>
            <Heading>Title</Heading>
            <Section>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Heading>Heading</Heading>
                <Section>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Heading>Sub-heading</Heading>
                    <Section>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                        <Heading>Sub-sub-heading</Heading>
                    </Section>
                </Section>
            </Section>
        </Section>
    );
}