// Selecting HTML elements
var wrapper = document.querySelector(".wrapper");
var loginlink = document.querySelector(".login-link");
var registerlink = document.querySelector(".register-link");
var buttonpopup = document.querySelector(".btn-popup");
var crossButton = document.querySelector(".icon-close")
var none = document.querySelector(".glassmorphism-centered");
var userName = document.getElementById('username');
var password = document.getElementById('password');
var usernameError = document.getElementById("Username-error");
var passwordError = document.getElementById("Password-error");
var loginBtn = document.querySelector(".login-btn");
var RegisterUser = document.getElementById("Register-username");
var RegisterEmail = document.getElementById("Register-email");
var RegisterPassword = document.getElementById("Register-passowrd");
var userError = document.getElementById("RegisterUser-error");
var emailError = document.getElementById("RegisterEmail-error");
var passError = document.getElementById("RegisterPass-error");
const usererrors = document.getElementById("error");
// Initial display setup
none.style.display = "initial";
// Event listeners for login and register links
registerlink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
loginlink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
// Event listeners for popup and close button
buttonpopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    none.style.display = "none";

});
crossButton.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    none.style.display = "initial";
});
// Event listeners for username and password input fields
userName.addEventListener('keyup', () => {
    if (userName.value === "") {
        usernameError.style.display = 'block';
    }
    else {
        usernameError.style.display = "none";
    }
})
password.addEventListener('keyup', () => {
    if (password.value === "") {
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = "none";
    }
})
// Event listener for login button
loginBtn.addEventListener('click', () => {
    if (userName.value === "") {
        usernameError.style.display = 'block';
    }
    if (password.value === "") {
        passwordError.style.display = 'block';
    } else {
        usernameError.style.display = "none";
        passwordError.style.display = "none";
    }
});


// Event listeners for registration input fields
RegisterUser.addEventListener('keyup', () => {
    if (RegisterUser.value === "") {
        userError.style.display = 'block';
    }
    else {
        userError.style.display = "none";
    }
})
RegisterEmail.addEventListener('keyup', () => {
    if (RegisterEmail.value === "") {
        emailError.style.display = 'block';
    }
    else {
        emailError.style.display = "none";
    }
})
RegisterPassword.addEventListener('keyup', () => {
    if (RegisterPassword.value === "") {
        passError.style.display = 'block';
    } else {
        passError.style.display = "none";
    }
});


var signbtn = document.querySelector(".signup-btn");
signbtn.addEventListener('click', () => {
    if (RegisterUser.value === "") {
        userError.style.display = 'block';
    } if (RegisterEmail.value === "") {
        emailError.style.display = 'block';
    } if (RegisterPassword.value === "") {
        passError.style.display = 'block';
    } else {
        userError.style.display = "none";
        passError.style.display = "none";
        emailError.style.display = "none";
    }
})
// verification
function UserExists(email, password) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    return data.some(function (user) {
        return (user.email === email && user.password === password);
    });
}
function emailExists(email) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    return data.some(function (user) {
        return user.email === email
    })
};
//Save users data
function SaveUsersData(email, username, password) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    // Check if the email already exists
    const emailExists = emailExists(email);
    if (emailExists) {
        usererrors.textContent = "Email id already exists";
        RegisterUser.value = "";
        RegisterPassword.value = "";
        return;
    } // Consider hashing the password before storing
    const newUserData = {
        email: email,
        username: username,
        password: password, // Note: Consider hashing the password before storing
    };
    data.push(newUserData);
    localStorage.setItem("userdata", JSON.stringify(data));
    usererrors.textContent = "Sign up successful!";
    // Reset the input fields after successful sign up
    RegisterUser.value = "";
    RegisterEmail.value = "";
    RegisterPassword.value = "";
}
signbtn.addEventListener("click", function () {
    var email = document.getElementById("Register-email").value;
    var username = document.getElementById("Register-username").value;
    var password = document.getElementById("Register-passowrd").value;
    if (email && username && password) {
        SaveUsersData(email, username, password);
    } else {
        usererrors.textContent = "* Please complete all fields";
    }
});
// Event listener for login
loginBtn.addEventListener("click", function () {
    var email = userName.value;
    var pwd = password.value;

    if (UserExists(email, pwd)) {
        const data = JSON.parse(localStorage.getItem("userdata"));

        data.forEach((element) => {
            if (element.email === email) {
                let user = element.username;
                sessionStorage.setItem("username", JSON.stringify(user));
            }
        });

        window.location.href = "firstPage.html";//linking new page 
    } else {
        document.getElementById("ud-error").textContent =
            "* Invalid email or password";
    }
});

