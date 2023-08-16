import Item from "./components/Item";
import NavBar from "./components/NavBar";
import {useEffect} from "react";
import useItemStore, {ItemModel} from "./store/ItemStore";
import {useAuthState} from "react-firebase-hooks/auth";
import {app} from "./store/firebaseLocal";
import {getAuth} from "firebase/auth";

function App() {
    const data = useItemStore(state => state?.items[1]) as ItemModel;
    const [user] = useAuthState(getAuth(app));
    useEffect(() => {
        document.title = "Todo App";
        useItemStore.getState().loadData();
    }, [user]);

    return (
        data && <div>
            <NavBar/>
            <Item key={1} itemId={1}/>
        </div>
    )
}

export default App
