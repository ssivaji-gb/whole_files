
  let loginPage = document.querySelector(".login-container");
  let homePage = document.querySelector(".home-container");
  let form = document.querySelector("form");

  // PAGE LOAD CHECK
  window.onload = () => {
    let status = JSON.parse(localStorage.getItem("loginStatus"));

    if (status === true) {
      loginPage.style.display = "none";
      homePage.style.display = "block";
    } else {
      loginPage.style.display = "block";
      homePage.style.display = "none";
    }
  };

  // LOGIN SUBMIT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // simple login (no validation)
    localStorage.setItem("loginStatus", true);

    loginPage.style.display = "none";
    homePage.style.display = "block";
  });

