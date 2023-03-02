import React from 'react';
import { View } from 'react-native';

const NftViewSkeleton: React.FC = () => {
    return (
        <View className={'rounded-xl w-[45vw] border-gray-200 border-2 p-1 animate-pulse flex flex-col gap-y-2 m-1'}>
            <View className={'bg-gray-200 rounded-t-xl h-[150px] w-full'} />
            <View className={'w-full flex flex-row justify-between items-center'}>
                <View className={'h-2 w-[50%] rounded-full bg-gray-200'} />
                <View className={'h-2 w-[20%] rounded-full bg-gray-200'} />
            </View>
            <View className={'w-full flex flex-row justify-between items-center'}>
                <View className={'flex flex-col gap-y-2'}>
                    <View className={'h-2 w-[20vw] rounded-full bg-gray-200'} />
                    <View className={'h-2 w-[10vw] rounded-full bg-gray-200'} />
                </View>
                <View className={'flex flex-col gap-y-2'}>
                    <View className={'h-2 w-[20vw] rounded-full bg-gray-200'} />
                    <View className={'h-2 w-[10vw] rounded-full bg-gray-200'} />
                </View>
            </View>
            <View className={'flex flex-row items-center gap-x-2'}>
                <View className={'w-[15px] h-[15px] rounded-full bg-gray-200'} />
                <View className={'w-[20vw] h-2 rounded-full bg-gray-200'} />
            </View>
        </View>
    );
};

export default NftViewSkeleton;
