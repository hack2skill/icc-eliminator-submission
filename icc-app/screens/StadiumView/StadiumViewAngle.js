import { StyleSheet, Text, View, Image, Dimensions, Button, ActivityIndicator, Pressable } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import {WebView} from 'react-native-webview'
import { Images, Colors } from '../../config'
import BorderButton from '../../components/BorderButton'
import ButtonMedium from '../../components/ButtonMedium'

const StadiumViewAngle = ({navigation}) => {   
  return (
<View style={{width:"100%",height:'100%'}}>
  <NavBar icon={Images.menu}/>
  
  <WebView style={{width:Dimensions.get('window').width,height:450,zIndex:2,bottom:0}} 
    originWhitelist={['*']} 
    source={{html: '<iframe src="https://www.google.com/maps/embed?pb=!4v1677561306556!6m8!1m7!1sCAoSLEFGMVFpcFB3REtIZkJTMEVpbkJQV3ZNYzF1RmhMRjdHc2JVUGxTZ0l5UVBS!2m2!1d23.0918122!2d72.5975275!3f319.2164792060018!4f1.8417179686140344!5f0.7820865974627469" width="100%" height="43%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
  }}
  />

  <Pressable style={{backgroundColor:'white',position:'absolute',top:120,left:Dimensions.get('window').width - 50,width:30,height:30, zIndex:2}} onPress={() => navigation.navigate('FullView')}>
    <Image style={{width:30,height:30, resizeMode:'contain', alignContent:'center', justifyContent:'center'}} source={Images.fullScreen} />
  </Pressable>



     <View style={styles.BottomBar}>
        
           <Text style={{marginTop:30, marginLeft:20, fontSize:20, fontFamily:'HindSiliguriBold'}}>Confirm your Bookings!</Text>
           
          <View style={{flexDirection:'row', justifyContent:'center', marginTop:20}}>
            <View style={{width:175, height:70, justifyContent:'center', borderWidth:1, borderColor: Colors.grey, borderRadius:8, paddingLeft:12}}>
                <Text style={{fontFamily:'HindSiliguriRegular', fontSize:15}}>Mar 1-5, 2023</Text>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:20, marginTop:-5}}>9:30am</Text>
            </View>
            <View style={{width:175, height:70, justifyContent:'center', borderWidth:1, borderColor: Colors.grey, borderRadius:8, paddingLeft:12, marginLeft:15}}>
                <Text style={{fontFamily:'HindSiliguriRegular', fontSize:15}}>Seats</Text>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:20, marginTop:-5}}>B1, B2, B3, B4</Text>
            </View>
          </View>

           <View>
             <Text style={{marginLeft:20,marginTop:15, fontFamily:'HindSiliguriMedium', fontSize:16}}>Total</Text>
             <Text style={{marginLeft:20,fontSize:24, fontFamily:'HindSiliguriBold'}}>$200</Text>
           </View>

           <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
             <Pressable onPress={() => navigation.navigate('FanCamPack')}>
               <ButtonMedium title='Fan Cam Pack'/>
            </Pressable> 
             <Pressable onPress={() => navigation.navigate('Ticket')}  style={{marginLeft:-15}}>
               <ButtonMedium  title='Confirm Booking'/>
             </Pressable>
           </View>
            <View>
             <Text style={{color:'#2BA0F4',marginLeft:20,marginTop:15,textAlign:'center',textDecorationLine:'underline', fontFamily:'HindSiliguriMedium', fontSize:15}}>Learn How Fan Cam works!</Text>
           </View>
       <View style={{borderBottomColor: '#DADADA',borderBottomWidth: 1,marginTop:20,marginBottom:20}}/>

       <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'center', marginTop:10}}>
            <View>
              <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Image style={{width:35, height:35, resizeMode:'contain'}} source={Images.india}/>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:16, marginLeft:6, marginRight:6}}>VS</Text>
                <Image style={{width:35, height:35,  resizeMode:'contain'}} source={Images.australia}/>
              </View>

              <Text style={{marginTop:6}}>Test 3 of 4 (IND leads 2-0)</Text>
            </View>

          </View>
</View>

</View>



  
  )
        
}

export default StadiumViewAngle

const styles = StyleSheet.create({
  
  BottomBar:{
    height:Dimensions.get('window').height/1.7,
    width:Dimensions.get('window').width,
    backgroundColor:'#ffffff',
    // backgroundColor:'red',
    borderTopRightRadius:25,
    borderTopLeftRadius:25,
    zIndex:1,
    position:'absolute',
    top:370,
    elevation:2
  },
  seatsCard:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height/10,
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:18
  }

})