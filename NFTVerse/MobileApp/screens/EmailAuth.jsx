import React from 'react';
import { Alert, Image, Text, TextInput, View, ImageBackground } from 'react-native';
import BlackPrimaryButton from '../components/common/BlackPrimaryButton';
import OtpSentModal from '../components/modals/OtpSentModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { appActions } from '../store/app-slice';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useHttp from '../hooks/use-http';
import { REACT_APP_NFTVERSE_DEV_API } from 'denv';

const EmailAuth = ({ navigation }) => {
    const [emailSent, setEmailSent] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const appCtx = useSelector((state) => state.app);
    const makeRequest = useHttp();
    const dispatch = useDispatch();
    const toggleEmailSent = React.useCallback(() => setEmailSent(prev => !prev), []);

    const handleNavigateToOtp = React.useCallback(() => {
        toggleEmailSent();
        navigation.navigate('SubmitOTP', {
            email,
        });
    }, [navigation, toggleEmailSent, email]);

    const handleSendOtp = React.useCallback(() => {
        console.log(REACT_APP_NFTVERSE_DEV_API);

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
                console.log(data);

                toggleEmailSent()
            },
            () => Alert.alert('Something went wrong'),
            () => setLoading(false),
        );
    }, [navigation, toggleEmailSent, email]);

    return (
        <>
            <ImageBackground source={require('../assets/auth/authbg.png')} resizeMode={'cover'} className="w-screen min-h-screen">
                <ScrollView className={'w-screen min-h-screen flex flex-col gap-y-16'}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <KeyboardAwareScrollView
                        // innerRef={ref => {
                        //     scroll = ref
                        //   }}
                        className={'flex flex-end flex-col gap-y-10 min-h-screen'}
                        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                        // behavior="height"
                        enableOnAndroid={true}
                        // resetScrollToCoords={{x:0,y:0}}
                        enableAutomaticScroll={true}
                    >
                        <OtpSentModal onClose={handleNavigateToOtp} visible={emailSent} />
                        <Image resizeMode={'contain'} resizeMethod={'resize'} source={require('../assets/auth/header.png')} />
                        <Text className={'text-[30px] text-white font-bold'}>Welcome to Crick Tales</Text>
                        <View className={'flex flex-row w-[90vw]'}>
                            <View className={'bg-violet-600 rounded-l-full p-5 w-fit'}>
                                <Image
                                    className={'w-[35px] h-[25px] rounded-lg'}
                                    source={require('../assets/common/mail-white.png')}
                                />
                            </View>
                            <TextInput
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType={'email-address'}
                                placeholder={'Enter your email ID'}
                                className={'text-md rounded-r-full px-5 bg-white flex-grow shadow-xl'}
                            />
                        </View>
                        <BlackPrimaryButton primary={true} className={'w-[250px]'} disabled={loading} onPress={handleSendOtp} loading={loading}>
                            Send OTP
                        </BlackPrimaryButton>
                    </KeyboardAwareScrollView>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default EmailAuth;
