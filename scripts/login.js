document.getElementById('login-btn').addEventListener('click',function(){
    const userInput = document.getElementById('input-user');
    const userName = userInput.value;
    const inputPass = document.getElementById('input-pass');
    const userPass = inputPass.value;

    if(userName === 'admin' && userPass === 'admin123'){
        alert("Login Success");
        window.location.assign("/home.html")
    }else{
        alert("Wrong user credentials");
        return;
    }
})