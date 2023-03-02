import React from 'react';
import { Alert, Image, Keyboard, Pressable, Text, TextInput, ToastAndroid, View, ImageBackground, KeyboardAvoidingView } from 'react-native';
import BlackPrimaryButton from '../components/common/BlackPrimaryButton';
import useHttp from '../hooks/use-http';
import { useDispatch } from 'react-redux';
import { appActions } from '../store/app-slice';
import { ScrollView } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import * as Device from 'expo-device';
import { REACT_APP_NFTVERSE_DEV_API } from 'denv';

const SubmitOTP = ({ route }) => {
    const [otp, setOtp] = React.useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [resendOtp, setResendOtp] = React.useState(false);

    const makeRequest = useHttp();

    const dispatch = useDispatch();

    const secondInputRef = React.useRef(null);
    const thirdInputRef = React.useRef(null);
    const fourthInputRef = React.useRef(null);
    const fifthInputRef = React.useRef(null);
    const sixthInputRef = React.useRef(null);

    const handleOtpChange = React.useCallback((name, value) => {
        setOtp(prev => ({ ...prev, [name]: value }));
        if (name === 'first' && value.length === 1) {
            secondInputRef.current?.focus();
        }
        if (name === 'second' && value.length === 1) {
            thirdInputRef.current?.focus();
        }
        if (name === 'third' && value.length === 1) {
            fourthInputRef.current?.focus();
        }
        if (name === 'fourth' && value.length === 1) {
            fifthInputRef.current?.focus();
        }
        if (name === 'fifth' && value.length === 1) {
            sixthInputRef.current?.focus();
        }
    }, []);

    const handleOtpSubmit = React.useCallback(() => {
        setLoading(true);
        const otpText = Object.values(otp).join('');
        if (!/\d{6}/.test(otpText)) {
            ToastAndroid.show('Please enter a valid OTP', ToastAndroid.SHORT);
            setLoading(false)
            return;
        }
        let config={
            method: 'post',
            url: `${REACT_APP_NFTVERSE_DEV_API}/otp/verify?type=login`,
            data: {
                email: route.params.email,
                otp: otpText,
                userDevice:{
                    device:Device.brand,
                    deviceId:Device.osBuildId,
                    // firebaseId:'',
                }
            },
            headers: {
                'X-App-Token': '123',
                'Content-Type': 'application/json',
            },
        }
        console.log(config);
        
        axios(config)
        .then((res)=>{
            let data=res.data;
            ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
            dispatch(appActions.updateUser(data));
            dispatch(appActions.updateAuthToken(data.authToken))
            dispatch(appActions.login());
            setLoading(false)
        })
        .catch(()=>{
            setLoading(false)
        })

    }, [otp]);


    React.useEffect(() => {
        if (Object.values(otp).every(value => value.length === 1)) Keyboard.dismiss();
    }, [otp]);

    const handleResendOtp = React.useCallback(() => {
        let header = {};

        makeRequest(
            {
                url: `${REACT_APP_NFTVERSE_DEV_API}/otp/send?type=wallet_login&resend=true`,
                data: { "email": route.params.email },
                method: "post",
            },
            (data) => {
                Alert.alert('OTP Sent SuccesFully!')
                // setReSendOtp(true);
                // distance1 = 0;
                // setOtp1('');
                setOtp({
                    first: '',
                    second: '',
                    third: '',
                    fourth: '',
                    fifth: '',
                    sixth: '',
                });
                if (data.message === 'Success' && data.status === true) {
                    setResendOtp(true);
                    setLoading(false)  
                }
            },
            () => { setLoading(false)}
        )
    }, [])

    return (
        <ImageBackground source={require('../assets/auth/authbg.png')} resizeMode={'cover'} className="w-screen min-h-screen">
            <ScrollView
                contentContainerStyle={{ alignItems: 'center' }}
            >
                    <KeyboardAwareScrollView
                    // innerRef={ref => {
                    //     scroll = ref
                    //   }}
                    className={'flex flex-end flex-col gap-y-10 min-h-screen'}
                    contentContainerStyle={{ flex:1,alignItems: 'center' }}
                    // behavior="height"
                    enableOnAndroid={true}
                    // resetScrollToCoords={{x:0,y:0}}
                    enableAutomaticScroll={true}
                >
                    <Image resizeMode={'contain'} resizeMethod={'resize'} source={require('../assets/auth/header.png')} />
                    <Text className={'text-[30px] text-white font-bold'}>Welcome to Crick Tales</Text>
                    <View className={'flex flex-col gap-y-5'}>
                        <Text className={'text-xl text-white'}>OTP verification</Text>
                        <Text className={'text-sm text-gray-50'}>Please enter the verification code sent to your mail</Text>
                        <View className={'flex flex-row gap-x-2 mx-auto'}>
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.first}
                                onChangeText={value => handleOtpChange('first', value)}
                                autoFocus
                                onSubmitEditing={() => secondInputRef.current?.focus()}
                            />
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.second}
                                onChangeText={value => handleOtpChange('second', value)}
                                ref={secondInputRef}
                                onSubmitEditing={() => thirdInputRef.current?.focus()}
                            />
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.third}
                                onChangeText={value => handleOtpChange('third', value)}
                                ref={thirdInputRef}
                                onSubmitEditing={() => fourthInputRef.current?.focus()}
                            />
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.fourth}
                                onChangeText={value => handleOtpChange('fourth', value)}
                                ref={fourthInputRef}
                            />
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.fifth}
                                onChangeText={value => handleOtpChange('fifth', value)}
                                ref={fifthInputRef}
                            />
                            <TextInput
                                keyboardType={'number-pad'}
                                maxLength={1}
                                textAlign={'center'}
                                className={'text-2xl rounded-lg bg-violet-300 text-white .bg-[#D9D9D9] p-2 h-[50px] w-[50px] shadow-xl'}
                                value={otp.sixth}
                                onChangeText={value => handleOtpChange('sixth', value)}
                                ref={sixthInputRef}
                            />
                        </View>
                    </View>
                    <BlackPrimaryButton primary={true} disabled={loading} onPress={handleOtpSubmit} className={'w-[250px]'} loading={loading}>
                        <Text className={'text-neon text-center text-xl'}>Submit</Text>
                    </BlackPrimaryButton>
                    <View className={'flex flex-col gap-y-2 items-center'}>
                        <Text>Didn't receive the OTP?</Text>
                        <Pressable>
                            {!resendOtp ?
                                <Text className={'text-sky-500 font-semibold'} onPress={() => { handleResendOtp() }}>Resend OTP</Text>
                                :
                                <Text className={'text-sky-500 font-semibold flex items-center'} onPress={() => { }}>Resend successfull <Image source={require('../assets/wallet/Tick.png')} resizeMode={'contain'} className="w-[20px] h-[20px]" /></Text>
                            }
                        </Pressable>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </ImageBackground>
    );
};

export default SubmitOTP;
