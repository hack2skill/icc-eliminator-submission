import { REACT_APP_TAIL_COIN_TOKEN, REACT_APP_URL_BLOCKCHAIN_SERVICE, REACT_APP_X_APP_TOKEN } from 'denv';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../store/app-slice';
import useAuthorizedHttp from './use-authorized-http';


export default function useFetchToken() {
    const makeAuthorizedRequest = useAuthorizedHttp();
    const appCtx = useSelector((state) => state.app)
    const dispatch = useDispatch();
    const [tokenAmount,setTokenAmount] = React.useState(0);
    const [optedIn,setOptedIn] = React.useState(false);
   

    const fetch=()=>{
        makeAuthorizedRequest(
            {
                method: 'get',
                url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/${appCtx.walletAddress[0]?.address}/list`,
                headers: {
                    "X-App-Token": REACT_APP_X_APP_TOKEN,
                    "X-Auth-Token": appCtx.authToken,
                    "Content-Type": "application/json",
                }
            },
            (data) => {
                console.log(data);
                let tokenArray= [];
                data.content?.map((item) => {
                    if (item.total?.lentgh > 1) {
                        return [...tokenArray, item]
                    }
                    if(item.assetId === REACT_APP_TAIL_COIN_TOKEN){
                        setTokenAmount(item?.amount/100);
                        setOptedIn(true);
                    }
                })
                console.log(tokenArray);

                dispatch(appActions.setTaleAmount(tokenArray));

            },
            () => console.log(),
        );
    }
    React.useEffect(() => {
        // ${appCtx?.walletAddress[0].address}
       fetch();
    }, []);
    return{
        tokenAmount,
        fetch,
        optedIn,
        setOptedIn
    }
}