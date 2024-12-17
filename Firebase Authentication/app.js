import { auth, onAuthStateChanged, signOut, sendEmailVerification } from "./firebase.js";

let name = document.getElementById('name');
let email = document.getElementById('email');
let loader = document.getElementById('loader');
let main_content = document.getElementById('main-content');
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);

    if (!user.emailVerified) {
      sendEmailVerification(user)
        .then(() => {
          console.log("Email verification sent.");
        })
        .catch((error) => {
          console.error("Error sending email verification:", error);
        });
    } else {
      console.log("Email already verified.");
    }

    if (!window.location.pathname.endsWith("profile.html")) {
      window.location = "profile.html";
    }

    loader.style.display = "none";
    main_content.style.display = "block";

    if (email) email.innerHTML = user.email;
    if (name) name.innerHTML = user.email.slice(0, user.email.indexOf("@"));
  } else {
    console.log("User not logged in.");

    if (!window.location.pathname.endsWith("index.html") &&
        !window.location.pathname.endsWith("register.html")) {
      window.location = "index.html";
    }
  }
});


let logout = () => {
  signOut(auth)
    .then(() => {
      console.log("Logged out");
      window.location = "index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

let logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

