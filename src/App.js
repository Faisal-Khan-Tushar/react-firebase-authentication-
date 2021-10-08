import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  const auth = getAuth();
  const handleGoogleSignIn=()=>{
    //ekhane boshalam karon ami jani amar button ta click korle amader authentication er kache jabe.
 signInWithPopup(auth,googleProvider)
 .then(result=>{
   const user=result.user;
   console.log(user);
 })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google sign in</button>
    </div>
  );
}

export default App;
