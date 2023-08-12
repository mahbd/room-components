import {useEffect, useState} from 'react';
import Item from "./components/Item";
import {ItemModel} from "./models";
import NavBar from "./components/NavBar";
import {getDatabase, onValue, ref, set} from "firebase/database";
import {initializeApp} from "firebase/app";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_foO-Xj7Y0dVOCDzbKOxBBjTPcCAm39E",
    authDomain: "room-components.firebaseapp.com",
    projectId: "room-components",
    storageBucket: "room-components.appspot.com",
    messagingSenderId: "891526826344",
    appId: "1:891526826344:web:59a95dae372d2f2b2c6edd",
    databaseURL: "https://room-components-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const isEquivalent = (a: ItemModel, b: ItemModel) => {
    if (a.name !== b.name) {
        return false;
    }
    if (a.children === undefined && b.children === undefined) {
        return true;
    }
    if (a.children === undefined || b.children === undefined) {
        return false;
    }
    if (a.children.length !== b.children.length) {
        return false;
    }
    for (let i = 0; i < a.children.length; i++) {
        if (!isEquivalent(a.children[i], b.children[i])) {
            return false;
        }
    }
    return true;
}


function App() {
    const [data, setData] = useState<ItemModel>({
        name: "Root",
        children: []
    });

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const userId = user ? user.uid : "default";
    const userRef = ref(database, 'data/' + userId);
    console.log(userId);

    const writeData = (data: ItemModel | undefined) => {
        if (data === undefined) {
            data = {
                name: "Root",
                children: []
            }
        }
        set(userRef, data);
    }

    useEffect(() => {
        onValue(userRef, (snapshot) => {
            const newData = snapshot.val();
            if (data && !isEquivalent(newData, data)) {
                setData(newData);
            }
        });
    }, [userRef]);

    const [reload, setReload] = useState(0);

    return (
        <div>
            <NavBar app={app}/>
            <Item data={data} onChange={(data) => {
                writeData(data);
                setReload(reload + 1);
            }}/>
        </div>
    )
}

export default App
