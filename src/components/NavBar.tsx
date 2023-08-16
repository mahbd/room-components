import {Button, Heading, HStack} from "@chakra-ui/react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import SearchInput from "./SearchInput";

interface Props {
    app: any
}

const NavBar = ({app}: Props) => {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    const logout = () => {
        auth.signOut();
    }

    return (
        <div>
            <HStack justifyContent={'space-between'}>
                <Heading as={'h1'} size={'lg'}>Components</Heading>
                <HStack>
                    <SearchInput/>
                    {user && <Button marginRight={2} onClick={logout}>Logout</Button>}
                    {!user && <Button marginRight={2} onClick={signInWithGoogle}>
                        Login/Sign Up
                    </Button>}
                </HStack>
            </HStack>
        </div>
    );
};

export default NavBar;