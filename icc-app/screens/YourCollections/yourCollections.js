import { StyleSheet, Text, View,Image, Dimensions} from 'react-native'
import React from 'react'
import { Images } from '../../config'
import BackgroundNav from '../../components/BackgroundNav'
import { ScrollView } from 'react-native-gesture-handler'

const YourCollections = ({navigation}) => {
  return (
    <View>
      <BackgroundNav heading="Your Collections" subhead="Wonderful moments of your stadium life!" onHomePress={() => navigation.navigate('Home')}/>
        <View style={styles.FanCamPackageContainer}>
    
    <ScrollView>
    <View style={{flexDirection:'row', justifyContent:'center',width:Dimensions.get('window').width, marginTop:70}}>    
      <View style={{marginTop:30}}>
          <View style={styles.menuCard}>
              {/* <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18,textAlign:'center'}}>Capture Candid Moments</Text> */}
              <Image style={{width:170, height:170, borderRadius:15}} source={Images.aud1}/>
          </View>

          <View style={styles.menuCard}>
              {/* <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Rolling Shots</Text> */}
              <Image style={{width:170, height:170, borderRadius:15}} source={Images.aud2}/>
          </View>

          {/* <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18,textAlign:'center'}}>Say Cheese Moment</Text>
          </View> */}

        </View>

        <View style={{marginTop:30, marginLeft:20}}>
          <View style={styles.menuCard}>
              {/* <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Solo Portraits</Text> */}
              <Image style={{width:170, height:170, borderRadius:15}} source={Images.aud3}/>
          </View>

          <View style={styles.menuCard}>
              {/* <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Group Selfies</Text> */}
              <Image style={{width:170, height:170, borderRadius:15}} source={Images.aud4}/>
          </View>
{/* 
          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Live Capture</Text>
          </View> */}
        </View>
    </View>
    </ScrollView>
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    FanCamPackageContainer:{
        position:'absolute',
        top:160,
    },
    menuCard:{
        width: 170,
        height: 170,
        backgroundColor:"white",
        alignItems: 'center',
        justifyContent:'center', 
        borderRadius: 15,
        elevation:1,
        marginBottom:15,
        borderWidth:1,
        borderColor:'#DBDBDB'
    },
})

export default YourCollections