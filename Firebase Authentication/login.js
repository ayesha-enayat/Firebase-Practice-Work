
import {auth,signInWithEmailAndPassword} from './firebase.js'

let login = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        window.location='profile.html';
        console.log('login successful', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  }
  let loginBtn = document.getElementById('LoginBtn');
  loginBtn.addEventListener('click', login);