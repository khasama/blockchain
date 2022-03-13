$(document).ready(() => {
    
    let currentAccount = "";

    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
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
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        }
    ];
    const addressSmartContract = "0x59d03375844dB214170559F8830328027c03a385";

    const web3 = new Web3(window.ethereum);
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

    $("#payment").click(async() => {
        const amount = $("#amount").val();
        if(currentAccount !== ""){

            await contract_MM.methods.payment("1").send({
                from: currentAccount,
                value: amount*(10**18)
            })
            .on('transactionHash', function(transactionHash){
                alert("Thanh toán thành công!!!");
            })
            .on('error', function(error) {
                alert("Thanh toán mẹ thành công!!!");
                console.log(error);
            });

        } else {
            alert("Metamask not connect");
        }
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