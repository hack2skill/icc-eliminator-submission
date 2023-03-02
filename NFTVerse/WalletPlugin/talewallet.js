WALLET_NAME = "ICC Wallet"
NFTVERSE_DEV_API = "https://us-dev.api.onnftverse.com/v1"
BLOCKCHAIN_SERVICE = "https://bs-dev.api.onnftverse.com/v1"
app_token = 123

function loginUI() {
    document.getElementById('wallet_div').innerHTML = `<div class="flex flex-col gap-10">
        <div class="imgcontainer">
        <img src="./images/talewallet.png" alt="Avatar" class="avatar">
        </div>
        <div class="flex flex-col items-center">
            <div class = "font-bold text-2xl text-tale">Welcome to `+WALLET_NAME+`</div>
            <div class = "font-semibold text-lg">Veirfy your email address</div>
        </div>
        <div class="flex flex-col gap-20 items-start" id="email_address_input">
                    <div class="flex shadow-1 w-full  email-input-container">
                    <span><img src="./images/mail.svg" class=""/></span>
                    <input type="text" class= "border-none outline-none" placeholder="Enter your email" name="uname" id="otp_email_address" required>
                    </div>
                    <div class="w-full">
                    <span id="sb_rb_error"></span>
                    <button class="btn primary-btn" type="submit" id="sbt_email_otp_btn">Continue</button>
        </div>
        
        <div class="text-center w-full">You will get an OTP on this email</div>
        </div>`;
    var link = document.getElementById('sbt_email_otp_btn');
    // onClick's logic below:
    if(link) {
        link.addEventListener('click', function () {
            sendOTP(document.getElementById('otp_email_address').value);
        });
    }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sendOTP(email) {
    if(!validateEmail(email)){
        document.getElementById("sb_rb_error").innerHTML="<span>Email id is expected</span>"
    } else{
        let config = {

            method:"post",
            headers:{
                "X-App-Token": app_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email
            })
        }

        fetch(`${NFTVERSE_DEV_API}/otp/send?type=login`,config).then(
            (res) =>{
                document.getElementById('email_address_input').innerHTML = `<div class="flex shadow-1 w-full  email-input-container" id="otp-container">
                    <input type="text" class = "border-none outline-none mt-10 " placeholder="Enter OTP received on your mail" name="uname" id="input_otp" required>
            </div> <span id="sb_rb_error" style="color:red"></span>
                    <button type="submit"  id="submit_otp_btn" class="btn primary-btn mt-10">Submit Otp</button>
        <div>In future you will be able to access your account using this email and OTP</div>
                </div>`;
                document.getElementById("sb_rb_error").innerHTML=""
                const submitOtpBtn = document.getElementById("submit_otp_btn");
                submitOtpBtn.addEventListener('click', function () {
                    verifyOtp(email, document.getElementById('input_otp').value);
                });
            }
        )
    }
}

function verifyOtp(email,otp){
    console.log(otp)
    if(!otp){
        document.getElementById("sb_rb_error").innerHTML="<span>Otp is expected</span>"
    }else{
        let config = {

            method:"post",
            headers:{
                "X-App-Token": app_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                otp:otp
            })
        }
        fetch(`${NFTVERSE_DEV_API}/otp/verify?type=login`,config)
            .then((res) =>  res.json())
            .then(res => {
                getOrSetupWallet(res.userId, res.authToken);
            })
            .catch(rej => document.getElementById("sb_rb_error").innerHTML="<span>Wrong otp</span>" )
    }
}
function getOrSetupWallet(userId, authToken){
    localStorage.setItem("wallet_authToken", authToken)
    localStorage.setItem("userId", userId)
    let config = {

        method:"get",
        headers:{
            "X-Auth-Token": authToken ,
            "Content-Type": "application/json",
        }
    }

    fetch(`${BLOCKCHAIN_SERVICE}/user/blockchain/account?blockchain=FLOW`,config)
        .then(res => res.json())
        .then(res => {

                const talewallet = res?.filter(wallet => wallet.wallet ==="TALEWALLET");
                if(talewallet?.length === 0){
                    setUpTaleWallet(authToken);
                }
                else{
                    localStorage.setItem("tale_wallet_address",talewallet[0].address)
                    showWalletUI(talewallet[0].address)
                }
            }
        )
        .catch(rej => document.getElementById("sb_rb_error").innerHTML="<span>Having trouble getting account try again later</span>" )
}

function setUpTaleWallet(authToken){
        let config = {
            method:"post",
            headers:{
                "X-Auth-Token": authToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                blockchain: "FLOW",
                wallet: "TALEWALLET",
                marketplaceAddress: 0,

            })
        }
        fetch(`${BLOCKCHAIN_SERVICE}/user/blockchain/wallet/setup`,config)
            .then(res => res.json())
            .then(res =>{
                localStorage.setItem("tale_wallet_address",res.address)
                document.getElementById('wallet_div').innerHTML  = '';
                showWalletUI(res.address)

            })
            .catch(rej => console.log(rej))

}
function showWalletUI(tale_wallet_address){
    document.getElementById("wallet_div").innerHTML = `
            <div class="flex justify-between items-center">
            <div>
                <img src="./images/talewallet.png" class="w-40 h-40 object-contain" />
            </div>
            <div class="flex items-center border-slate border-radius-10 gap-10 px-10">
                    <img src="./images/testnet.png" class=" h-15 object-contain" />
                    <span class="font-bold text-medium">Testnet</span>
            </div>
            <div id="profile-container" class="relative">
                <img src="./images/profile.svg" class="w-40 h-40 object-contain" />
            </div>
            <div class="hidden" id="modal-container">
                    
                </div>
            </div>
            <div class="flex flex-col items-center gap-20" style="margin-top: 50px;">
            <div class = "flex justify-between items-center box-shadow-1 w-80p wallet-address-container">
                <div>
                    <img src="./images/ellipse.svg" class="w-40 h-40 object-contain" />
                </div>
                <div style=" overflow: hidden; text-overflow: ellipsis;" class="w-100 font-bold" id="tale_wallet_address">  ${tale_wallet_address}</div>
                <div  id="copy_to_clipboard"> <img src="./images/copy.png" alt="Copy Address" width="25" /> </div>
            </div>
                
                <div class="flex flex-col items-center">
                    <div class="relative z-10">
                        <img src="./images/flow.png" class=" w-50 h-100object-contain" />
                    </div>
                    <div  id="wallet_balance" class="text-lg font-bold text-tale"> fetching ... </div>
                </div>
            <div class="flex gap-20 justify-center">
                <button class="btn primary-btn" id="buy-btn">Earn More</button>
                <button class="btn hidden secondary-btn" id="sell-btn">Sell</button>
            </div>
            </div>
            <div class="flex flex-col gap-20" id="wallet_asset_div" style="margin-top: 50px;">
                <div class="font-bold text-medium flex justify-between  relative  ">
                    <button class="activity-button activity-selected relative z-10" id="show-Nfts">NFTs </button>
<!--                    <button class="activity-button relative left-10 z-10" id="show-token">Token </button>-->
<!--                    <button class="activity-button relative " id ="show-activity">Activities </button>-->
                   
                 </div>
        <div class="flex flex-wrap gap-20" id="wallet_asset_container"></div>
    </div>`;
    fetchTokenBalance(tale_wallet_address)
    fetchNFTs(tale_wallet_address)
}

function fetchTokenBalance(address){
    document.getElementById("wallet_balance").innerHTML =`100 Cric Token`
}
function fetchNFTs(address){
    var imageSrc='https://nftverse-dev.mypinata.cloud/ipfs/QmaKWGkJPY5QFFGW4NjLdC1LEfAzGMjp4fLWowE4qfSYtg';
    var name = "MS Dhoni"
    var c =  `<div class=" flex flex-wrap justify-center gap-20"> `;
    c = c + `<a href="">
            <div class="flex flex-col asset-container" >
            <div>
                <img src= ${imageSrc} class ="asset-image" />
            </div>
            <div class="break-word"> ${name} </div>
            </div>
            </a>`;
    document.getElementById("wallet_asset_container").innerHTML = c+ "</div>"
}
document.addEventListener("DOMContentLoaded", () => {
    console.log("Hello World!");
    var authToken = localStorage.getItem("authToken")
    var tale_wallet_address = localStorage.getItem("tale_wallet_address")
    if(tale_wallet_address){
        showWalletUI(tale_wallet_address)
    } else {
        loginUI();
    }
});