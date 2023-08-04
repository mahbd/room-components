import {Button, Stack} from '@chakra-ui/react'
import {AiOutlinePlus} from 'react-icons/ai';
import {FcCollapse} from 'react-icons/fc';
import {useState} from "react";

interface Data {
    name: string,
    children: null | Data[]
}

function App() {
    const [data] = useState<Data>({
        name: "Hello",
        children: [
            {name: "World", children: null},
            {name: "Nice", children: null},
            {name: "To", children: null},
        ]
    });

    return (
        <div>
            <Render data={data}/>
        </div>
    )
}

const Render = ({data}: { data: Data }) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div>
            <Stack direction="row" spacing={1} align="center">
                {data.children && <Button
                    marginLeft={0} onClick={() => setIsOpen(!isOpen)}>
                    <FcCollapse style={{transform: `rotate(${isOpen ? 0 : 180}deg)`}}/>
                </Button>}
                <Button marginRight={0}>
                    {data.name}
                </Button>
                <Button marginLeft={0}><AiOutlinePlus/></Button>
            </Stack>
            {isOpen && <div style={{paddingLeft: "20px", margin: "5px"}}>
                {data.children && data.children.map((child) => <Render data={child}/>)}
            </div>
            }
        </div>
    )
}

export default App
