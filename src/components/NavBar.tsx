import {Button, Heading, HStack} from "@chakra-ui/react";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB_foO-Xj7Y0dVOCDzbKOxBBjTPcCAm39E",
    authDomain: "room-components.firebaseapp.com",
    projectId: "room-components",
    storageBucket: "room-components.appspot.com",
    messagingSenderId: "891526826344",
    appId: "1:891526826344:web:59a95dae372d2f2b2c6edd"
};

const NavBar = () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
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
                {user && <Button marginRight={2} onClick={logout}>Logout</Button>}
                {!user && <Button marginRight={2} onClick={signInWithGoogle}>
                    Login/Sign Up
                </Button>}
            </HStack>
        </div>
    );
};

export default NavBar;