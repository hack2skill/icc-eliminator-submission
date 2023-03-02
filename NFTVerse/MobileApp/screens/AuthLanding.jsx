import React, { FC } from 'react';
import { Image, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GreenOutlinedButton from '../components/common/GreenOutlinedButton';
import BlackPrimaryButton from '../components/common/BlackPrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';

const AuthLanding = ({ navigation }) => {
    const handleNavigateToEmailAuth = React.useCallback(() => {
        navigation.navigate('EmailAuth');
    }, [navigation]);

    return (
        <SafeAreaView>
            <ImageBackground source={require('../assets/auth/authbg.png')} resizeMode={'cover'} className="w-screen min-h-screen">
            
            <ScrollView className={'w-screen min-h-screen flex flex-col gap-y-16'}>
                <Image resizeMode={'contain'} className="w-[100%] relative" source={require('../assets/auth/header.png')}/>
                <View className={'flex flex-col gap-y-10 w-[100%] justify-center items-center'}>
                    <Text className={'text-[30px] text-white font-bold'}>Welcome to Cric Tales</Text>
                    <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={handleNavigateToEmailAuth}>
                        <Text className={'text-center text-lg'}>Sign In</Text>
                    </BlackPrimaryButton>
                    <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={handleNavigateToEmailAuth}>
                        <Text className={'text-center text-lg'}>Create account</Text>
                    </BlackPrimaryButton>
                    {/* <GreenOutlinedButton>
                        <Text className={'text-center text-lg'}>Create Account</Text>
                    </GreenOutlinedButton>
                    <GreenOutlinedButton>
                        <Text className={'text-center text-lg'}>Already have an Account</Text>
                    </GreenOutlinedButton> */}
                </View>
                <View className={'flex flex-col items-center mx-auto'}>
                    <Text>Powered By Tale Wallet </Text>
                    {/* <Text className={'text-blue-500'} onPress={()=>{navigation.navigate('TAC')}}>Terms of Service and Privacy Policy</Text> */}
                </View>
            </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default AuthLanding;
