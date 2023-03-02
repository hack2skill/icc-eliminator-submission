import { View, Text,Dimensions } from 'react-native'
import React from 'react'
import BlackPrimaryButton from '../common/BlackPrimaryButton';

export default function LiveRound() {
    const { width } = Dimensions.get('window');
    const [slider, setSlider] = React.useState({ currentPage: 0 });

    return (
        <View className="flex flex-row justify-between items-center w-[90%] h-[150px] p-5">
            <View className="flex flex-col items-center gap-2">
                <Text className="text-white font-bold text-[15px]">Round 1/5</Text>
                <View className={'flex flex-row justify-center'}>
                    {Array.from(Array(5).keys()).map((key, index) => {
                        return (
                            <View
                                key={key}
                                className={`rounded-full w-3 h-3 mx-1  ${slider.currentPage === index ? 'bg-indigo-300' : 'bg-indigo-700 border border-indigo-600'
                                    }`}
                            />
                        )
                    })}
                </View>
            </View>
            <View className="flex justify-center items-center gap-2">
                <View className="border-[5px] border-cyan-600 rounded-full flex flex-row justify-center items-center h-14 w-14">
                    <Text className="text-white">11:11</Text>
                </View>
                <BlackPrimaryButton primary={true} className="">Your Turn</BlackPrimaryButton>
            </View>
        </View>
    )
}