import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { REACT_APP_NFTVERSE_DEV_API, REACT_APP_X_APP_TOKEN } from 'denv';
import React from 'react'
import { Text, View, Image, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../../../../misc/types';
import { appActions } from '../../../../store/app-slice';
import BlackPrimaryButton from '../../../common/BlackPrimaryButton'

const ThankYou: React.FC<{ navigation: NativeStackNavigationProp<any> }> = ({ navigation }) => {
    const appCtx = useSelector((state: StoreStateType) => state.app);
    const dispatch = useDispatch();
    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                e.preventDefault();
                navigation.navigate('Wallet')
            }),
        [navigation]
    );

    React.useEffect(() => {
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
            })
            .catch(() => {

            })
    }, [])


    return (
        <View className="flex flex-col lg:px-[20px] justify-center items-center pb-[30px] mt-[35px]">
            {!appCtx.verified ?
                appCtx.rejection ?
                    <>
                        <Text className='text-[20px] lg:text-[40px] font-medium'>Thank you for your patience.</Text>
                        <ScrollView className='flex flex-col lg:flex-row'
                            contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        >
                            <View className='w-[200px] h-[200px] flex justify-center'>
                                <Image source={require('../../../../assets/kyc/failed.png')} resizeMode="contain" className='w-[100%]' />
                            </View>
                            <View className='flex flex-col w-[100%] justify-center items-center gap-5 rounded-xl min-h-[300px] py-[10px]'>
                                <Text className='lg:px-[40px] text-justify'>Something wrong with your verification information.We request you to please resubmit your document to complete your KYC</Text>
                                <View className=' flex flex-row w-[100%]'>
                                    <View className='flex flex-col justify-center items-center mr-[10px]'>
                                        <View
                                        // onClick={() => { handleDocumentDownload() }}
                                        >
                                            {appCtx.frontSide ?
                                                <Image source={{ uri: appCtx.frontSide }} className='w-[195px] h-[200px]' />
                                                :
                                                <Image source={require('../../../../assets/kyc/status1.png')} className='w-[200px] h-[200px]' />
                                            }
                                        </View>
                                        <View className='flex gap-3'>
                                            <Text className='text-[20px]'>Identity Document</Text>
                                            {/* <View><Edit className='cursor-pointer' onClick={() => { navigate('/kyc/upload/document') }} /></View> */}
                                        </View>
                                    </View>
                                    <View className='flex flex-col justify-center items-center '>
                                        <View
                                        // onClick={() => appCtx.picture && handleDownload(appCtx.picture)}
                                        >
                                            {appCtx.picture ?
                                                <Image source={{ uri: appCtx.picture }} className='w-[195px] h-[200px]' />
                                                :
                                                <Image source={require("../../../../assets/kyc/selfie.png")} className='w-[200px] h-[200px]' />
                                            }
                                        </View>
                                        <View className='flex gap-3'>
                                            <Text className='text-[20px]'>Picture Uploaded</Text>
                                            {/* <View><Edit className='cursor-pointer' onClick={() => { }} /></View> */}
                                        </View>
                                    </View>
                                </View>
                                <View className='flex flex-col items-center gap-5 w-[100%] lg:w-[80%]'>
                                    <View className='flex flex-col gap-2'>
                                        <Text className='font-bold lg:text-[25px]'>Status : Rejected</Text>
                                        <Text className='font-medium text-[15px]'>Reason : {appCtx.rejection}</Text>
                                    </View>
                                    <BlackPrimaryButton primary={false}
                                        onPress={() => {
                                            navigation.navigate('KycVerification');
                                        }}
                                    >Resubmit</BlackPrimaryButton>
                                </View>
                            </View>
                        </ScrollView>
                    </>
                    :
                    <ScrollView className='flex'
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Text className='text-[40px] font-medium'>Thank you</Text>
                        <Text className='text-[20px] mb-[10px]'>We are currently checking your data</Text>
                        <View className='lg:flex lg:justify-center lg:items-center'>
                            <View className='flex justify-center'>
                                <Image source={require("../../../../assets/kyc/thankyou.png")} />
                            </View>
                            <View className='flex flex-col'>
                                <Text className='text-[20px] font-bold mb-[10px]'>The verification status will be updated automatically and can take upto 24 hours</Text>
                                <Text className='text-[17px] font-medium mb-[10px]'>When your documents get verified and you get a verified status, you can claim your rewards.</Text>
                                <View className='flex flex-row justify-start items-center w-[100%]'>
                                    {appCtx.verified ?
                                        <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/verified.png")} />
                                        :
                                        <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/pending.png")} />
                                    }
                                    <Text className='text-[20px] mb-[15px]'>-&nbsp;Identity&nbsp;Document</Text></View>
                                <View className='flex flex-row justify-start items-center w-[100%]'>
                                    {appCtx.verified ?
                                        <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/verified.png")} />
                                        :
                                        <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/pending.png")} />
                                    }
                                    <Text className='text-[20px] mb-[15px]'>-&nbsp;Selfie</Text>
                                </View>
                            </View>
                        </View>
                        <BlackPrimaryButton onPress={() => { navigation.navigate('Wallet') }}>
                            <Text>{`Go to Wallet ->`}</Text>
                        </BlackPrimaryButton>
                    </ScrollView>
                :
                <>
                    {/* <View className='text-[40px]'>Thank you</View> */}
                    <Text className='text-[25px] font-medium mb-[10px]'>Thank you for your patience, your verification is complete</Text>
                    <ScrollView className=''>
                        <View className='flex justify-center'>
                            <Image source={require("../../../../assets/kyc/verifiedimage.png")} />
                        </View>
                        <View className='flex flex-col'>
                            <Text className='text-[20px] font-bold mb-[10px]'>Your verification status is updated !</Text>
                            <View className='flex flex-row justify-start items-center w-[100%]'>
                                {appCtx.verified ?
                                    <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/verified.png")} />
                                    :
                                    <Image source={require("../../../../assets/kyc/pending.png")} />
                                }
                                <Text className='text-[20px] mb-[15px]'>-&nbsp;Identity&nbsp;Document</Text>
                            </View>
                            <View className='flex flex-row justify-start items-center w-[100%]'>
                                {appCtx.verified ?
                                    <Image className='flex items-center w-[120px]' resizeMode='contain' source={require("../../../../assets/kyc/verified.png")} />
                                    :
                                    <Image source={require("../../../../assets/kyc/pending.png")} />
                                }
                                <Text className='text-[20px] mb-[15px]'>-&nbsp;Selfie</Text>
                            </View>
                        </View>
                        <View className='flex justify-center items-center'>
                            <BlackPrimaryButton className='w-[250px]' onPress={() => { navigation.navigate('Wallet') }}>
                                {`Go to Wallet ->`}
                            </BlackPrimaryButton>
                        </View>
                    </ScrollView>

                </>
            }
        </View >
    )
}
export default ThankYou
