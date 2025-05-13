import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCO0uh8b343HpOCZFidlQVbXaRkvkrUzhU",
  authDomain: "room-components-c66b8.firebaseapp.com",
  databaseURL: "https://room-components-c66b8-default-rtdb.firebaseio.com",
  projectId: "room-components-c66b8",
  storageBucket: "room-components-c66b8.appspot.com",
  messagingSenderId: "890750296374",
  appId: "1:890750296374:web:2919ef09f1111dbc8b5397",
};

export const app = initializeApp(firebaseConfig);
