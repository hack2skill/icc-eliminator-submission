import { StyleSheet, Text, View,Image, Dimensions,Button, Pressable } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../config'
import NavBar from '../../components/NavBar'
import ButtonMedium from '../../components/ButtonMedium'



const BOTTOM_SHEET_MAX_HEIGHT =( Dimensions.get('window').height) * 0.7
const BOTTOM_SHEET_MIN_HEIGHT =( Dimensions.get('window').height) * 0.1 

const StadiumView = ({navigation}) => {
  return (
    <View style={{backgroundColor:Colors.white}}>
      <NavBar icon={Images.menu}/>
      <Image style={styles.stadiumImage} source={Images.stadiumView}/>
        <View style={styles.stadiumBottomBar}>
        <View style={{flexDirection:'row',marginTop:30}}>
            <Text style={{marginLeft:25, fontFamily:'HindSiliguriMedium', fontSize:16}}>1-5 Mar, 9:30am</Text>
            <Text style={{marginLeft:'50%', fontFamily:'HindSiliguriSemiBold'}}>T20I</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
        <View style={{flexDirection:'column'}}>
            <Image source={Images.india} style={{width:40,height:40}}/>
            <Text style={{alignSelf:'center', fontFamily:'HindSiliguriSemiBold', fontSize:16}}>India</Text>
        </View>
        <Text style={{marginTop:35,alignSelf:'center', fontFamily:'HindSiliguriBold', fontSize:16}}>VS</Text>
        <View style={{flexDirection:'column'}}>
            <Image source={Images.australia} style={{width:40,height:40,alignSelf:'center'}}/>
            <Text style={{alignSelf:'center', fontFamily:'HindSiliguriSemiBold', fontSize:16}}>Australia</Text>
        </View>
        </View>
        <Text style={{alignSelf:'center',marginTop:15,color:'#9F9F9F', fontFamily:'HindSiliguriMedium', fontSize:14}}>Test 3 of 4 (IND leads 2-0)</Text>
        <View style={{borderBottomColor: '#DADADA',borderBottomWidth: 1,marginTop:15,marginBottom:10}}/>
        <View>
          <Text  style={{fontSize:18,marginLeft:20, fontFamily:'HindSiliguriBold'}}>Stadium Details </Text>
          <Text  style={{fontSize:16,marginLeft:30,color:'#9F9F9F',marginTop:10, fontFamily:'HindSiliguriSemiBold'}}>Narendra Modi Stadium</Text>
          <Text  style={{fontSize:16,marginLeft:30,color:'#9F9F9F', fontFamily:'HindSiliguriRegular', marginTop:-5}}>Stadium Rd, Parvati Nagar,</Text>
          <Text  style={{fontSize:16,marginLeft:30,color:'#9F9F9F', fontFamily:'HindSiliguriRegular', marginTop:-5}}>Motera, Ahmedabad, Gujarat 380005</Text>
          <Text style={{fontSize:16,marginLeft:30,color:'#2BA0F4',marginTop:10,textDecorationLine:'underline', fontFamily:'HindSiliguriRegular'}}>Get Directions</Text>
          <View style={{flexDirection: 'row', justifyContent:'center', marginTop:30}}>
            <Pressable onPress={() => navigation.navigate('StadiumViewAngle')}>
              <ButtonMedium title="Viewing Angle"/>
            </Pressable>
            <View style={{marginLeft:15}}>
              <Pressable>
                <ButtonMedium  onPress={() => navigation.navigate('StadiumViewAngle')} title="Book Tickets"/>
              </Pressable>
            </View>
          </View>
          <View>
        </View>
        </View>
      </View>
    </View>
  )
}

export default StadiumView

const styles = StyleSheet.create({
  stadiumImage:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height/2.3,
    zIndex:-1,
    marginBottom:-20
  },
  stadiumBottomBar:{
    height:Dimensions.get('window').height/1.8,
    width:Dimensions.get('window').width,
    // backgroundColor:'#F2F5F8',
    backgroundColor: Colors.white,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    zIndex:1,
    position:'absolute',
    top:380
  }
})