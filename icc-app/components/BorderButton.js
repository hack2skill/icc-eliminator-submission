import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../config'

const BorderButton = props => {
  return (
    <View style={{width:150, height:45, borderColor: Colors.blue, borderWidth:1 ,borderRadius:6, alignItems:'center', justifyContent:'center'}}>
     
        {/* <Text>Hi</Text> */}
      
    </View>
  )
}

export default BorderButton