import {Button, Stack} from '@chakra-ui/react'
import {AiOutlinePlus} from 'react-icons/ai';
import {FcCollapse} from 'react-icons/fc';
import {useState} from "react";

interface Data {
    name: string,
    children: Data[]
}

function App() {
    const [data, setData] = useState<Data>({
        name: "Hello",
        children: [
            {name: "World", children: []},
            {name: "Nice", children: []},
            {name: "To", children: []},
        ]
    });
    const [reload, setReload] = useState(0);

    return (
        <div>
            <Render data={data} onChange={(data) => {
                setData(data);
                setReload(reload + 1);
            }}/>
        </div>
    )
}

const Render = ({data, onChange, index}: { data: Data, onChange, index? }) => {
    const [isOpen, setIsOpen] = useState(true);

    const changeHere = (newData, index) => {
        data.children[index] = newData;
        if (index === undefined) {
            onChange(data, index);
        } else {
            onChange(data);
        }
    }

    return (
        <div>
            <Stack direction="row" spacing={1} align="center">
                {data.children.length > 0 && <Button
                  marginLeft={0} onClick={() => setIsOpen(!isOpen)}>
                  <FcCollapse style={{transform: `rotate(${isOpen ? 0 : 180}deg)`}}/>
                </Button>}
                <Button
                    onClick={() => {
                        onChange({...data, name: "Changed"}, index);
                    }}
                    marginRight={0}>
                    {data.name}
                </Button>
                <Button marginLeft={0}><AiOutlinePlus/></Button>
            </Stack>
            {isOpen && <div style={{paddingLeft: "20px", margin: "5px"}}>
                {data.children.length > 0 && data.children.map((child, index) =>
                    <Render key={index} data={child} index={index} onChange={changeHere}/>)}
            </div>
            }
        </div>
    )
}

export default App
