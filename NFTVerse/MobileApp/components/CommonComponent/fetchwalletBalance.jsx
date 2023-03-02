import axios from 'axios'
import { URL_BLOCKCHAIN_SERVICE } from 'denv'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


export default function FetchwalletBalance() {
    const appCtx = useSelector((state) => state.app);
    const [balance, setBalance] = useState(0);
    const fetchAlgos = () => {
        let config = {
            url: `${URL_BLOCKCHAIN_SERVICE}/user/wallet/balance?blockchain=ALGORAND`,
            method: 'get',
            headers: {
                "X-Auth-Token": appCtx.authToken,
                "Content-Type": "application/json",
            }
        }
        axios(config)
            .then(function (response) {
                console.log(response);
                setBalance(response?.data?.balance);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchAlgos();
    }, [fetchAlgos])
    return {
        balance,
        fetchAlgos
    }
}