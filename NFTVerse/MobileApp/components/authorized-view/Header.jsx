import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Header = ({ navigation }) => {
    const Tab = createBottomTabNavigator();
    const handleProfile = React.useCallback(() => {
        console.log(navigation);

        navigation?.navigate('ProfileOptions')
    }, [navigation]);

    return (
        <View className={'flex flex-row px-3 py-3 items-center justify-between shadow-2xl gap-x-3 bg-blue-900'}>
            <TouchableOpacity onPress={()=>{navigation?.navigate('Wallet')}} className="flex flex-row items-center">
                <Image source={require('../../assets/common/logo.png')} className={'w-[45px] h-[45px]'} />
                <Text className={'text-lg text-white flex-grow font-bold'}>Crick Tales</Text>
            </TouchableOpacity>
            {navigation &&
                <Pressable onPress={handleProfile} className={' p-2 rounded-lg flex flex-row items-center'}>
                    <Image
                        className={'w-[30px] h-[30px]'}
                        source={require(`../../assets/authorized-view/profile-green.png`)}
                    />
                </Pressable>
            }
        </View>
    );
};

export default Header;
