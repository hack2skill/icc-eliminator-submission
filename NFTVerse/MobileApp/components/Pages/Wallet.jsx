import axios from 'axios';
import { REACT_APP_NFTVERSE_DEV_API, REACT_APP_URL_BLOCKCHAIN_SERVICE, REACT_APP_TAIL_COIN_TOKEN, REACT_APP_X_APP_TOKEN } from 'denv';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Linking } from 'react-native';
import { Alert } from 'react-native';
import { Image, ImageBackground, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import useAuthorizedHttp from '../../hooks/use-authorized-http';
import useFetchToken from '../../hooks/useFetchToken';
import useFetchNotification from '../../hooks/usePushNotification';
import { appActions } from '../../store/app-slice';
import AddressBar from '../authorized-view/AddressBar';
import AssetsView from '../authorized-view/assets/AssetsView';
import BlackPrimaryButton from '../common/BlackPrimaryButton';
import FetchwalletBalance from '../CommonComponent/fetchwalletBalance';

const Wallet= ({ navigation, route }) => {
    const [wallet, setWallet] = useState([{ address: '' }]);
    const [loading, setLoading] = useState(true);
    const [walletCreationProgress, setWalletCreationProgress] = useState(0);
    const [openInfoModal, setOpenInfoModal] = useState(false);
    const [openFirstUserWalletScreen, setOpenFirstUSerWalletScreen] = useState(false);
    const [openSetupPasswordModal, setOpenSetupPasswordModal] = useState(false);
    const [chosenTab, setChosenTab] = useState('nfts');
    const makeRequest = useAuthorizedHttp();
    const dispatch = useDispatch();
    const appCtx = useSelector((state) => state.app);
    const { balance, fetchAlgos } = FetchwalletBalance();
    const [optInLoader, setOptInLoader] = useState(false)
    const { tokenAmount, optedIn, setOptedIn, fetch } = useFetchToken();

    useEffect(() => {
        fetch();
        fetchAlgos();
    }, [])

    const loadData1 = React.useCallback(() => {
        // user/5GFS77UHBLQJ6DIZMZAIJKTOKZQ5HYWOX4QVIACVNFW32E22O7B2Q3OICI/list
        // ${appCtx.walletAddress[0]?.address}

        let config = {
            url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/${appCtx.walletAddress[0]?.address}/list`,
            method: 'get',
            headers: {
                "X-App-Token": REACT_APP_X_APP_TOKEN,
                "X-Auth-Token": appCtx.authToken,
                "Content-Type": "application/json",
            }
        }
        console.log(config);

        axios(config)
            .then(function (response) {
                console.log(response);
                //  setBalance(response?.data?.balance);
                //  dispatch(appActions.setFrontSide(response.data?.fileUrl));
            })
            .catch(function (error) {
                console.log(error);
                // toast.error('Uploading Back Side failed!');
            })
    }, [])
    useEffect(() => { loadData1() }, [])


    useEffect(() => {
        // if (appCtx.walletAddress[0]?.address!==='loading') {
        // if (appCtx.authToken) {
        //     if (decryptedData === '') {
        makeRequest(
            {
                url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/blockchain/account?blockchain=FLOW`,

            },
            (data) => {
                const walletData = data?.filter((account) => { return (account?.wallet === "TALEWALLET") });
                setWallet(walletData);
                dispatch(appActions.setWalletAddress(walletData));
                if (walletData?.length === 0) {
                    setOpenFirstUSerWalletScreen(true);
                }
                console.log(data);

            },
            () => {
                setLoading(false);
            },
            () => {
                // navigate('/logout')
            }
        );
        //     }
        // }
    }, [dispatch, makeRequest]);

    useEffect(() => {

        if (wallet && wallet.length === 0) {
            setWalletCreationProgress(0);
            setTimeout(() => {
                setWalletCreationProgress(1);
                setTimeout(() => {
                    makeRequest(
                        {
                            url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/blockchain/wallet/setup`,
                            method: "post",
                            data: {
                                blockchain: "FLOW",
                                wallet: "TALEWALLET",
                                marketplaceAddress: "cricTales",
                            },
                        },
                        (data) => {
                            setTimeout(() => {
                                setWallet([data]);
                                dispatch(appActions.setWalletAddress([data]));
                                if(route?.params?.fromContest){
                                    navigation.navigate('contest')
                                }
                            }, 1000);
                        },
                        (data) => {

                        },
                        () => {
                            setWalletCreationProgress(2);
                        }
                    );
                }, 1000);
            }, 1000);
        }
    }, [loading, makeRequest, wallet]);

    const handlePress = React.useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`${url} is Invalid !!`);
        }
    }, []);

   
    const handleCustodialOptIn = () => {
        setOptInLoader(true);
        if (balance >= 0.451) {
            axios({
                method: 'get',
                url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/asset/${REACT_APP_TAIL_COIN_TOKEN}/optin`,
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": appCtx.authToken
                }
            }).then((res) => {
                setOptInLoader(false);
                setOptedIn(true);
            })
                .catch(() => {
                    setOptInLoader(false);
                    Alert.alert('Failed to optIn asset unsuccessfull')
                })
        }
        else {
            Alert.alert('Your wallet should have atleast 0.451 ALGOS to opt In Tale Coin Token')
            setOptInLoader(false);
        }

    }
    // const { expoPushToken, notification, sendPushNotification } = useFetchNotification();
    // console.log(expoPushToken, notification);
    // console.log('heygfcyiugyefcgq', chosenTab);
    // useEffect(() => {
    //     console.log(notification, expoPushToken);

    //     const func = () => {
    //         sendPushNotification(expoPushToken);
    //     }
    //     func();
    // }, [expoPushToken]);

    return (
        <>
            {
                wallet?.length === 0 ?
                    <View
                        className={
                            " rounded-lg p-10 flex flex-col justify-center items-center h-screen text-center gap-10 shadow-md transition-all ease-out duration-300 bg-blue-900"
                        }
                    >
                        <View
                            className={`${walletCreationProgress > 0 ? "border-green-500" : "border-gray-400"} opacity-0 ${walletCreationProgress >= 0 && "opacity-100"
                                } transition-all duration-500 ease-out border-2 p-5 rounded-lg text-center gap-5 text-xl w-[100%] lg:w-[400px] flex flex-row justify-center pt-2`}
                        >
                            <Text className={`text-xl ${walletCreationProgress > 0 ? "text-green-500" : ""}`}>1.</Text>
                            <Text className={`text-xl ${walletCreationProgress > 0 ? "text-green-500" : ""}`}>Setting up wallet</Text>
                            <View className='text-xl h-[100%]'>
                                {walletCreationProgress > 0 ? (
                                    // <DoneRounded className={"rounded-full p-1 bg-green-500"} />
                                    <Image className='w-[20px] h-[20px]' source={require('../../assets/wallet/Tick.png')} />
                                ) : (
                                    ''
                                    // <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
                                )}
                            </View>
                        </View>
                        <View
                            className={`${walletCreationProgress > 1 ? "border-green-500" : "border-gray-400"} opacity-0 ${walletCreationProgress >= 1 && "opacity-100"
                                } transition-all duration-500 ease-out border-2  p-5 rounded-lg text-center gap-5 text-xl w-[100%] lg:w-[400px] flex flex-row justify-center items-center pt-2`}
                        >
                            <Text className={`text-xl ${walletCreationProgress > 1 ? "text-green-500" : ""}`}>2.</Text>
                            <Text className={`text-xl ${walletCreationProgress > 1 ? "text-green-500" : ""}`}>Adding NFT capability</Text>
                            <Text className='text-xl h-[100%]'>
                                {walletCreationProgress > 1 ? (
                                    // <DoneRounded className={"rounded-full p-1 bg-green-500"} />
                                    <Image className='w-[20px] h-[20px]' source={require('../../assets/wallet/Tick.png')} />
                                ) : (
                                    ''
                                    // <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24" />
                                )}
                            </Text>
                        </View>
                        <Text
                            className={`w-[100%] lg:w-[400px] text-xl bg-green-500 p-5 rounded-lg text-center opacity-0 ${walletCreationProgress === 2 && "opacity-100"
                                } transition-all duration-500 ease-out text-white`}
                        >
                            Wallet Ready
                        </Text>
                    </View>
                    :
                    <>
                        <View className={'px-5  h-screen flex flex-col justify-start items-center gap-y-4 bg-blue-900'}>
                            <View className='pt-10'>
                                <AddressBar />
                            </View>
                            <View>
                                <Image className={'w-[100px] h-[110px]'} source={require('../../assets/wallet/flow.png')} resizeMode="contain"/>
                            </View>
                            {/* <Text className='text-[30px] text-purple-500 font-bold'> {balance} Algos<Text onPress={() => { fetchAlgos() }} className={``}> <Image source={require('../../assets/common/Refresh.png')} resizeMode={'contain'} className='w-[20px]' /></Text></Text> */}
                            {/* <View className='flex flex-row justify-center flex-wrap gap-2 w-[100%]'>
                                <BlackPrimaryButton primary={true} className='w-[45%]' onPress={() => { handlePress('https://ramp.alchemypay.org/#/index') }}>Buy</BlackPrimaryButton>
                                <BlackPrimaryButton primary={false} className='w-[45%]' onPress={() => {
                                    navigation.navigate("SendAlgosOrAssests")
                                    sendPushNotification(expoPushToken);
                                }}>Send</BlackPrimaryButton>
                            </View> */}
                            <View className='flex flex-row justify-around w-[100%] mx-[20px] mb-[20px]'>
                                <TouchableOpacity className='w-[50%]' onPress={() => {
                                    fetchAlgos();
                                    setChosenTab('nfts')
                                }}>
                                    <Text className={`border-b-[3px] ${chosenTab === 'nfts' ? `border-lime-300` : 'border-gray-300'} text-[20px] font-medium text-center pb-2 text-white`}>NFTs</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity className='w-[50%]' onPress={() => {
                                    fetch();
                                    setChosenTab('tokens')
                                }}>
                                    <Text className={`border-b-[3px] ${chosenTab === 'tokens' ? `border-lime-300` : 'border-gray-300'} text-[20px] font-medium text-center pb-2 text-white`}>Tokens</Text>
                                </TouchableOpacity> */}
                            </View>
                            {chosenTab === 'tokens' ?
                                <>
                                    <TouchableOpacity onPress={() => { navigation.navigate('TaleCoin'), { tokenAmount } }} >
                                        <View className="flex flex-row justify-start items-center w-[100%] border border-gray-400 bg-gray-50 px-[30px] py-[10px] rounded-[30px] cursor-pointer my-[20px]"

                                        >
                                            <View className="w-[100%] flex flex-row justify-between">
                                                <View className="flex flex-row justify-start items-center"
                                                // onClick={() => { navigate(`/talecoin`) 
                                                // }}
                                                >
                                                    <View className="pr-[20px]">
                                                        {/* <img src="/images/talecoinstack.svg" className="w-[40px]" alt="tail_coin" /> */}
                                                        <Image className={'w-[40px] h-[40px]'} source={require('../../assets/wallet/talecoinstack.png')} />
                                                    </View>
                                                    <View className="flex items-center gap-2">
                                                        <View className="font-medium text-[18px]">
                                                            <Text className='font-medium text-[20px]'>{tokenAmount || 0}&nbsp;Tale</Text>
                                                        </View>
                                                        {/* <View className="font-medium">{taleAmount}</View> */}
                                                    </View>
                                                </View>
                                                <View className="flex flex-row justify-end items-center">
                                                    {/* <Text>optIn</Text> */}
                                                    <TouchableOpacity
                                                        className={`font-medium flex flex-row justify-center items-center ${!optedIn ? 'border rounded-xl p-2 border-purple-600' : 'border-[0px]'}`}
                                                        onPress={() => {

                                                            handleCustodialOptIn();
                                                        }}
                                                    // disabled={optInSuccessfull}
                                                    >
                                                        <Text>{!optedIn && 'Opt In'}</Text>
                                                        {optInLoader && <ActivityIndicator size="small" color="#0000ff" />}
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                    {
                                        appCtx.taleAmount?.map((item) => {
                                            if (item.assetId !== REACT_APP_TAIL_COIN_TOKEN) {
                                                return (
                                                    <>
                                                        <View className="flex flex-row justify-start items-center w-[100%] border border-gray-400 bg-gray-50 px-[30px] py-[10px] rounded-[30px] cursor-pointer my-[20px]">
                                                            <View className="w-[100%] flex flex-row justify-between">
                                                                <View className="w-[100%] flex flex-row justify-start items-center">
                                                                    <View className="pr-[20px]">
                                                                        {/* <img src="/images/talecoinstack.svg" className="w-[40px]" alt="tail_coin" /> */}
                                                                        <Image className={'w-[40px] h-[40px]'} source={{ uri: `${item?.params?.url}` || `${item?.params?.image}` } || require('../../assets/wallet/talecoinstack.png')} />
                                                                    </View>
                                                                    <View className="flex items-center gap-2">
                                                                        <View className="font-medium text-[18px]">
                                                                            <Text className='font-medium text-[20px]'>{item?.amount}&nbsp;{item?.params?.name}</Text>
                                                                        </View>
                                                                        {/* <View className="font-medium">{taleAmount}</View> */}
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </>
                                :
                                <>
                                    <AssetsView navigation={navigation} />
                                    {/* <Text onPress={() => {
                                        navigation.navigate('UploadNft')
                                    }}
                                        className='text-[15px] font-bold fixed left-[] bottom-[120px] z-20'
                                    >
                                        Add Nft+
                                    </Text> */}
                                </>
                            }
                        </View>
                    </>

            }
        </>
    );

};

export default Wallet;
