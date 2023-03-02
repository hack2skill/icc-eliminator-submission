import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import axios from 'axios'
import { REACT_APP_NFTVERSE_DEV_API, REACT_APP_URL_BLOCKCHAIN_SERVICE, REACT_APP_X_APP_TOKEN } from 'denv'
import React, { useCallback, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import useHttp from '../../../../hooks/use-http'
import { StoreStateType } from '../../../../misc/types'
import { appActions } from '../../../../store/app-slice'
import BlackPrimaryButton from '../../../common/BlackPrimaryButton'


const CheckDocuments: React.FC<{ navigation: NativeStackNavigationProp<any> }> = ({ navigation }) => {
    const appCtx = useSelector((state: StoreStateType) => state.app)
    console.log(appCtx);
    const makeRequest = useHttp();
    const dispatch = useDispatch();
    const handleDocumentNavigate = React.useCallback(() => navigation.navigate('KycVerification'), [navigation]);
    const handlePictureNavigate = React.useCallback(() => navigation.navigate('KycUploadSelfie'), [navigation]);
    const handleDocumentUpdate = React.useCallback(() => {

        let url = `${REACT_APP_NFTVERSE_DEV_API}/user/kyc`;

        let config = {
            url: url,
            method: "get",
            headers: {
                "X-App-Token": REACT_APP_X_APP_TOKEN,
                "X-Auth-Token": appCtx.user?.authToken,
                "Content-Type": "application/json",
            },
        }
        console.log('get', config);

        axios(config)
            .then((response) => {

                const payload = {
                    "country": appCtx.country,
                    "document": `Front`,
                    "documentUrl": appCtx.frontSide,
                    // "id": result?.id,
                    "otherDocument": `Back`,
                    "otherDocumentUrl": appCtx.backSide,
                    "selfieUrl": appCtx.picture || appCtx.cameraPicture,
                    "userId": appCtx.user?.userId,
                    "verified": false,
                    "rejectionReason": null
                }
                let config1 = {
                    url: `${url}${response?.data ? '?reUpload=true' : ''}`,
                    method: response?.data ? "put" : "post",
                    headers: {
                        "X-App-Token": REACT_APP_X_APP_TOKEN,
                        "X-Auth-Token": appCtx.user?.authToken,
                        "Content-Type": "application/json",
                    },
                    data: payload,
                }
                console.log('postput', config1);

                axios(config1)
                    .then((res) => {
                        navigation.navigate('ThankYou');
                        Alert.alert('Documents submitted Successfully')
                    })
                    .catch(() => {
                        Alert.alert('Try again')
                    })
            })
            .catch(() => {
                Alert.alert('Try again');
            })
    }, [])
    const kycData = React.useCallback(() => {
        let url = `${REACT_APP_NFTVERSE_DEV_API}/user/kyc`;

        let config = {
            url: url,
            method: "get",
            headers: {
                "X-App-Token": REACT_APP_X_APP_TOKEN,
                "X-Auth-Token": appCtx.user?.authToken,
                "Content-Type": "application/json",
            },
        }
        console.log('get', config);

        axios(config)
            .then((response) => {

                dispatch(
                    appActions.setCountry(response?.data?.country)
                )
                // dispatch(
                //     appActions.setDocument('')
                // )
                dispatch(appActions.setFrontSide(response?.data?.documentUrl));
                dispatch(appActions.setBackSide(response?.data?.otherDocumentUrl));
                dispatch(appActions.setPicture(response?.data?.selfieUrl));
                dispatch(appActions.setCameraPicture(''));

                dispatch(appActions.setVerified(response?.data?.verified));
                dispatch(appActions.setRejection(response?.data?.rejectionReason));
                navigation.navigate('Wallet')
            })
            .catch(() => {

            })
    }, [navigation])

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {


                // Prevent default behavior of leaving the screen
                e.preventDefault();

                // Prompt the user before leaving the screen
                Alert.alert(
                    'Discard changes?',
                    'You have unsaved changes. Do you want to leave before submitting your E-KYC documents?',
                    [
                        { text: "Don't leave", style: 'cancel', onPress: () => { } },
                        {
                            text: 'Home',
                            style: 'destructive',
                            // If the user confirmed, then we dispatch the action we blocked earlier
                            // This will continue the action that had triggered the removal of the screen
                            onPress: () => {
                                kycData();
                            },
                        },
                    ]
                );
            }),
        [navigation]
    );
    return (
        <View className='pt-10 flex justify-center items-center w-[100%]'>
            <Text>Please check the information below to make sure everything is correct</Text>
            <Text className='text-[30px] font-medium'>Identity Documents</Text>
            <ScrollView
                className='w-[100%] flex gap-y-1'
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >

                <View className="flex flex-col lg:px-[20px] justify-center items-center w-[100%]">

                    <View className='flex flex-col w-[100%] justify-center items-center gap-y-2 rounded-xl shadow-lg pb-[20px]'>
                        <View className=' flex w-[100%] gap-y-10 '>
                            <View className='flex flex-col justify-center items-center gap-y-2'>
                                <View>
                                    {appCtx.frontSide &&
                                        <Image source={{ uri: appCtx.frontSide }} style={{ width: 300, height: 200 }} />
                                    }
                                </View>
                                <View className='flex gap-x-3'>
                                    <Text className='text-[20px] font-bold'>Document&nbsp;&nbsp;
                                        <TouchableOpacity onPress={() => { handleDocumentNavigate() }} className="">
                                            <Image source={require('../../../../assets/kyc/edit.png')} className="w-[20px] h-[20px]" resizeMode={"cover"} />
                                        </TouchableOpacity>
                                    </Text>
                                </View>
                            </View>
                            <View className='flex flex-col items-center gap-y-2'>
                                <View>

                                    {(appCtx.cameraPicture || appCtx.picture) &&
                                        <Image source={{ uri: appCtx.cameraPicture || appCtx.picture }} style={{ width: 300, height: 200 }} />
                                    }
                                </View>
                                <View className='flex gap-3'>
                                    <Text className='text-[20px] font-bold'>Selfie&nbsp;&nbsp;
                                        <TouchableOpacity onPress={() => { handlePictureNavigate() }} className="">
                                            <Image source={require('../../../../assets/kyc/edit.png')} className="w-[20px] h-[20px]" resizeMode={"cover"} />
                                        </TouchableOpacity>
                                    </Text>
                                    {/* <View><Edit className='cursor-pointer' onClick={() => { navigate('/kyc/upload/selfie') }} /></View> */}
                                </View>
                            </View>
                        </View>
                        <BlackPrimaryButton primary={true} onPress={handleDocumentUpdate}>Submit</BlackPrimaryButton>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default CheckDocuments


