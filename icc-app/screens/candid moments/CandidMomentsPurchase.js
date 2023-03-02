import { StyleSheet, Text, View,Image, Dimensions, ScrollView, Pressable} from 'react-native'
import React from 'react'
import { Images } from '../../config/images'
import NavBar from '../../components/NavBar'
import ButtonMedium from '../../components/ButtonMedium'

const CandidMomentPurchase = ({navigation}) => {
  return (
    <View style={styles.container}>
        <NavBar icon={Images.menu}/>
        <View style={styles.video}>
            <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/2.6   ,justifyContent:'center',alignItems:'center'}}>
                <Image  style={{width:50,height:50}} source={Images.VideoPlayer}/>
            </View>
        </View>

        <View style={styles.BottomBar}>
                <Text style={{marginLeft:20,marginTop:30, fontFamily:'HindSiliguriSemiBold',fontSize:21}}>Capture Candid Moments</Text>
                <Text style={{marginLeft:20, fontFamily:'HindSiliguriRegular'}}>Get the pics of your unexpected moments!</Text>
            <View style={{borderBottomColor: '#DADADA',borderBottomWidth: 1,marginTop:15,marginBottom:10}}/>

        <View style={{justifyContent:'center',height:Dimensions.get('window').height/3, marginTop:10, marginBottom:15}}>
            <View style={styles.packageCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                    <Text style={{fontSize:17, fontFamily:'HindSiliguriSemiBold'}}>10 Moments</Text>
                    <Text style={{color:'#BABABA',fontSize:17, fontFamily:'HindSiliguriMedium'}}>$5</Text>
                </View>
            </View>
            <View style={styles.packageCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                    <Text style={{fontSize:17, fontFamily:'HindSiliguriSemiBold'}}>20 Moments</Text>
                    <Text style={{color:'#BABABA',fontSize:17, fontFamily:'HindSiliguriMedium'}}>$10</Text>
                </View>
            </View>
            <View style={styles.packageCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                    <Text style={{fontSize:17, fontFamily:'HindSiliguriSemiBold'}}>40 Moments</Text>
                    <Text style={{color:'#BABABA',fontSize:17, fontFamily:'HindSiliguriMedium'}}>$25</Text>
                </View>
            </View>
            <View style={styles.packageCard}>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:20}}>
                    <Text style={{fontSize:17, fontFamily:'HindSiliguriSemiBold'}}>Custom Pack</Text>
                    <Text style={{color:'#BABABA',fontSize:14, fontFamily:'HindSiliguriMedium'}}>Applicable Rates</Text>
                </View>
            </View>
            </View>
            <Pressable onPress={() => navigation.navigate('CamPage')} style={{width:180,alignSelf:'center',marginTop:15}}>
                <ButtonMedium title="Buy Now"/>
            </Pressable>

        </View>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    video:{
        backgroundColor:'white',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height/2.6
    },
    BottomBar:{
        height:Dimensions.get('window').height/1.7,
        width:Dimensions.get('window').width,
        backgroundColor:'#F2F5F8',
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        zIndex:1,
        position:'absolute',
        top:370,
      },
      packageCard:{
        width:Dimensions.get('window').width/1.1,
        height:Dimensions.get('window').height/13,
        backgroundColor:'white',
        borderRadius:10,
        alignSelf:'center',
        justifyContent:'center',
        borderColor:'#DBDBDB',
        borderWidth:1,
        marginTop:10
      }
})
export default CandidMomentPurchase