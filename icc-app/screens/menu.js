import { View, Text, Image, StyleSheet, Dimensions, TouchableHighlight} from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'
import { Colors, Images } from '../config'
import { ScrollView } from 'react-native-gesture-handler'
import { Pressable,TouchableOpacity } from 'react-native'


const Menu = ({ navigation }) => {
  return (
    <View>
      <NavBar icon={Images.close} onHomePress={() => navigation.navigate('Home')} onMenuPress={() => navigation.pop()}/>
    <ScrollView>
    <View style={{alignItems:'center'}}>
    <View style={{flexDirection:'row', justifyContent:'center'}}>  
      <View style={{marginTop:30}}>
        <Pressable onPress={() => navigation.navigate('UpcomingMatches')}>
          <View style={styles.menuCard}>
              <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.ticket}/>
              <Text  style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Book Tickets</Text>
          </View>
          </Pressable>
        <Pressable onPress={() =>navigation.navigate('SeatFinder')}>
          <View style={styles.menuCard}>
              <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.seat}/>
              <Text  style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Seat Finder</Text>
          </View>
          </Pressable>

          <Pressable onPress={() =>navigation.navigate('TrafficSystem')} >
          <View  style={styles.menuCard}>
              <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.traffic}/>
              <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Traffic System</Text>
          </View>
          </Pressable>

        </View>

        <View style={{marginTop:30, marginLeft:20}}>
        
        <Pressable onPress={()=>{navigation.navigate('FanCamPackage')}}>
          <View style={styles.menuCard}>
              <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.drone}/>
                <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Fan Cam</Text>
          </View>
          </Pressable>
          <Pressable onPress={() =>navigation.navigate('Home')}>
            <View style={styles.menuCard}>
                <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.live}/>
                <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Hot Replay</Text>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('YourCollections')}>
            <View style={styles.menuCard}>
                <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.gallery}/>
                <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>My Collections</Text>
            </View>
          </Pressable>
        </View>
    </View>

    <View style={styles.menuFlatCard}>
        <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.reward}/>
        <View style={{marginLeft:15}}>
            <Text style={{fontFamily:'HindSiliguriBold', fontSize:20, marginBottom:-6}}>195 ICC</Text>
            <Text style={{fontFamily:'HindSiliguriMedium'}}>Check Reward Points</Text>
        </View>
    </View>

    <View style={{width: 360, height:100, flexDirection:'row', backgroundColor: Colors.white, elevation:1, borderRadius: 15, alignItems: 'center', paddingLeft:30, marginTop:20, marginBottom:150}}>
        <Image style={{width:60, resizeMode:'contain', height:80}} source={Images.settings}/>
        <View style={{marginLeft:15}}>
            {/* <Text style={{fontFamily:'HindSiliguriBold', fontSize:20, marginBottom:-6}}>195 ICC</Text> */}
            <Text style={{fontFamily:'HindSiliguriSemiBold', fontSize:18}}>Settings &#38; Preferences</Text>
        </View>
    </View>

    </View>

    </ScrollView></View>
  )
}

const styles = StyleSheet.create({
    menuCard:{
        width: 170,
        height: 170,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent:'center', 
        borderRadius: 15,
        elevation:1,
        marginBottom:15,
    },
    menuFlatCard:{
        width: 360,
        height:100,
        flexDirection:'row',
        backgroundColor: Colors.white,
        elevation:1,
        borderRadius: 15,
        alignItems: 'center',
        paddingLeft:30,
    },
});

export default Menu