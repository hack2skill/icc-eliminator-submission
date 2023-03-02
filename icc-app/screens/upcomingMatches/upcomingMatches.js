import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import BackgroundNav from '../../components/BackgroundNav'
import MatchCard from '../../components/MatchCard'
import { Colors, Images } from '../../config'

const UpcomingMatches = ({navigation}) => {
  return (
    <View>
      <BackgroundNav heading="Upcoming Matches" subhead="Book your tickets for the upcoming matches!" onHomePress={() => navigation.navigate('Home')} onMenuPress={() => navigation.navigate('Menu')}/>

    <ScrollView style={{height:600 , marginTop:-150}}>
      <View style={{alignItems:'center'}}>
        <MatchCard matchType="TEST" country_a="INDIA" country_b="AUSTRALIA" flag_a={Images.india} flag_b={Images.australia} timings="5th May 2023, 11:30am" />
        <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />
        <MatchCard matchType="TEST" country_a="AUSTRALIA" country_b="INDIA" flag_a={Images.australia} flag_b={Images.india} timings="5th May 2023, 11:30am" />
        <MatchCard matchType="TEST" country_a="NEW ZEALAND" country_b="THAILAND" flag_a={Images.newzeland} flag_b={Images.thailand} timings="15th Jun 2023, 10:30am" />
        <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />
        <MatchCard matchType="TEST" country_a="AUSTRALIA" country_b="INDIA" flag_a={Images.australia} flag_b={Images.india} timings="5th May 2023, 11:30am" />
        <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />
        <MatchCard matchType="TEST" country_a="NEW ZEALAND" country_b="THAILAND" flag_a={Images.newzeland} flag_b={Images.thailand} timings="15th Jun 2023, 10:30am" />
        <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />
        <MatchCard matchType="TEST" country_a="AUSTRALIA" country_b="INDIA" flag_a={Images.australia} flag_b={Images.india} timings="5th May 2023, 11:30am" />
        <MatchCard matchType="T20I" country_a="SAUDI ARABIA" country_b="THAILAND" flag_a={Images.saudiarabia} flag_b={Images.thailand} timings="25th Apr 2023, 06:30pm" />

      </View>
    </ScrollView>

    </View>
  )
}

export default UpcomingMatches