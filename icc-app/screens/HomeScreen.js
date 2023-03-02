import React from 'react';
import { View, StyleSheet, Button, Text, TouchableHighlight, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';

import { auth, Images } from '../config';
import { Colors } from '../config';

// Components Import
import PurchasedMatchCard from '../components/PurchasedMatchCard';
import MatchCard from '../components/MatchCard';
import BackgroundNav from '../components/BackgroundNav';
import { ScrollView } from 'react-native-gesture-handler';

export const HomeScreen = ({navigation}) => {
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  return (

    <View style={styles.container}>

      <BackgroundNav heading="Purchased Match Tickets" subhead="Ready, Set, Cricket: Your Tickets to the Action!" onMenuPress={() => navigation.navigate('Menu')} onHomePress={() => navigation.navigate('Home')}/>

      <Pressable onPress={() => navigation.navigate('Ticket')}>

        <View style={styles.purchasedCardView}>
          <PurchasedMatchCard matchType="T20I" country_a="INDIA" country_b="AUSTRALIA" flag_a={Images.india} flag_b={Images.australia} timings="5th Mar 2023, 10:30am"/>
        </View>
      </Pressable>

      <View style={{flexDirection:'row', alignItems:'center', marginTop:30}}>
        <Text style={{fontSize:19, fontFamily:'HindSiliguriSemiBold'}}>Upcoming Matches</Text>
        <Pressable onPress={() => navigation.navigate('UpcomingMatch')} style={{ width:60, marginLeft:130}}>
          
          <Text style={{fontFamily:'HindSiliguriRegular'}}>View all</Text>
        </Pressable>
      </View>
    <ScrollView>
      <View style={styles.matchCardView}>
        <Pressable onPress={()=>{navigation.navigate('StadiumView')}}>
          <MatchCard matchType="TEST" country_a="ENGLAND" country_b="NEW ZEALAND" flag_a={Images.england} flag_b={Images.newzeland} timings="16th Apr 2023, 09:30am" />
        </Pressable>
        
            <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />


        <Pressable onPress={()=>{navigation.navigate('StadiumView')}}>
           <MatchCard matchType="TEST" country_a="INDIA" country_b="AUSTRALIA" flag_a={Images.india} flag_b={Images.australia} timings="5th May 2023, 11:30am" />
        </Pressable>

       
          <MatchCard matchType="TEST" country_a="NEW ZEALAND" country_b="THAILAND" flag_a={Images.newzeland} flag_b={Images.thailand} timings="15th Jun 2023, 10:30am" />

      </View>
    </ScrollView>


      {/* <Button title='Sign Out' onPress={handleLogout} /> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  purchasedCardView: {
    marginTop: -170,
  },
  matchCardView:{
    marginBottom:50
  },
});
