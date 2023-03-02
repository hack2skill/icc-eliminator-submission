import { Button, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import BlackPrimaryButton from '../common/BlackPrimaryButton'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';

export default function Contest({ navigation }) {
  const matches = [{
    heading: 'Play with 1 cards',
  },
  {
    heading: 'Play with 1 cards',
  },
  {
    heading: 'Play with 1 cards',
  },
  {
    heading: 'Play with 1 cards',
  }
  ];
  const appCtx = useSelector((state)=>state.app)
  return (
    <ScrollView className="flex flex-col gap-5 min-h-screen bg-blue-900">
      <View className="pt-2 w-full">
        <Image source={require('../../assets/contest/contesthead.png')} resizeMode={'contain'} className="w-screen">
        </Image>
      </View>
      <View className="flex-2 flex-row flex-wrap items-center justify-center gap-2 w-[90%]">
        <BlackPrimaryButton primary={true} className="w-[45%]">Ongoing Contest</BlackPrimaryButton>
        <BlackPrimaryButton className="w-[45%]">Completed Contest</BlackPrimaryButton>
      </View>
      <FlatList
        className={`flex flex-col mb-[150px]`}
        contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
        numColumns={1}
        // onRefresh={loadData}
        // refreshing={isLoading}
        data={matches}
        extraData={matches}
        ListEmptyComponent={(items) => (
          <>
            {isLoading ?
              <View className={`flex-1 ${navigation && 'mx-2 py-2'} w-screen flex-row flex-wrap`}>
                <NftViewSkeleton />
                <NftViewSkeleton />
                <NftViewSkeleton />
              </View>
              :
              <View className="w-[100%] min-h-[200px] flex flex-row justify-center items-center">
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} >No incoming matches</Text>
              </View>
            }
          </>
        )}
        renderItem={({ item, index }) => {
          return (
            <>
              <Pressable
                className="flex flex-wrap flex-row justify-between items-center bg-blue-800 rounded-[30px] w-[80%] p-3 mb-5"
              >
                <View className="">
                  <Image source={require('../../assets/contest/team1.png')} resizeMode={'contain'}></Image>
                </View>
                <View className="flex flex-col justify-center items-center gap-y-2">
                  <Text className="text-orange-600 font-bold text-[15px]">{item?.heading}</Text>
                  <View className="flex flex-row justify-center">
                    <Image source={require('../../assets/contest/bat.png')} resizeMode={'contain'}></Image>
                  </View>
                  <BlackPrimaryButton primary={true}
                    onPress={() => { appCtx.walletAddress[0]?.address?navigation.navigate('JoinContest') : navigation.navigate('Wallet',{fromContest:true}) }}
                  >Play Now</BlackPrimaryButton>
                </View>
                <View>
                  <Image source={require('../../assets/contest/team2.png')} resizeMode={'contain'}></Image>
                </View>
              </Pressable>
            </>
          )
        }}
      />
    </ScrollView>
  )
}