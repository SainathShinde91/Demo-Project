// Registration 
function validateForm() {
    let Username = document.getElementById("Username").value.trim();
    let Email = document.getElementById("Email").value.trim();
    let Password = document.getElementById("Password").value;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;
    let Gender = document.getElementById("Gender").value;
    let error = document.getElementById("error");
    let msg = document.getElementById("msg");

    // Reset previous messages
    error.innerText = "";
    msg.innerText = "";

    //  Validation 
    if (!Username || !Email || !Password || !ConfirmPassword) {
        error.innerText = "All fields are required";
        return false;
    }
    if (Username.length < 3) {
        error.innerText = "Username must be at least 3 characters";
        return false;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
        error.innerText = "Invalid email format";
        return false;
    }
    if (Password.length < 8) {
        error.innerText = "Password must be at least 8 characters";
        return false;
    }
    if (Password !== ConfirmPassword) {
        error.innerText = "Passwords do not match";
        return false;
    }

    const data = { username: Username, email: Email, password: Password, gender: Gender };

    //  Fetch registration 
    fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Registration failed");
        }
        return res.json();
    })
    .then(result => {
        msg.innerText = "Registration Successful!";
        console.log(result);
        showLogin();
        document.getElementById("registerForm").reset();
    })
    .catch(err => {
        error.innerText = err.message;
        console.error(err);
    });

    return false; // Prevent default form submit
}

// show/hide forms 
function showLogin() {
    document.getElementById("registration").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registration").style.display = "block";
}

// login 
function loginUser() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let error = document.getElementById("loginError");
    error.innerText = "";

    if (!email || !password) {
        error.innerText = "All fields are required";
        return false;
    }
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        error.innerText = "Please enter valid email";
        return false;
    }

    fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Invalid email or password");
        }
        return res.json();
    })
    .then(data => {
        localStorage.setItem("token", data.token);
        console.log("JWT:", data.token);
        alert("Login Successful");
        getUsers(); // Fetch protected API after login
        window.location.href = "menu.html";
    })
    .catch(err => {
        error.innerText = err.message;
        console.error(err);
    });

    return false;
}

//  Protected api 
function getUsers() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        return;
    }

    fetch("http://localhost:8080/api/users", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    })
    .then(async res => {
        if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Unauthorized or token expired");
        }
        return res.json();
    })
    .then(data => {
        console.log("Users data:", data);
        alert("Users fetched successfully! Check console.");
    })
    .catch(err => console.error(err.message));
}

//Logout
function logout() {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    showLogin();
}
