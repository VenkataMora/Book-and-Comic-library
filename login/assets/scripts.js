var wrapper=document.querySelector(".wrapper");
var loginlink  = document.querySelector(".login-link");
var registerlink= document.querySelector(".register-link");
var buttonpopup=document.querySelector(".btn-popup");
var crossButton=document.querySelector(".icon-close")
var none = document.querySelector(".glassmorphism-centered");

none.style.display="initial";
registerlink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});
loginlink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
buttonpopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    none.style.display="none";

});
crossButton.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
    none.style.display="initial";
});

var userName=document.getElementById('username');
var password=document.getElementById('password');
var usernameError=document.getElementById("Username-error");
var passwordError=document.getElementById("Password-error");
var loginBtn=document.querySelector(".login-btn");
userName.addEventListener('keyup',()=>{
    if(userName.value===""){
        usernameError.style.display='block';
    }
    else{
        usernameError.style.display="none";
    }
})
password.addEventListener('keyup',()=>{
    if(password.value===""){
        passwordError.style.display='block';
    }else{
        passwordError.style.display="none";
    }
})

loginBtn.addEventListener('click', () => {
    if(userName.value===""){
        usernameError.style.display='block';
    }
    if(password.value===""){
        passwordError.style.display='block';
    } else {
        usernameError.style.display="none";
        passwordError.style.display="none";
        let cred = {
            userName: `${userName.value}`,
            passWord: `${password.value}`
        }
        console.log(cred);
    }
});

var RegisterUser=document.getElementById("Register-username");
var RegisterEmail=document.getElementById("Register-email");
var RegisterPassword=document.getElementById("Register-passowrd");
var userError=document.getElementById("RegisterUser-error");
var emailError=document.getElementById("RegisterEmail-error");
var passError=document.getElementById("RegisterPass-error");

const usererrors = document.getElementById("error");
RegisterUser.addEventListener('keyup',()=>{
    if(RegisterUser.value===""){
        userError.style.display='block';
    }
    else{
        userError.style.display="none";
    }
})
RegisterEmail.addEventListener('keyup',()=>{
    if(RegisterEmail.value===""){
        emailError.style.display='block';
    }
    else{
        emailError.style.display="none";
    }
})
RegisterPassword.addEventListener('keyup',()=>{
    if (RegisterPassword.value ==="") {
        passError.style.display = 'block';
    } else {
        passError.style.display = "none";
    }
});


var signbtn=document.querySelector(".signup-btn");
signbtn.addEventListener('click', () =>{
    if(RegisterUser.value===""){
        userError.style.display='block';
    }if(RegisterEmail.value===""){
        emailError.style.display='block';
    }if (RegisterPassword.value ==="") {
        passError.style.display = 'block';
    } else {
        userError.style.display="none";
        passError.style.display = "none";
        emailError.style.display="none";
    }
    var registerFormData={
        name:`${RegisterUser.value}`,
        email:`${RegisterEmail.value}`,
        password:`${RegisterPassword.value}`
    }
    console.log(registerFormData);
})
// verification
function isUserExists(email, password) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    return data.some(function(user){ 
        return (user.email === email && user.password === password);
    });
  }
  function isEmailExists(email) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
    return data.some(function(user){ 
        return user.email === email
    })
};

function saveUserData(email, username, password) {
    const data = JSON.parse(localStorage.getItem("userdata")) || [];
  
    // Check if the email already exists
    const emailExists = isEmailExists(email);
    if (emailExists) {
        usererrors.textContent = "Email id already exists";
        RegisterUser.value = "";
        RegisterPassword.value = "";
      return;
    }
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
      saveUserData(email, username, password);
      // Show sign up success message instead of opening a new page
    } else {

        usererrors.textContent = "* Please complete all fields";

    }
  });
  // Event listener for login
  loginBtn.addEventListener("click", function () {
    var email = userName.value;
    var pwd = password.value;
  
    if (isUserExists(email, pwd)) {
      const data = JSON.parse(localStorage.getItem("userdata"));
  
      data.forEach((element) => {
        if (element.email === email) {
          let user = element.username;
          sessionStorage.setItem("username", JSON.stringify(user));
        }
      });
  
      window.location.href = "newpage.html";
    } else {
      document.getElementById("ud-error").textContent =
        "* Invalid email or password";
    }
  });

  