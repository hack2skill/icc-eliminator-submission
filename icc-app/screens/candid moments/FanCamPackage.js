import { StyleSheet, Text, View,Image, Dimensions} from 'react-native'
import React from 'react'
import { Images } from '../../config'
import BackgroundNav from '../../components/BackgroundNav'
import { ScrollView } from 'react-native-gesture-handler'
import { Pressable } from 'react-native'

const FanCamPackage = ({navigation}) => {
  return (
    <View>
        <BackgroundNav heading="Select your Fan Cam Package" subhead="Freeze your wonderful moments with ICC Fan Cam!" onHomePress={() => navigation.pop()} onMenuPress={() => navigation.navigate('Menu')}/>
        <View style={styles.FanCamPackageContainer}>
    
    <ScrollView>
    <View style={{flexDirection:'row', justifyContent:'center',width:Dimensions.get('window').width, marginTop:60}}>    
      <View style={{marginTop:30}}>
       
       <Pressable onPress = {() => navigation.navigate('Candid') }>
       <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18,textAlign:'center'}}>Capture Candid Moments</Text>
        </View>
       </Pressable>

          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Rolling Shots</Text>
          </View>

          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold',fontSize:18,textAlign:'center'}}>Say Cheese Moment</Text>
          </View>

        </View>

        <View style={{marginTop:30, marginLeft:20}}>
          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Solo Portraits</Text>
          </View>

          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Group Selfies</Text>
          </View>

          <View style={styles.menuCard}>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Live Capture</Text>
          </View>
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
        borderColor:'#DBDBDB',
    },
})

export default FanCamPackage