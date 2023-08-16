import Item from "./components/Item";
import NavBar from "./components/NavBar";
import {useEffect} from "react";
import useItemStore from "./store/ItemStore";


function App() {
    useEffect(() => {
        document.title = "Todo App";
        useItemStore.getState().loadData();
    }, []);

    return (
        <div>
            <NavBar/>
            <Item key={1} itemId={1}/>
        </div>
    )
}

export default App
