import {useEffect, useState} from 'react';
import Item from "./components/Item";
import {ItemModel} from "./models";


function App() {
    const [data, setData] = useState<ItemModel>({
        name: "Root",
        children: []
    });

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            setData(JSON.parse(data));
        }
    });

    const saveData = (data: ItemModel | undefined) => {
        if (data === undefined) {
            data = {
                name: "Root",
                children: []
            }
        }
        localStorage.setItem("data", JSON.stringify(data));
        setData(data);
    }

    const [reload, setReload] = useState(0);

    return (
        <div>
            <Item data={data} onChange={(data) => {
                saveData(data);
                setReload(reload + 1);
            }}/>
        </div>
    )
}

export default App
