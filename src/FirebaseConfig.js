import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjxFRRwDEvqPQsuA6ZuqrqCZ5wW9n4hLo",
  authDomain: "lpe-receitas.firebaseapp.com",
  projectId: "lpe-receitas",
  storageBucket: "lpe-receitas.appspot.com",
  messagingSenderId: "896382100095",
  appId: "1:896382100095:web:f32c5dadbd5df8eb85954a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);