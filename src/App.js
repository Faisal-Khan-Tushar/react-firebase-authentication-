import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  //user er email ta change hoite pare email toh ekta string tai er default value hocche empty string.Same password er jonno o.
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
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
 console.log(email,password);
 e.preventDefault();
  }
  const handleEmailChange=e=>{
  setEmail(e.target.value)
  }
  const handlePasswordChange=e=>{
    setPassword(e.target.value);
  }
  return (
    <div className="mx-5">
{/* submit type er input thakle amra form er moddhe ekta event handler add korte pari sheta hocche onSubmit={} jeta kina submit button e click korle kichu ekta je ghotbe oita control korbe */}
<form onSubmit={handleRegistration}>
  <h3 className="text-primary">Please Register</h3>
  <div class="row mb-3">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <input onBlur={handleEmailChange} type="email" class="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" class="form-control" id="inputPassword3"/>
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="gridCheck1"/>
        <label class="form-check-label" for="gridCheck1">
          Example checkbox
        </label>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Sign in</button>
</form>
 <br /><br /><br />
      <div>------------------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google sign in</button>
    </div>
  );
}

export default App;
