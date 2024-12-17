
import { auth, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber,provider,signInWithPopup,GoogleAuthProvider } from './firebase.js';

let signup = () => {
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user);

      // Optional: Redirect to profile or index page after signup
      window.location = "profile.html";
    })
    .catch((error) => {
      console.error("Error creating user:", error.code, error.message);
    });
};

let register = document.getElementById('signupBtn');
if (register) {
  register.addEventListener('click', signup);
}




//-------------------------PHONE AUTH---------------------------------------------------//
// auth.languageCode = 'it';
// let signInPhone = () => {
//   let phoneNumber = document.getElementById('phone').value;
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
//       const appVerifier = window.recaptchaVerifier;
//       console.log(`+${phoneNumber}`);
//       signInWithPhoneNumber(auth,`+${phoneNumber}`, appVerifier)
//         .then((confirmationResult) => {
//           console.log("confirmationResult",confirmationResult);
//           window.confirmationResult = confirmationResult;
//         }).catch((error) => {
//           console.log(error.code);
//         });
//     }
// let phoneBtn = document.getElementById('phoneBtn');
// if (phoneBtn) {
//   phoneBtn.addEventListener('click', signInPhone);
// }

let googleSignIn=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log("Signed in with Google:", user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorCode);
    
  });
}
let signInGoogle=document.getElementById('signInGoogle');
signInGoogle.addEventListener('click',googleSignIn)