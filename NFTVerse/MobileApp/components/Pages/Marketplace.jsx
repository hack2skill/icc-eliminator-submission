import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function Marketplace() {
    return (
        <ScrollView className="bg-blue-900 w-full min-h-screen flex flex-col"
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <View className="flex flex-col justify-center items-center w-screen min-h-screen">
                <Text className="text-white text-[30px]">Marketplace Coming Soon</Text>
            </View>
        </ScrollView>
    )
}