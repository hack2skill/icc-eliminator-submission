import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Colors, Images } from '../../config'
import { ScrollView } from 'react-native-gesture-handler'
import BackgroundNav from '../../components/BackgroundNav'

const Ticket = ({navigation}) => {
  return (
    <View>
      <ScrollView>

      <BackgroundNav onHomePress={() => navigation.navigate('Home')} onMenuPress={() => navigation.navigate('Menu')}/>

      <View style={styles.ticketDiv}>
        <Image resizeMode="contain" source={Images.ticketImg} style={styles.ticket} />
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ticket:{
    alignItems:'center',
    justifyContent:'center',
    width: Dimensions.get('window').width,
    height:820,
    marginTop:-220,
    marginBottom:30
  },

});

export default Ticket