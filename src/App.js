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
  //amader register button e click marle page ta reload martese. Eita input type er submit button e default behaviour. Behaviour take stop korte chaile amader ke ekta parameter nite hobe function tate 'e' name ar pore likhte hobe je e.preventDefault(); tahole ar page ta reload marbe na. 
  const handleRegistration=e=>{
 console.log('ergistration will be added');
 e.preventDefault();
  }
  return (
    <div className="App">
{/* submit type er input thakle amra form er moddhe ekta event handler add korte pari sheta hocche onSubmit={} jeta kina submit button e click korle kichu ekta je ghotbe oita control korbe */}
  <form onSubmit={handleRegistration} >
    <h3>Please Register</h3>
    {/* htmlFor = kisher jonno ami label ta banacchi oita eitar vitore likha lage */}
    <label htmlFor="email">Email:</label>
    <input type="text" name="email" />
    <br/>
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="" />
    <br/>
    {/* submit er jonno input type amra submit nei */}
    <input type="submit" value="Register"  />
  </form>
 <br /><br /><br />
      <div>------------------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google sign in</button>
    </div>
  );
}

export default App;
