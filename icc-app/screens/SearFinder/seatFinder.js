import { View, Text, Image } from 'react-native'
import React from 'react'
import BackgroundNav from '../../components/BackgroundNav'
import { Colors, Images } from '../../config'

const SeatFinder = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <BackgroundNav heading="Get Your Seat" subhead="Enjoy hassle free moment in stadium seating!"/>

      <View style={{ marginTop:-150, width:365, height:175, backgroundColor: Colors.white, borderRadius: 10, justifyContent:'center', flexDirection:'row', alignItems:'center'}}>
        <View>
            <View style={{width:165, height:65, justifyContent:'center', borderWidth:1, borderColor: Colors.grey, borderRadius:8, paddingLeft:10}}>
                <Text style={{fontFamily:'HindSiliguriRegular', fontSize:14}}>Mar 1-5, 2023</Text>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:18, marginTop:-5}}>9:30am</Text>
            </View>
            <View style={{width:165, height:65, justifyContent:'center', borderWidth:1, borderColor: Colors.grey, borderRadius:8, marginTop:10, paddingLeft:10}}>
                <Text style={{fontFamily:'HindSiliguriRegular', fontSize:14}}>Seats</Text>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:18, marginTop:-5}}>B1, B2, B3, B4</Text>
            </View>
        </View>

        <View style={{width:160, height:140, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor: Colors.grey, borderRadius:8, marginLeft:10}}> 
            <View style={{alignItems:'center', flexDirection:'row'}}>
                <Image style={{width:35, height:35, resizeMode:'contain'}} source={Images.india}/>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:16, marginLeft:6, marginRight:6}}>VS</Text>
                <Image style={{width:35, height:35,  resizeMode:'contain'}} source={Images.australia}/>
            </View>
            <Text style={{fontFamily:'HindSiliguriMedium', marginTop:10}}>Get Ready to Cheer!</Text>
        </View>
      </View>
    </View>
  )
}

export default SeatFinder