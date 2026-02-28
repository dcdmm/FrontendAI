import { useRef, useState } from "react";

/*
<div ref={(node) => {
    console.log('Attached', node);

    return () => {
        console.log('Clean up', node)
    }
}}>

When the <div> DOM node is added to the screen, React will call your ref callback with the DOM node as the argument. When that <div> DOM node is removed, React will call your the cleanup function returned from the callback.
*/

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
            return;
        }
        const map = getMap();
        const node = map.get(cat);
        console.log("滚动到猫" + cat.id, ",对应DOM:", node);
        node?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function removeCat(cat: Cat) {
        console.log("*********************************删除猫" + cat.id + "*********************************");
        // 触发重新渲染,导致ref(内联)回调函数(每次渲染都是新函数)被调用,先执行前一个回调函数返回的清理函数,然后以DOM节点为参数调用新的回调函数 
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
                        // ref等于(内联)回调函数
                        ref={
                            (node) => {
                                if (!node) return;
                                const map = getMap();
                                map.set(cat, node);
                                console.log("添加node: ", node);
                                console.log("添加cat: ", cat);
                                console.log("map.set(cat, node) 执行了,Map大小:", map.size);
                                console.log("#######################################################");
                                // 返回清理函数
                                return () => {
                                    map.delete(cat);
                                    console.log("删除cat: ", cat);
                                    console.log("map.delete(cat) 执行了,Map大小:", map.size);
                                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                                };
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

