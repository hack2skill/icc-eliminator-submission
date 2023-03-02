import { View, Text, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BlackPrimaryButton from '../common/BlackPrimaryButton'

export default function JoinContest({ navigation }) {
    return (
        <ScrollView className="bg-blue-900 w-full min-h-screen flex flex-col"
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <View className="flex flex-col justify-center items-center w-screen min-h-screen">
                <View className="flex flex-col items-center bg-indigo-700 rounded-[30px] p-5 w-[90%] mt-5">
                    <Text className="text-white text-[15px] font-bold">Rewards for this contest</Text>
                    <View className="flex flex-row justify-between items-center w-[90%] p-5">
                        <View className="">
                            <Image source={require('../../assets/joincontest/cards.png')} resizeMode={'contain'} className="">
                            </Image>
                            <Text className="text-white font-medium">one Card</Text>
                        </View>
                        <View className="">
                            <Image source={require('../../assets/joincontest/tokens.png')} resizeMode={'contain'} className="">
                            </Image>
                            <Text className="text-white font-medium">5 tokens</Text>
                        </View>
                    </View>
                </View>
                <View className="pt-5">
                    <BlackPrimaryButton primary={true} className="w-[200px] py-1" onPress={()=>{navigation.navigate('LiveMatch',{card:Math.floor(Math.random()*7)})}}>Join the contest</BlackPrimaryButton>
                </View>
            </View>
        </ScrollView>
    )
}