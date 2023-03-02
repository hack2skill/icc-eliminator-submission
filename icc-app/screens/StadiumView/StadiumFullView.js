import { StyleSheet, Text, View,Dimensions, TouchableHighlight } from 'react-native'
import React from 'react'
import {WebView} from 'react-native-webview'
import ButtonMedium from '../../components/ButtonMedium'
import { Pressable } from 'react-native'
import NavBar from '../../components/NavBar'
import { Colors, Images } from '../../config'


const StadiumFullView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NavBar icon={Images.menu}/>
    <View style={{width:"100%",height:'85%'}}>
          <WebView style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height}}
    originWhitelist={['*']} 
    source={{html: '<iframe src="https://www.google.com/maps/embed?pb=!4v1677561306556!6m8!1m7!1sCAoSLEFGMVFpcFB3REtIZkJTMEVpbkJQV3ZNYzF1RmhMRjdHc2JVUGxTZ0l5UVBS!2m2!1d23.0918122!2d72.5975275!3f319.2164792060018!4f1.8417179686140344!5f0.7820865974627469" width="100%" height="96%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }}
  />
<Pressable  style={{alignSelf:'center', justifyContent : "center"}} onPress = {() => navigation.navigate('StadiumViewAngle')}>
  
    <ButtonMedium  title = 'Confirm Slot' />
  
</Pressable>


    </View>
    </View>

  )
}

export default StadiumFullView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    }
})