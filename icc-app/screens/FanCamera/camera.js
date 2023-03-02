import { View, StyleSheet , Dimensions, Pressable} from 'react-native'
import React from 'react'
import BackgroundNav from '../../components/BackgroundNav'
import { Colors } from '../../config'
import ButtonMedium from '../../components/ButtonMedium'
import {WebView} from 'react-native-webview'
import { useState } from 'react'
const Camera = ({navigation}) => {
 
  return (
    <View style={{alignItems:'center'}}>
      <BackgroundNav heading="Say Cheese!" subhead="Let's make the moment yours with FanCam" onMenuPress={() => navigation.navigate('Menu')} onHomePress={() => navigation.navigate('Home')}/>

      <View style={styles.camera}>
          {/* Put the Camera feed here */}

          <WebView style={{width:Dimensions.get('window').width, height:450, backgroundColor:Colors.white}} 
            originWhitelist={['*']} 
            source={{html: '<img src="http://172.20.10.2:8080/?action=stream">'}}
          />
          
      </View>
    <Pressable onPress={() => navigation.navigate('YourCollections')}>

        <ButtonMedium title="View Photo"/>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    camera:{
        width:'90%',
        height:490,
        marginTop:-140,
        marginBottom:30,
        borderRadius:10,
        elevation:1,
        backgroundColor:Colors.white,
    }
});

export default Camera