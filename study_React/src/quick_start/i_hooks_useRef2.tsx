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
    const [catList, setCatList] = useState(setupCatList);

    function scrollToCat(cat: Cat | undefined) {
        if (!cat) {
            console.log("【滚动】这只猫已经不存在了");
            return;
        }
        const map = getMap();
        const node = map.get(cat);
        console.log("【滚动】猫" + cat.id, "对应DOM:", node, "Map大小:", map.size);
        node?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function removeCat(cat: Cat) {
        console.log("*********************************删除猫" + cat.id + "*********************************");
        setCatList(catList.filter(c => c.id !== cat.id));
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
                <button onClick={() => scrollToCat(catList[0])}>狸花猫</button>
                <button onClick={() => scrollToCat(catList[5])}>橘猫</button>
                <button onClick={() => scrollToCat(catList[8])}>小猫</button>
            </nav>
            <div>
                <ul>{catList.map((cat) => (
                    <li
                        key={cat.id}
                        ref={
                            (node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(cat, node);
                                    console.log("添加node: ", node);
                                    console.log("添加cat: ", cat)
                                    console.log("map.set(cat, node) 执行了,Map大小:", map.size);
                                    console.log("######################################################") 
                                } else {
                                    map.delete(cat);
                                    console.log("删除cat: ", cat);
                                    console.log("map.delete(cat) 执行了,Map大小:", map.size);
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                                }
                            }
                        }
                    >
                        <img src={cat.imageUrl} alt={`Cat ${cat.id}`} />
                        <button onClick={() => removeCat(cat)}>删除猫{cat.id}</button>
                    </li>
                ))}
                </ul>
            </div>
        </>
    );
}

