import { View, Text, Image } from 'react-native'
import React from 'react'
import LiveRound from '../LiveRound/LiveRound'
import { ScrollView } from 'react-native-gesture-handler'
import BlackPrimaryButton from '../common/BlackPrimaryButton'

export default function ThrowCard({ navigation, route }) {
    console.log(route);
    return (
        <ScrollView className="flex flex-col gap-5 min-h-screen bg-blue-900"
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            {/* <LiveRound /> */}
            <View className="p-3">
                <Image source={require('../../assets/throwcard/player.png')} resizeMode={'contain'} className="">
                </Image>
            </View>
            <View className="flex bg-indigo-700 rounded-[30px] p-5 w-[90%] mt-5">
                <View className="flex flex-row justify-between items-center">
                    <View className="flex items-center">
                        <Text className="text-white text-[16px] font-bold">Match Played</Text>
                        <Text className="text-blue-200 text-[30px]">62</Text>
                    </View>
                    <View className="flex items-center">
                        <Text className="text-white text-[16px] font-bold">Total runs</Text>
                        <Text className="text-blue-200 text-[30px]">8</Text>
                    </View>
                    <View className="flex items-center">
                        <Text className="text-white text-[16px] font-bold">Wickets taken</Text>
                        <Text className="text-blue-200 text-[30px]">70</Text>
                    </View>
                </View>
                <View className="flex flex-row justify-center items-center gap-x-10 mt-4">
                    <View className="flex items-center">
                        <Text className="text-white text-[16px] font-bold">Highest score</Text>
                        <Text className="text-blue-200 text-[30px]">62</Text>
                    </View>
                    <View className="flex items-center">
                        <Text className="text-white text-[16px] font-bold">Stumping</Text>
                        <Text className="text-blue-200 text-[30px]">8</Text>
                    </View>
                </View>
            </View>
            <View className="flex justify-center items-center gap-2 mb-[50px]">
                <BlackPrimaryButton className={`w-[200px]`} primary={true} onPress={() => {
                    // route.params.setOpenModal(true)
                    // route.params.setTossResult('')
                    navigation.navigate('LiveMatch',{thrown:true,card:route?.params?.card})
                }}>Throw Card</BlackPrimaryButton>
            </View>

        </ScrollView>
    )
}