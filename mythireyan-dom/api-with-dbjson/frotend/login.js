let para;
let adminbacked = document.querySelector(".adminbacked");
let userbacded=document.querySelector(".userbacded")
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.querySelector(".username").value.trim();
  let email = document.querySelector(".email").value.trim();
  let role = document.querySelector(".role").value;
  let password = document.querySelector(".password").value.trim();

  if (!username || !email || !password || !role) {
    return alert("Enter all input");
  }
  get(username, email, password, role);
});

//get-function
function get(username, email, password, role) {
  1;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/users");
  xhr.onreadystatechange = function () {
    console.log("sdfghjk");

    if (xhr.readyState == 4 && xhr.status == 200) {
      let obj = xhr.response;
      para = JSON.parse(obj);
      let find = para.find((i) => i.email == email);
      if (find == undefined) {
        post(username, email, password, role);
      } else {
        alert("dei athu munnadiye potuta da lose");
        if (
          role === "admin" &&
          password === "sivaji@143" &&
          email == "sivaji@gmail.com"
        ) {
          adminDashboard(username);
        }
        if (role === "user") {
          userDashboard(username);
        }
      }
      console.log("sivaj000i", para);
    }
  };

  xhr.send();
}

//POST
function post(username, email, password, role) {
  let pxhr = new XMLHttpRequest();
  pxhr.open("POST", "http://localhost:3000/users");
  pxhr.setRequestHeader("Content-Type", "application/json");

  pxhr.onload = () => {
    if (pxhr.status === 201) {
      alert("User Registered Successfully");
      // ADMIN CHECK HERE
      if (
        role === "admin" &&
        password === "sivaji@143" &&
        email == "sivaji@gmail.com"
      ) {
        adminDashboard(username);
      }

      if (role === "user") {
        userDashboard(username);
      }
    }
  };

  let dei = { username, email, password, role };
  pxhr.send(JSON.stringify(dei));
}

//admin-dashboard---UI
function adminDashboard(username) {
  let admin = document.querySelector(".admin-dashboard");
  let login = document.querySelector(".body");

  login.style.display = "none";
  admin.style.display = "flex";

 

  let si = document.querySelector(".user-detail");
  let li = document.createElement("li");

  let use = para.filter((e) => e.role == "user");
  document.querySelector("h1").innerHTML =
    "Admin Dashboard" + " " + "Welcome " + username;
  document.querySelector(".users-count").innerHTML = use.length + "users";
  li.innerHTML = use
    .map((i) => {
      return `<h3 class="usernamead">${i.username}</h3>
          <h4 class="email">${i.email}</h4>
          <h4 class="role">${i.role}</h4>
          <h4 class="Password">${i.password}</h4>`;
    })
    .join("");
  si.append(li);
  console.log(li);
  console.log(use);

   // back
  adminbacked.addEventListener("click", () => {
    back("adminDashboard"); 
  });
}

//user Dashboard

function userDashboard(username) {
  let named = username.toUpperCase();

  let login = document.querySelector(".body");
  let userDashboard = document.querySelector(".userDashboard");
  login.style.display = "none";
  userDashboard.style.display = "flex";

  // back
  userbacded.addEventListener("click", () => {
    back("userDashboard");
  });

  document.querySelector(".userDashboard-h1").innerHTML = `WELCOME ${named}!`;
  console.log("varula da");
}

function back(whatboard) {
  console.log("bak");

  let admin = document.querySelector(".admin-dashboard");
  let userDashboard = document.querySelector(".userDashboard");
  let login = document.querySelector(".body");

  if (whatboard == "userDashboard") {
    console.log("use");
    
    login.style.display = "flex";
    userDashboard.style.display = "none";
  } else if (whatboard == "adminDashboard") {
    console.log("admin");
    
    login.style.display = "flex";
    admin.style.display = "none";
  }
}
