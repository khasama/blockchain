$(document).ready(() => {
    
    let currentAccount = "";

    if(currentAccount !=""){
        $("#wallet").html(currentAccount);
    }

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "id",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_sender",
                    "type": "address"
                }
            ],
            "name": "sendDataBack",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "payment",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ];

    let r ;
    const addressSmartContract = "0x10EFF051c63d163c5BC6882E87822c06e8982c19";
    const OPTIONS = {
        defaultBlock: "latest",
        transactionConfirmationBlocks: 1,
        transactionBlockTimeout: 5
    };
    const web3 = new Web3(window.ethereum, null, OPTIONS);
    window.ethereum.enable();
    let contract_MM = new web3.eth.Contract(abi, addressSmartContract);
    

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
        });
    });

    $("#connMM").click(() => {
        if(checkMetamask()){
            connectMetamask().then((data) => {
                currentAccount = data;
                $("#wallet").html(currentAccount);
            }).catch((err) => {
                console.log(err);
            });
        }else{
            alert("Metamask not installed!!");
        }
    });

    ethereum.on('accountsChanged', (accounts) => {
        // currentAccount = accounts;
        // $("#wallet").html(currentAccount);
        connectMetamask().then((data) => {
            currentAccount = data;
            $("#wallet").html(currentAccount);
        }).catch((err) => {
            console.log(err);
        });
        
    });


    $("#payment").click(() => {
        const price = $("#price").text();
        $.ajax({
            method: "GET",
            url: `${window.location.origin}/cart/convert/${price}`,
        }).done((data) => {
            let c = true;
            if(currentAccount !== ""){
                console.log(data.toFixed(3));
                contract_MM.methods.payment("1").send({
                    from: currentAccount,
                    value: data.toFixed(3)*(10**18)
                })
                .on('confirmation', () => {
                    if(c){
                        $.ajax({
                            method: "POST",
                            url: `${window.location.origin}/cart/payment/`,
                            data: {total: price, wallet: currentAccount}
                        }).done((resutl) => {
                            alert(resutl);
                            window.location.href = "/";
                            c = false;
                        }).fail(() => {
                            alert("Error !!!!");
                            $("#loading").hide();
                        });
                        c = false;
                    }
                })
                .on('error', (error) => { 
                    console.log(error);
                    alert("Thanh toán mẹ thành công");
                    $("#loading").hide();
                });
                $("#loading").show();
            } else {
                alert("Metamask not connect");
                $("#loading").hide();
            }
        }).fail(() => {
            alert("Error !!!!");
            $("#loading").hide();
        });
        
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
