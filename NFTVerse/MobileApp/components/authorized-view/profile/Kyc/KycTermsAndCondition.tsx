import React, { useState,useEffect } from 'react'
import { Text } from 'react-native-paper'
import { View, Image } from 'react-native'
import BlackPrimaryButton from '../../../common/BlackPrimaryButton'
import Checkbox from 'expo-checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { StoreStateType } from '../../../../misc/types'

export default function KycTermsAndCondition({ navigation }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const appCtx = useSelector((state: StoreStateType) => state.app)

  useEffect(()=>{
    console.log(appCtx.verified);
    
    if(appCtx.verified){
        navigation.navigate('ThankYou')
    }
    else{
      if(appCtx.frontSide && appCtx.backSide && (appCtx.cameraPicture || appCtx.picture)){
        navigation.navigate('ThankYou')
      }
    }
},[appCtx.verified])
  return (
    <ScrollView className='flex gap-5'>
      <View className='flex flex-row justify-center'>
        {/* <div className="w-[100%] text-center twxt-[12px] font-medium">You need to complete your <b>KYC</b> to buy Tale coins and Algos</div> */}
        <View className="w-[100%] flex flex-col-reverse lg:flex-row justify-between items-center gap-x-2">
          <View className="lg:w-[50%] px-[20px] flex flex-col justify-center items-start bg-gray-300 rounded-xl gap-5 py-[30px]">
            <Text className="text-[16px] text-justify font-semibold">Please prepare your identity document and ensure that it is valid before you begin. We also require you to accept our terms and conditions and consent to the processing of your personal data.</Text>
            <View className="flex flex-row items-center text-[12px] gap-2"><Checkbox value={checked1} onValueChange={() => setChecked1(!checked1)} /><Text>By clicking next. I accept terms and Policy</Text></View>
            <View className="flex flex-row items-center text-[12px] gap-2"><Checkbox value={checked2} onValueChange={() => setChecked2(!checked2)} />
              <View className='flex'>
                <Text className=''>I agree to the processing of my data as</Text><Text> describe to the content of data processing.</Text>
              </View>
            </View>
          </View>
          <View className="w-[90%]">
            <Image source={require("../../../../assets/kyc/kycverify.png")} resizeMode={'contain'} className="w-[100%]"/>
          </View>
        </View>
      </View>
      <View className='flex flex-row justify-center'>
      {checked1 && checked2 &&
        <BlackPrimaryButton primary={true} className="w-[250px] h-[40px] mb-[40px]" onPress={() => { navigation.navigate('KycVerification') }}>Next</BlackPrimaryButton>
      }
      </View>
    </ScrollView >
  )
}