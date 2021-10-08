import './App.css';
import { getAuth, signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import initializeAuthentication from './Firebase/firebase.init';
import { useState } from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();

function App() {
  //user er email ta change hoite pare email toh ekta string tai er default value hocche empty string.Same password er jonno o.
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  //karon by default ami toh ar login korbo na ba check box tate tick dewa thakbe na. Check box tate tik dewa na thakar mane hocche oita false .
  const [isLogin,setIsLogin]=useState(false);
  const auth = getAuth();
  const handleGoogleSignIn=()=>{
    //ekhane boshalam karon ami jani amar button ta click korle amader authentication er kache jabe.
 signInWithPopup(auth,googleProvider)
 .then(result=>{
   const user=result.user;
  
 })
  }
  //amader register button e click marle page ta reload martese. Eita input type er submit button e default behaviour. Behaviour take stop korte chaile amader ke ekta parameter nite hobe function tate 'e' name ar pore likhte hobe je e.preventDefault(); tahole ar page ta reload marbe na. 
  const handleRegistration=e=>{
    e.preventDefault();
 console.log(email,password);
 if(password.length <6){
  setError('Password must be at least 6 characters long.')
  return;
 }
 //regular expression diye ekhane ami password ke test kortesi. Eita true hoile toh amra kichu korbo na. Jodi eita false hoy tahole amra error throw korbo. Tai ami shamne ekta ! sign diye dilam.
 if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
  setError('Password Must contain 2 upper case letter')
  return;
 }
 if(isLogin){
   processLogin(email,password);
 }
 else{
   registerNewUser(email,password);
 }


  }
  const processLogin=(email,password)=>{
signInWithEmailAndPassword(auth,email,password)
.then(result=>{
  const user=result.user;
  console.log(user);
  setError('');
})
.catch(error=>{
  setError(error.message)
})
  }
  const handleEmailChange=e=>{
  setEmail(e.target.value)
  }
  const handlePasswordChange=e=>{
    setPassword(e.target.value);
  }
  const toggleLogin=e=>{
    setIsLogin(e.target.checked);
  }
  const registerNewUser =(email,password)=>{
    //handleResiteration er vitore createuserWithEmailAndPassword use korlam karon hocche register e click korlei kebol amra ekjon user ke create korbo. Otherwise toh korar kono karon nai.
 createUserWithEmailAndPassword(auth,email,password)
 .then(result=>{
   const user=result.user;
   console.log(user);
   //ar jodi error na pay taile amra error take empty string kore dibo. Mane hocche je kono error nai.
   setError('');
 })
 //email create korte giye jodi firebase theke amra kono erro khai tahole eita catch korbe shei error take.
 .catch(error=>{
   //error.massage name firebase e ekta error ache amra oita e dekhabo arki eita boltesi.
   setError(error.message);
 })
  }
  return (
    <div className="mx-5">
{/* submit type er input thakle amra form er moddhe ekta event handler add korte pari sheta hocche onSubmit={} jeta kina submit button e click korle kichu ekta je ghotbe oita control korbe */}
<form onSubmit={handleRegistration}>
  <h3 className="text-primary">Please {isLogin? ' log in' : 'Register'}</h3>
  <div className="row mb-3">
    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required/>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-sm-10 offset-sm-2">
      <div className="form-check">
        <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1"/>
        <label className="form-check-label" htmlFor="gridCheck1">
          Already Registered?
        </label>
      </div>
    </div>
  </div> 
  <div className="row mb-3 text-danger">
{error}
  </div>
  <button type="submit" className="btn btn-primary">{isLogin? 'Log in':'Register'}</button>
</form>
 <br /><br /><br />
      <div>------------------------------------</div>
      <br /><br /><br />
      <button onClick={handleGoogleSignIn}>Google sign in</button>
    </div>
  );
}

export default App;
