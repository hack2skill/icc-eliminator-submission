import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors, Images } from '../config'

const MatchCard = props => {
  return (
    <View>
      <View style={styles.PurchasedMatchCard}>
        <View style={{alignItems:'center', justifyContent:'center' ,flexDirection:'row', marginTop:20}}>
            <Text style={{fontFamily: 'HindSiliguriBold'}}>{props.matchType}</Text>
            <Text style={{marginLeft: '40%', fontFamily: 'HindSiliguriMedium'}}>{props.timings}</Text>
        </View>

        <View style={{marginLeft:20, height: 150}}>
            <View style={{alignItems:'center',flexDirection:'row', marginTop: -20}}>
                <Image style={styles.flag} source={props.flag_a}/>
                <Text style={{marginLeft: 5, fontSize: 15,  fontFamily: 'HindSiliguriBold'}}>{props.country_a}</Text>
            </View>

            <View style={{alignItems:'center',flexDirection:'row', marginTop: -70}}>
                <Image style={styles.flag} source={props.flag_b}/>
                <Text style={{marginLeft: 5, fontSize: 15,  fontFamily: 'HindSiliguriBold'}}>{props.country_b}</Text>
            </View>
        </View>

        <View style={{alignItems:'center',flexDirection:'row', marginLeft:15, marginTop: -40}}>           
            <Image style={styles.location} source={Images.cardLocation}/>
            <Text style={{marginLeft:5, fontSize:14}}>Narendra Modi Stadium, Gujarat, India</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    PurchasedMatchCard: {
      width: 375,
      backgroundColor: Colors.white,
      borderRadius: 10,
      marginTop: 30,
    },
    head: {
        backgroundColor: Colors.red,
    },
    flag: {
        width: 40,
        resizeMode: 'contain',
    },
    location:{
        width: 20,
        resizeMode: 'contain',
    },
  });

export default MatchCard