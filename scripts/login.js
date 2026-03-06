document.getElementById("login_btn").addEventListener("click", function () {
    const name = document.getElementById("login_input");
    const nameValue = name.value;
    console.log(nameValue);
    const pin = document.getElementById("login_password");
    const pinValue = pin.value;
    console.log(pinValue);

    if (nameValue === "admin" && pinValue === "12345678") {
        window.location.assign("home.html");
    } else {
        alert("Invalid username or password. Please try again.");
    }
});