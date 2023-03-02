
import axios from 'axios';
import { REACT_APP_NFTVERSE_DEV_API, REACT_APP_TAIL_COIN_TOKEN, REACT_APP_URL_BLOCKCHAIN_SERVICE } from 'denv';
import React from 'react';
import { Modal, Text, View, Alert, Image, Keyboard, Pressable } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../../hooks/use-http';
import useFetchToken from '../../../hooks/useFetchToken';
import AlertModal from '../../common/AlertModal';
import BlackPrimaryButton from '../../common/BlackPrimaryButton';
import OtpSentModal from '../OtpSentModal';

const SendOtpModal = ({ visible, onClose, option, amount, address, navigation, setVisible }) => {
    const [emailSent, setEmailSent] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const appCtx = useSelector((state) => state.app);
    const [email, setEmail] = React.useState(appCtx.user?.email);
    console.log(appCtx);
    const toggleEmailSent = React.useCallback(() => setEmailSent(prev => !prev), []);
    const [resendOtp, setResendOtp] = React.useState(false);
    const { optedIn } = useFetchToken();
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSendOtp = React.useCallback(() => {
        if (!email) {
            Alert.alert('Please enter your email');
            return;
        }
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            Alert.alert('Please enter a valid email');
            return;
        }

        setLoading(true);
        makeRequest(
            {
                url: `${REACT_APP_NFTVERSE_DEV_API}/otp/send?type=login`,
                data: { email },
                method: 'post',
                headers: {
                    'X-App-Token': '123',
                    'Content-Type': 'application/json',
                },
            },
            (data) => {
                toggleEmailSent()

            },
            () => {
                setMessage('Something went wrong !!!')
                setAlert(true);
            },
            () => setLoading(false),
        );
    }, [email]);

    const [otp, setOtp] = React.useState({
        first: '',
        second: '',
        third: '',
        fourth: '',
        fifth: '',
        sixth: '',
    });

    const makeRequest = useHttp();

    const dispatch = useDispatch();

    const secondInputRef = React.useRef<TextInput>(null);
    const thirdInputRef = React.useRef<TextInput>(null);
    const fourthInputRef = React.useRef<TextInput>(null);
    const fifthInputRef = React.useRef<TextInput>(null);
    const sixthInputRef = React.useRef<TextInput>(null);

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
        const otpText = Object.values(otp).join('');
        if (!/\d{6}/.test(otpText)) {
            Alert.alert('Please enter a valid OTP');
            return;
        }

        setLoading(true);

        let config = {
            url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/token/transfer`,
            data: {
                "email": email, "otp": otpText,
                "blockchainFtId": option === 'tale' ? REACT_APP_TAIL_COIN_TOKEN : 0,
                "buyerUserAddress": address,
                "amount": option === 'tale' ? parseFloat(amount) * 100 : parseFloat(amount) * 1000000
            },
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": appCtx.authToken
            }
        }
        console.log(config);
        if ((optedIn && option === 'tale') || option === 'algo') {


            axios(config)
                .then((res) => {
                    console.log(res.data);

                    setLoading(false);
                    // Alert.alert('Transfer Successfull');
                    setMessage('Transfer Successfull')
                    setAlert(true);
                    navigation.navigate('Wallet');
                })
                .catch((error) => {
                    console.log(error);

                    // Alert.alert("OTP entered is incorrect !");
                    setMessage('OTP entered is incorrect !')
                    setAlert(true);
                    setLoading(false);
                })
        }
        else {
            // Alert.alert('Recievers account need to optIn tale coin asset')
            setMessage('Recievers account need to optIn tale coin asset')
            setAlert(true);
        }
    }, [otp]);

    React.useEffect(() => {
        if (Object.values(otp).every(value => value.length === 1)) Keyboard.dismiss();
    }, [otp]);

    const handleModalClose = React.useCallback(() => {
        setVisible(false);
    }, [visible])
    const handleResendOtp = React.useCallback(() => {
        let header = {};

        makeRequest(
            {
                url: `${REACT_APP_NFTVERSE_DEV_API}/otp/send?type=wallet_login&resend=true`,
                data: { "email": email },
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
                    // setLoader(false)  
                }
            },
            () => { }
        )
    }, [])

    return (
        <Modal visible={visible} animationType={'fade'} transparent>
            <View className={'w-screen h-screen bg-gray-800/50 '}>

                <View className='flex flex-col gap-y-5 items-center justify-center mx-auto my-auto p-2 rounded-[50px] pt-0 bg-[#43178A]'>
                    {!emailSent ?
                        <View className='flex flex-col justify-center items-center gap-y-5 '>
                            <View className='flex flex-row justify-end items-center absolute top-[-32px]'>
                                <Text className='text-[25px] w-[80%] text-right text-white' onPress={() => {

                                    if (!emailSent) {
                                        handleModalClose();
                                    }
                                }}>x</Text>
                            </View>
                            <OtpSentModal onClose={toggleEmailSent} visible={emailSent} />
                            {/* <Image resizeMode={'contain'} resizeMethod={'resize'} source={require('../assets/auth/header.png')} /> */}

                            <Text className={'text-2xl text-white'}>Email verification</Text>
                            <View className={'flex flex-row w-[90vw] border border-gray-200 rounded-full'}>
                                <View className={'bg-violet-600 rounded-l-full p-5 w-fit'}>
                                    <Image
                                        className={'w-[35px] h-[25px] rounded-lg'}
                                        source={require('../../../assets/common/mail-white.png')}
                                    />
                                </View>
                                <TextInput
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={appCtx.user?.email || ''}
                                    // onChangeText={setEmail}
                                    keyboardType={'email-address'}
                                    placeholder={'Enter your email ID'}
                                    className={'text-lg rounded-r-full p-5 bg-white flex-grow shadow-xl'}
                                />
                            </View>
                            <BlackPrimaryButton primary={true} className={'w-[200px]'} disabled={loading} loading={loading} onPress={handleSendOtp}>
                                Send OTP
                            </BlackPrimaryButton>
                        </View>
                        :
                        <View className='flex flex-col justify-center items-center gap-y-5'>
                            <View className='flex flex-row justify-end items-center absolute top-[-33px]'>
                                <Text className='text-[25px] text-right w-[80%] text-white' onPress={() => {
                                    setEmailSent(prev => !prev)
                                }}
                                >
                                    x
                                </Text>
                            </View>

                            {/* <Text className={'text-2xl'}>Welcome to NFTVerse</Text> */}
                            <View className={'flex flex-col gap-y-2'}>
                                <Text className={'text-xl text-center text-white'}>OTP verification</Text>
                                <Text className={'text-sm text-center text-white'}>Please enter the verification code sent to your mail</Text>
                                <View className={'flex flex-row gap-x-2 mx-auto'}>
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.first}
                                        onChangeText={value => handleOtpChange('first', value)}
                                        autoFocus
                                        onSubmitEditing={() => secondInputRef.current?.focus()}
                                    />
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.second}
                                        onChangeText={value => handleOtpChange('second', value)}
                                        ref={secondInputRef}
                                        onSubmitEditing={() => thirdInputRef.current?.focus()}
                                    />
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.third}
                                        onChangeText={value => handleOtpChange('third', value)}
                                        ref={thirdInputRef}
                                        onSubmitEditing={() => fourthInputRef.current?.focus()}
                                    />
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.fourth}
                                        onChangeText={value => handleOtpChange('fourth', value)}
                                        ref={fourthInputRef}
                                    />
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.fifth}
                                        onChangeText={value => handleOtpChange('fifth', value)}
                                        ref={fifthInputRef}
                                    />
                                    <TextInput
                                        keyboardType={'number-pad'}
                                        maxLength={1}
                                        textAlign={'center'}
                                        className={'text-2xl rounded-lg bg-violet-300 p-2 h-[50px] w-[50px] shadow-xl'}
                                        value={otp.sixth}
                                        onChangeText={value => handleOtpChange('sixth', value)}
                                        ref={sixthInputRef}
                                    />
                                </View>
                            </View>
                            <BlackPrimaryButton disabled={loading} loading={loading} onPress={handleOtpSubmit} className={'w-[50%]'}>
                                <Text className={'text-neon text-center text-xl'}>Submit</Text>
                            </BlackPrimaryButton>
                            <View className={'flex flex-col gap-y-2 items-center'}>
                                <Text className='text-white'>Didn't receive the OTP?</Text>
                                <Pressable>
                                    {!resendOtp ?
                                        <Text className={'text-sky-500 font-semibold'} onPress={() => { handleResendOtp() }}>Resend OTP</Text>
                                        :
                                        <Text className={'text-sky-500 font-semibold flex items-center'} onPress={() => { }}>Resend successfull <Image source={require('../../../assets/wallet/Tick.png')} resizeMode={'contain'} className="w-[20px] h-[20px]" /></Text>
                                    }
                                </Pressable>
                            </View>
                        </View>
                    }
                    <View className='flex flex-row justify-end items-center relative'>

                    </View>
                </View>
            </View>.
            <AlertModal visible={alert} onClose={() => { setAlert(false) }}>{message}</AlertModal>
        </Modal>
    );
};

export default SendOtpModal;
