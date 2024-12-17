import {
  auth, onAuthStateChanged, signOut, sendEmailVerification, doc, db, getDoc, updateDoc, deleteDoc, collection,
  getDocs, addDoc, onSnapshot,serverTimestamp, query, orderBy,where
} from "./firebase.js";

let name = document.getElementById('name');
let email = document.getElementById('email');
let loader = document.getElementById('loader');
let main_content = document.getElementById('main-content');



onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    console.log("doc", docSnap.data());
    if (docSnap.data()) {
      // console.log("User logged in:", user);
      if (!window.location.pathname.endsWith("profile.html")) {
        window.location = "profile.html";
      }

      loader.style.display = "none";
      main_content.style.display = "block";


      if (email) email.innerHTML = user.email;
      //get the name from the docSnap.data() and assign it to the name input field
      if (name) name.value = docSnap.data().name;
    }
  }


  // if (!user.emailVerified) {
  //   sendEmailVerification(user)
  //     .then(() => {
  //       console.log("Email verification sent.");
  //     })
  //     .catch((error) => {
  //       console.error("Error sending email verification:", error);
  //     });
  // } else {
  //   console.log("Email already verified.");
  // }

  else {
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
//update profile
let updateProfile = async () => {
  let name = document.getElementById("name").value;
  console.log(name, auth.currentUser.uid);
  const userRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userRef, {
    name: name
  });
  console.log("profile Updated");
}
let updateBtn = document.getElementById('updateBtn');
if (updateBtn) {
  updateBtn.addEventListener('click', updateProfile);
}

// delete profile
// let deleteProfile = async () => {
//   await deleteDoc(doc(db, "users", auth.currentUser.uid));
//   console.log("profile deleted");
// }
// let deleteBtn = document.getElementById('deleteBtn');
// if (deleteBtn) {
//   deleteBtn.addEventListener('click', deleteProfile);
// }

let getAllUsers = async () => {
  const q = collection(db, "users");
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
getAllUsers();



//todo app
let addTodo = async () => {
  let todo = document.getElementById("todo");
  console.log(todo.value);
  const docRef = await addDoc(collection(db, "todos"), {
    value: todo.value,
    ServerTimestamp: serverTimestamp(),
    status:"pending"
  });
  console.log("Document written with ID: ", docRef.id);


}
let addTodoBtn = document.getElementById("addTodoBtn");
addTodoBtn.addEventListener('click', addTodo);



let getAllTodos = () => {
  const q = query(collection(db, "todos"),orderBy('ServerTimestamp','desc'),where("status","==","completed"),
  where("cities", "array-contains", "karachi")); //q means ref of collection
  let todoList=document.getElementById("todoList");
  //  unsubscribe is a firebase listener  ye jab chalta hai jb firebase ki collection mai kuch change ataa hai
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const todos = [];
    todoList.innerHTML="";
    querySnapshot.forEach((doc) => {
      //to get data from doc
      // console.log("timeStamp",doc.data().ServerTimestamp.toMillis());
    todoList.innerHTML += ` <li class="list-group-item">${doc.data().value}</li>`
      todos.push(doc.data());
      // todoList.innerHTML="";
    });
   
    // console.log("Todos",todos);
  });
}
getAllTodos();