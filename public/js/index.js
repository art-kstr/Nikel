const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();


//Fazer Login

document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-input").value;
    const senha  = document.getElementById("password-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getaccount(email);

    if(!account){
        alert("Opss... Verifique o usuário e a senha.");
        return;
    }

    if(account){
        if(account.password !== senha){
            alert("Opss... Verifique o usuário e a senha.");
            return;
        }

        saveSession(email, checkSession);

        window.location.href= "home.html";
    }



    
    
})



//Criar conta


document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();
    
    const email = document.getElementById("email-create-input").value;
    const senha  = document.getElementById("password-create-input").value;

    if(email.length < 5) {
        alert("Preencha o campo com um e-mail válido.");
        return;
    }

    if(senha.length < 4) {
        alert("Use uma senha com no mínimo 4 digitos.");
        return;
    }

    saveAccount({
        login: email,
        password: senha,
        transactions: []
    });

    myModal.hide();

    alert("Conta criada com Sucesso!");
});


function saveAccount(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}


function getaccount(key){
    const account = localStorage.getItem(key);

    if (account){
        return JSON.parse(account);
    }
}


function saveSession(data, checkSession){
    if(checkSession){
        localStorage.setItem("session", data);
    }

    sessionStorage.setItem("logged", data);
}

function checkLogged (){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged){
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}