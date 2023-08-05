import {useState} from 'react';
import Item from "./components/Item";
import {ItemModel} from "./models";



function App() {
    const [data, setData] = useState<ItemModel>({
        name: "Root",
        children: []
    });
    const [reload, setReload] = useState(0);

    return (
        <div>
            <Item data={data} onChange={(data) => {
                setData(data);
                setReload(reload + 1);
            }}/>
        </div>
    )
}

export default App
