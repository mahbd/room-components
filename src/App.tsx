import Item from "./components/Item";
import NavBar from "./components/NavBar";


function App() {
    return (
        <div>
            <NavBar/>
            <Item key={1} itemId={1}/>
        </div>
    )
}

export default App
