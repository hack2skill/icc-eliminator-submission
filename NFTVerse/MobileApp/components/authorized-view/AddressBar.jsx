import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { useSelector } from 'react-redux';
import * as Clipboard from 'expo-clipboard';


export default function AddressBar() {
    const appCtx = useSelector((state) => state.app);

    const copyToClipboard = () => {
        Clipboard.setString(appCtx?.walletAddress[0]?.address)
    }
    return (
        <View className='flex flex-row gap-3 items-center bg-indigo-700 px-[10px] pb-3 rounded-[20px] '>
            <View className='w-[30px] h-[30px] bg-orange-300 rounded-full'>
            </View>
            <Text className='text-[15px] font-medium text-white'>{appCtx.walletAddress[0]?.address?.substring(0, 15) || 'loading'}...</Text>
            <TouchableOpacity onPress={() => { copyToClipboard() }}>
                <Image className={'w-[30px] h-[30px]'} source={require('../../assets/common/copy.png')} />
            </TouchableOpacity>
        </View>
    )
}