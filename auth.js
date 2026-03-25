function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // 🔥 Simple login (replace later with real auth)
  if (user === "admin" && pass === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("appPage").style.display = "block";
  } else {
    alert("Invalid login");
  }
}