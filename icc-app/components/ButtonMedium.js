import { View, Text, Pressable, onPress } from 'react-native'
import React from 'react'
import { Colors } from '../config'

const ButtonMedium = props => {
  return (
    <View style={{width:175, height:50, backgroundColor:Colors.blue, borderRadius:6, alignItems:'center', justifyContent:'center'}}>
      
        <Text style={{color:Colors.white, fontSize:15, fontFamily:'HindSiliguriSemiBold'}}>{props.title}</Text>
      
    </View>
  )
}

export default ButtonMedium