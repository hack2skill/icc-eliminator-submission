import React, { FC, useCallback } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Linking, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../../store/store';
import { appActions } from '../../../store/app-slice';
import { ScrollView, Switch } from 'react-native-gesture-handler';

const ProfileOptions = ({ navigation }) => {
    const email = useSelector((state) => state.app.user.email);
    const appCtx = useSelector((state) => state.app);
    const [network, setNetwork] = React.useState (false);
    const dispatch = useDispatch();

    const navigateToFAQ = React.useCallback(() => navigation.navigate('FAQ'), [navigation]);

    const navigateToConnect = React.useCallback(() => navigation.navigate('Connect'), [navigation]);

    const handleLogout = React.useCallback(
        () => persistor.purge().then(() => {
            dispatch(appActions.logout())
            dispatch(appActions.logout(undefined));
            dispatch(appActions.updateAuthToken(''));
            dispatch(appActions.setWalletAddress([{ address: '' }]));
            dispatch(appActions.updateUser({})
            );
            dispatch(
                appActions.setCountry('')
            )
            // dispatch(
            //     appActions.setDocument('')
            // )
            dispatch(appActions.setFrontSide(''));
            dispatch(appActions.setBackSide(''));
            dispatch(appActions.setPicture(''));
            dispatch(appActions.setCameraPicture(''));

            dispatch(appActions.setVerified(false));
            dispatch(appActions.setRejection(null));

            // dispatch(appActions.setMnemonicCode('""'));
            // dispatch(appActions.setPassword(''));
            // dispatch(appActions.setRewardData({}));
            // dispatch(appActions.setMetaData(''));
        }),
        [persistor, dispatch],
    );
    const handleKyc = React.useCallback(() => {
        // if(appCtx.user?.email){
        //     if (appCtx.country && (appCtx.frontSide || appCtx.backSide) && (appCtx.picture || appCtx.cameraPicture)) {
        //         navigation.navigate('ThankYou');
        //     }
        //     else {
        //         if (appCtx.verified) {
        //             navigation.navigate('ThankYou');
        //         }
        //         else {
        //             navigation.navigate('kycTermsAndCondition');
        //         }
        //     }
        // }
        // else{
        //     navigation.navigate('kycTermsAndCondition');
        // }
        navigation.navigate('KycTermsAndCondition');
    }, [navigation])
    // const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
    const handlePress = useCallback(async (url) => {
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

    return (
        <ScrollView className={'flex flex-col gap-y-10 bg-blue-900'}>

            <TouchableOpacity className={'p-5 bg-indigo-800 shadow-2xl mb-2 flex flex-row gap-x-3 items-center'}>
                <Image
                    className={'w-[30px] h-[30px]'}
                    source={require('../../../assets/authorized-view/profile-green.png')}
                />
                <Text className={'text-xl text-white'}>{email}</Text>
            </TouchableOpacity>
            <View className={'flex flex-col mx-5 rounded-2xl bg-white overflow-hidden shadow-2xl'}>
                <TouchableOpacity className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}>
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/profileOptions/Mainnet.png')}
                    />
                    <View className='flex flex-row justify-between items-center w-[80%]'>
                        <Text className={'text-lg text-white'}>My Profile</Text>
                        {/* <Switch onChange={()=>{setNetwork(!network)}} value={network}></Switch> */}
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={navigateToFAQ}
                    className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}
                >
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/profileOptions/support.png')}
                    />
                    <Text className={'text-lg text-white'}>Support</Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                    onPress={navigateToConnect}
                    className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}
                >
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/profileOptions/connect.png')}
                    />
                    <Text className={'text-lg text-white'}>Contact us</Text>
                </TouchableOpacity> */}



                <TouchableOpacity onPress={handleLogout} className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}>
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/profileOptions/Logout.png')}
                    />
                    <Text className={'text-lg text-white'}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('SpinTheWheel')}} className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}>
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/wheel/spin6.png')}
                    />
                    <Text className={'text-lg text-white'}>Spin The Wheel</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={navigateToConnect}
                    className={'flex flex-row items-center gap-x-2 pt- h-[80px] px-3 items-star border-b border-b-gray-300 bg-indigo-900'}
                >
                    <Image
                        className={'w-[35px] h-[60px]'}
                        resizeMode={'contain'}
                        source={require('../../../assets/profileOptions/connect.png')}
                    />
                    <Text className={'text-lg text-white'}>Exit the game</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
    );
};

export default ProfileOptions;
