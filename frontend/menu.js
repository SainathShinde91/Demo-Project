document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username") || "User";

    //  Login check 
    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    // Show username
    document.getElementById("userName").innerText = username;

    //  Logout 
    document.getElementById("logoutBtn").addEventListener("click", function() {
        localStorage.clear();
        alert("Logged out successfully");
        window.location.href = "login.html";
    });

    //  Fetch menu items 
    fetch("http://localhost:8080/api/menu", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"   // fixed typo
        }
    })
    .then(res => {
        if (!res.ok) {
            // Show exact error for debugging
            return res.text().then(text => { throw new Error("HTTP Error " + res.status + ": " + text) });
        }
        return res.json();
    })
    .then(data => {
        const menuList = document.getElementById("menuList");
        menuList.innerHTML = "";

        data.forEach(item => {
            const li = document.createElement("li");
            li.innerText =
                `DOB: ${item.dob} | ${item.city}, ${item.state}, ${item.country} | Pincode: ${item.pincode}`;
            menuList.appendChild(li);
        });
    })
    .catch(err => console.error("Error fetching menu:", err.message));

    //  Add new menu 
    document.getElementById("menuForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const menuData = {
            dob: document.getElementById("dob").value,
            country: document.getElementById("country").value,
            state: document.getElementById("state").value,
            city: document.getElementById("city").value,
            pincode: document.getElementById("pincode").value
        };

        fetch("http://localhost:8080/api/menu", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(menuData)
        })
        .then(res => {
            if (!res.ok) {
                return res.text().then(text => { throw new Error("HTTP Error " + res.status + ": " + text) });
            }
            return res.json();
        })
        .then(() => {
            alert("Menu added successfully!");
            location.reload(); // refresh menu list
        })
        .catch(err => alert("Error adding menu: " + err.message));
    });
});
