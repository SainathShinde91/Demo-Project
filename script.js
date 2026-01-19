function validation(){
    let Username = document.getElementById("username").value.trim();
    let Email = document.getElementById("Email").value.trim();
    let password = document.getElementById("password").value;
    let valid=true;

    document.getElementById("userError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("passError").innerHTML="";

    if(Username===""){
        document.getElementById("userError").innerHTML="username is required";
        valid= false;
    }
    let emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!Email.match(emailRegex)){
        document.getElementById("emailError").innerHTML="invalid email format";
        valid=false;
    }
    if(password.length !== 8){
        document.getElementById("passError").innerHTML="password must be at least 8 characters";
        valid=false;
    }
    return valid;
}
 