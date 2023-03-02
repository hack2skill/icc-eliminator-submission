import algosdk from 'algosdk';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AlgorandClient from '../../services/algorandsdk';
// import CryptoJS from 'react-native-crypto-js'

export const useWalletView = () => {
    const [accountAsset, setAccountAsset] = useState([]);
    const [amount, setAmount] = useState(0);
    const [assetUrl, setAssetUrl] = useState([]);
    const [optedIn, setOptIn] = useState(false)
    const appCtx = useSelector((state) => state.app)
    const [taleAmount, setTaleAmount] = useState(0);
    const [optInSuccessfull, setOptInSuccessfull] = useState(false);
    const dispatch = useDispatch();
    const showAssets = (async () => {
        let accountInfo = await AlgorandClient.accountInformation(appCtx.walletAddress[0]?.address).do();
        setAmount(accountInfo.amount / 1000000)
        console.log(amount);
        setAccountAsset(accountInfo["created-assets"]);
        if (accountInfo["created-assets"] === undefined) {
            setAccountAsset([]);
            // document.getElementById('wallet_asset_div').innerHTML = '<div class="container" style="background-color:#f1f1f1; line-height: 2">No asset found</div>';
        } else {
            var c = '<div class="container" style="text-align: left;font-size:30px">Your Assets</div> <br />';
            // console.log(accountInfo['created-assets'])
            var assetobj = accountInfo['created-assets']
            let array = [];
            let assetUrl = [];
            for (const item in assetobj) {
                array = ([...array, { key: assetobj[item].index, value: assetobj[item].params.name }])
                assetUrl = ([...assetUrl, { key: assetobj[item].index, value: assetobj[item].params.url }])
                // console.log(`key = ${item}, value = ${assetobj[item]["assetname"]}`);
                // c = c + '<div style="color:black;font-weight:bold; margin-top: 5px; padding: 10px; text-align: left;display:flex;justify-content: center"><a style="text-Decoration:none;color:black" href="https://testnet.talewallet.com/asset/' + item + '" target="_blank" onclick="info()">' + assetobj[item]["assetname"] + '</a></div>';
            }
            setAccountAsset(array);
            setAssetUrl(assetUrl);
            // document.getElementById('wallet_asset_div').innerHTML = c;
        }
    })
    const optInAsset = (assetId) => {
        const waitForConfirmation = async function (AlgorandClient, txId) {
            let response = await AlgorandClient.status().do();
            let lastround = response["last-round"];
            while (true) {
                const pendingInfo = await AlgorandClient.pendingTransactionInformation(txId).do();
                if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
                    //Got the completed Transaction
                    // console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
                    break;
                }
                lastround++;
                await AlgorandClient.statusAfterBlock(lastround).do();
            }
        };


        // Function used to print created asset for account and assetid
        const printCreatedAsset = async function (AlgorandClient, account, assetid) {
            // note: if you have an indexer instance available it is easier to just use this
            //     let accountInfo = await indexerClient.searchAccounts()
            //    .assetID(assetIndex).do();
            // and in the loop below use this to extract the asset for a particular account
            // accountInfo['accounts'][idx][account]);
            let accountInfo = await AlgorandClient.accountInformation(account).do();
            for (let idx = 0; idx < accountInfo['created-assets'].length; idx++) {
                let scrutinizedAsset = accountInfo['created-assets'][idx];
                if (scrutinizedAsset['index'] == assetid) {
                    // console.log("AssetID = " + scrutinizedAsset['index']);
                    let myparms = JSON.stringify(scrutinizedAsset['params'], undefined, 2);
                    // console.log("parms = " + myparms);
                    break;
                }
            }
        };
        // Function used to print asset holding for account and assetid
        const printAssetHolding = async function (AlgorandClient, account, assetid) {
            // note: if you have an indexer instance available it is easier to just use this
            //     let accountInfo = await indexerClient.searchAccounts()
            //    .assetID(assetIndex).do();
            // and in the loop below use this to extract the asset for a particular account
            // accountInfo['accounts'][idx][account]);
            let accountInfo = await AlgorandClient.accountInformation(account).do();
            for (let idx = 0; idx < accountInfo['assets'].length; idx++) {
                let scrutinizedAsset = accountInfo['assets'][idx];
                if (scrutinizedAsset['asset-id'] == assetid) {
                    let myassetholding = JSON.stringify(scrutinizedAsset, undefined, 2);
                    // console.log("assetholdinginfo = " + myassetholding);
                    break;
                }
            }
        };
        const oldMnemonic = appCtx.mnemonic?.split(' ');
        let decryptedData='';
        
        // if (oldMnemonic?.length > 1) {
        //     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(appCtx.mnemonic), 'secretKey').toString();
        //     let bytes = CryptoJS.AES.decrypt(ciphertext, 'secretKey');
        //     decryptedData = bytes.toString(CryptoJS.enc.Utf8) && JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // }
        // else {
        //     var bytes = CryptoJS.AES.decrypt(appCtx.mnemonic || '""', 'secretKey');
        //     decryptedData = bytes.toString(CryptoJS.enc.Utf8) && JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // }
        // JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        var account3_mnemonic = decryptedData;
        var recoveredAccount3 = algosdk.mnemonicToSecretKey(account3_mnemonic);
        

        (async () => {

            let note = undefined;
            let assetID = parseInt(process.env.REACT_APP_TAIL_COIN_TOKEN);
            // console.log(process.env.REACT_APP_TAIL_COIN_TOKEN);

            let params = await AlgorandClient.getTransactionParams().do();
            //comment out the next two lines to use suggested fee
            params.fee = 1000;
            params.flatFee = true;

            let sender = recoveredAccount3.addr;
            let recipient = sender;
            // We set revocationTarget to undefined as 
            // This is not a clawback operation
            let revocationTarget = undefined;
            // CloseReaminerTo is set to undefined as
            // we are not closing out an asset
            let closeRemainderTo = undefined;
            // We are sending 0 assets
            let amount = 0;


            // signing and sending "txn" allows sender to begin accepting asset specified by creator and index
            let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
                amount, note, assetID, params);

            // Must be signed by the account wishing to opt in to the asset    
            let rawSignedTxn = opttxn.signTxn(recoveredAccount3.sk);
            let opttx = (await AlgorandClient.sendRawTransaction(rawSignedTxn).do());
            // console.log("Transaction : " + opttx.txId);
            // wait for transaction to be confirmed
            await waitForConfirmation(AlgorandClient, opttx.txId);

            //You should now see the new asset listed in the account information
            // console.log("Account 3 = " + recoveredAccount3.addr);
            await printAssetHolding(AlgorandClient, recoveredAccount3.addr, assetID);
            //////////
            showTaleData();
        })().catch(e => {
            // console.log(e);
            console.trace();
            Alert.alert('Your wallet should have atleast 0.451 ALGOS to opt In token and claim reward')
            setOptInSuccessfull(false)
            // setOptIn(false)
        });

    }
    const showTaleData = async () => {
        let accountInfo = await AlgorandClient.accountInformation(appCtx.walletAddress[0]?.address).do();
        setAmount(accountInfo.amount / 1000000)
        let array = [];

        // setAccountAsset(accountInfo["assets"]);
        if (accountInfo["assets"] === undefined) {
            // setAccountAsset([]);
            // document.getElementById('wallet_asset_div').innerHTML = '<div class="container" style="background-color:#f1f1f1; line-height: 2">No asset found</div>';
        } else {
            // console.log(accountInfo['assets'])
            var assetobj = accountInfo['assets']
            let assetUrl = [];
            assetobj?.map((asset) => {
                array = [...array, { key: asset['asset-id'], amount: asset.amount }]
            })
            // console.log(array);
        }
        const isassetIdPresent = array?.filter((assets) => {
            return (assets.key == process.env.REACT_APP_TAIL_COIN_TOKEN)
        })
        if (isassetIdPresent?.length > 0) {
            setTaleAmount((isassetIdPresent[0]?.amount) / 100)
            // console.log(isassetIdPresent);
            setOptInSuccessfull(false)
            setOptIn(true);
        }
        else {
            setOptIn(false)
            // setOptInSuccessfull(false)
        }

    }
    const handleOptIn = () => {
        const isAssetIdPresent = accountAsset?.filter((asset) => { return asset.key === process.env.REACT_APP_TAIL_COIN_TOKEN });
        if (isAssetIdPresent?.length === 0) {
            try {
                optInAsset(process.env.REACT_APP_TAIL_COIN_TOKEN)
            }
            catch {
                setOptInSuccessfull(false)
                Alert.alert('Your wallet should have atleast 0.451 ALGOS to opt In token and claim reward')
            }
        }
    }
    return {
        accountAsset,
        setAccountAsset,
        amount,
        setAmount,
        assetUrl,
        setAssetUrl,
        appCtx,
        handleOptIn,
        showAssets,
        optedIn,
        taleAmount,
        showTaleData,
        setOptInSuccessfull,
        optInSuccessfull
    }
}
