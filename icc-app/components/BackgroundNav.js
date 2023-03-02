import React from 'react';
import { View, StyleSheet, Image, Text, ImageBackground, Dimensions, Pressable } from 'react-native';
import { Colors, Images } from '../config';

const BackgroundNav = ({ navigation,  heading, subhead, onMenuPress, onHomePress}) => {
  return (
    <View>
        <ImageBackground source={Images.background} resizeMode="cover" style={styles.background}>
            <View style={styles.navbar}><View style={{alignItems:'center', flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                
                <Pressable onPress={onHomePress}>
                  <Image style={styles.navIcons} source={Images.home}/>
                </Pressable>

                <View style={{alignItems: 'center', marginTop:18}}>
                    <Text style={{color: Colors.white, fontSize: 18, fontFamily: 'HindSiliguriSemiBold'}}>Tuesday, 15 Mar 23</Text>
                    <View style={{alignItems:'center',flexDirection:'row', marginTop: -15}}>
                        <Image style={styles.locIcon} source={Images.locWhite}/>
                        <Text style={{color: Colors.white, fontSize: 15, fontFamily: 'HindSiliguriRegular', marginLeft:5}}>Gujarat, India</Text>
                    </View>
                </View>
                <Pressable onPress={onMenuPress}>

                  <Image style={styles.navIcons} source={Images.menu} />
                </Pressable>
            </View></View>


            <View style={styles.headerText}>
                <Text style={{fontFamily: 'HindSiliguriSemiBold', fontSize:22, color: Colors.white}}>{heading}</Text>
                <Text style={{fontFamily: 'HindSiliguriRegular', fontSize:15, color: Colors.textGrey}}>{subhead}</Text>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1,
      alignItems: 'center',
    },
    background:{
      width: Dimensions.get('window').width,
      height: 400,
      // flex: 1,
      alignSelf:'center',
      flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      // marginLeft:-13,
    },
    navbar:{
      marginTop:40,
      paddingBottom:10,
      paddingLeft:10,
      paddingRight:10,
      flexDirection: 'row',
      // width: '100%',
      height: 100,
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.grey,
    },  
    navIcons:{
      width: 60,
      resizeMode: 'contain'
    },
    locIcon:{
      width:25,
      resizeMode: 'contain',
    },
    headerText: {
        marginTop:25,
        marginLeft:20
    },
  });

export default BackgroundNav