import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup, signOut } from
  "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from
  "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBjxFRRwDEvqPQsuA6ZuqrqCZ5wW9n4hLo",
  authDomain: "lpe-receitas.firebaseapp.com",
  projectId: "lpe-receitas",
  storageBucket: "lpe-receitas.appspot.com",
  messagingSenderId: "896382100095",
  appId: "1:896382100095:web:f32c5dadbd5df8eb85954a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


const githubProvider = new GithubAuthProvider();

githubProvider.setCustomParameters({
  prompt: 'select_account'  // Isso força o usuário a escolher uma conta ao fazer login
});

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signInWithGithub, logout }
