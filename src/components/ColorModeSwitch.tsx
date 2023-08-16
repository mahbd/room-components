import {Button, Menu, MenuButton, MenuItem, MenuList, useColorMode} from "@chakra-ui/react";
import {AiOutlineDown} from "react-icons/ai";
import {useEffect, useState} from "react";

const ColorModeSwitch = () => {
    const mqListener = (e => {
        const themePreference = localStorage.getItem("themePreference");
        if (themePreference === "system" || themePreference === null) {
            if (e.matches) {
                setColorMode("dark");
            } else {
                setColorMode("light");
            }
        }
    });
    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mqListener);
        return () => darkThemeMq.removeListener(mqListener);
    }, []);

    const {setColorMode} = useColorMode();
    const [colorButtonText, setColorButtonText] = useState("System");

    const makeDark = () => {
        setColorMode("dark");
        localStorage.setItem("themePreference", "dark");
        setColorButtonText("Dark");
    }

    const makeLight = () => {
        setColorMode("light");
        localStorage.setItem("themePreference", "light");
        setColorButtonText("Light");
    }

    const makeSystem = () => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        if (darkThemeMq.matches) {
            setColorMode("dark");
        } else {
            setColorMode("light");
        }
        setColorButtonText("System");
        localStorage.setItem("themePreference", "system");
    }

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown/>}>
                {colorButtonText}
            </MenuButton>
            <MenuList>
                <MenuItem onClick={makeSystem}>System</MenuItem>
                <MenuItem onClick={makeLight}>Light</MenuItem>
                <MenuItem onClick={makeDark}>Dark</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default ColorModeSwitch;