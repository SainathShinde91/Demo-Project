

 function validateForm() {
   let Username = document.getElementById("Username").value.trim();
   let Email = document.getElementById("Email").value.trim();
   let Password = document.getElementById("Password").value;
   let ConfirmPassword = document.getElementById("ConfirmPassword").value;
   let error = document.getElementById("error");
   let msg = document.getElementById("msg");

   // Reset previous error
   error.innerText = "";
   msg.innerText="";

   // 1️⃣ Check if any field is empty
   if (Username === "" || Email === "" || Password === "" || ConfirmPassword === "") {
     error.innerText = "All fields are required";
     return false;
   }

   // 2️⃣ Username length check
   if (Username.length < 3) {
     error.innerText= "Username must be at least 3 characters";
     return false;
   }

   // 3️⃣ Email format check
   let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailPattern.test(Email)) {
     error.innerText = "Invalid email format";
     return false;
   }

  // 4️⃣ Password length check
  if (Password.length < 8) {
    error.innerText = "Password must be at least 8 characters";
    return false;
  }

  // 5️⃣ Password match check
 if (Password !== ConfirmPassword) {
   error.innerHTML = "Passwords do not match";
    return false;
 }
 const data = {
        username: Username,
        email: Email,
        password: Password,
        gender: document.getElementById("Gender").value
    };

    // 🔹 Fetch call
    fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        msg.innerText= "Registration Successful ✅";
        console.log(result);
         showLogin();
        // Form reset
        document.getElementById("registerForm").reset();
    })
    .catch(err => {
        error.innerText = "Registration Failed ❌";
        console.error(err);
    });

    return false; // Form submit block, because we handled it via fetch
}
function showLogin() {
    document.getElementById("registration").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registration").style.display = "block";
}
function loginUser() {

  let email = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value.trim();
  let error = document.getElementById("loginError");

   if (!error) return false; 

  // clear previous error
  error.innerText = "";

  // 1️⃣ Empty check
  if (email === "" || password === "") {
    error.innerText = "All fields are required";
    return false;
  }

  // 2️⃣ Email format check
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    error.innerText = "Please enter valid email";
    return false;
  }

  // ✅ validation passed → backend call
  fetch("http://localhost:8080/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => {
    if (response.ok) return response.json();
    else throw new Error("Invalid email or password");
  })
  .then(data => {
    alert("Login Successful");
    console.log(data);
    // window.location.href = "dashboard.html";
  })
  .catch(err => {
    error.innerText = err.message;
  });

  return false;
}



