import { View, StyleSheet, Image, Text, ImageBackground  } from 'react-native'
import React from 'react'
import { Colors, Images } from '../config';
import { Pressable } from 'react-native';

const NavBar =({icon, onHomePress, onMenuPress})=> {
  return (
    <View>
        <View style={styles.navbar}>
          <Pressable onPress={onHomePress}>

              <Image style={styles.navIcons} source={Images.home}/>
          </Pressable>

            <View style={{marginLeft: '13%', marginRight: '13%', alignItems: 'center', marginTop:18}}>
                <Text style={{color: Colors.white, fontSize: 18, fontFamily: 'HindSiliguriSemiBold'}}>Tuesday, 15 Mar 23</Text>
                <View style={{alignItems:'center',flexDirection:'row', marginTop: -15}}>
                    <Image style={styles.locIcon} source={Images.locWhite}/>
                    <Text style={{color: Colors.white, fontSize: 15, fontFamily: 'HindSiliguriRegular', marginLeft:5}}>Gujarat, India</Text>
                </View>
            </View>
        <Pressable onPress={onMenuPress}>
          <Image style={styles.navIcons} source={icon} />
        </Pressable>
      
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    navbar:{
      paddingBottom:10,
      paddingLeft:10,
      flexDirection: 'row',
      width: '100%',
      height: 110,
      alignItems: 'center',
      backgroundColor: Colors.blue,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.grey,
      paddingTop:30
    },  
    navIcons:{
      width: 60,
      resizeMode: 'contain'
    },
    locIcon:{
      width:25,
      resizeMode: 'contain',
    },
  });

export default NavBar