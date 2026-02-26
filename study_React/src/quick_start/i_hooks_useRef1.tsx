import { useRef, useState } from "react";

interface Cat {
    id: number;
    imageUrl: string;
}

function setupCatList() {
    const catCount = 10;
    const catList = new Array(catCount)
    for (let i = 0; i < catCount; i++) {
        let imageUrl = '';
        if (i < 5) {
            imageUrl = "https://placecats.com/neo/320/240";
        } else if (i < 8) {
            imageUrl = "https://placecats.com/millie/320/240";
        } else {
            imageUrl = "https://placecats.com/bella/320/240";
        }
        catList[i] = {
            id: i,
            imageUrl,
        };
    }
    return catList;
}

export default function MyApp() {
    const itemsRef = useRef<Map<Cat, HTMLLIElement> | null>(null);
    const [catList] = useState(setupCatList);

    function scrollToCat(cat: Cat) {
        const map = getMap();
        const node = map.get(cat);
        node?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function getMap() {
        if (!itemsRef.current) {
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    return (
        <>
            <nav>
                <button onClick={() => scrollToCat(catList[0])}>Neo</button>
                <button onClick={() => scrollToCat(catList[5])}>Millie</button>
                <button onClick={() => scrollToCat(catList[8])}>Bella</button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat) => (
                        <li
                            key={cat.id}
                            ref={(node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(cat, node);
                                } else {
                                    map.delete(cat);
                                }
                            }}
                        >
                            <img src={cat.imageUrl} alt={`Cat ${cat.id}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}


