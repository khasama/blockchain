$(document).ready(() => {
    
    let currentAccount = "";

    $("#btnRegister").click(() => {
        const email = $("#rEmail").val();
        const username = $("#rUsername").val();
        const pass = $("#rPass").val();
        $.post("/register", {
            email: email,
            username: username,
            password: pass
        }, (data) => {
            console.log(data);
        })
    });

    $("#connMM").click(() => {
        if(checkMetamask()){
            connectMetamask().then((data) => {
                currentAccount = data;
            }).catch((err) => {
                console.log(err);
            });
        }else{
            alert("Metamask not installed!!");
        }
    });

    ethereum.on('accountsChanged', (accounts) => {
        currentAccount = accounts;
    });

});

function checkMetamask(){
    if (typeof window.ethereum !== 'undefined') {
        return true;
    } else {
        return false;
    }
}

async function connectMetamask(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
}