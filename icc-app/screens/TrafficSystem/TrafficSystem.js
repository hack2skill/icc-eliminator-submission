import { View, Text ,StyleSheet, Dimensions, Platform, PanResponder,Image,TouchableHighlight } from 'react-native'
import React,{useEffect,useRef,useState} from 'react'
import MapView ,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {Images} from '../../config/images'
import NavBar from '../../components/NavBar';


const BOTTOM_SHEET_MAX_HEIGHT =( Dimensions.get('window').height) * 0.7
const BOTTOM_SHEET_MIN_HEIGHT =( Dimensions.get('window').height) * 0.1 


const TrafficSystem = ({navigation}) => {
  //Accessing Location of the User
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setOriginMarker({
        latitude : location.coords.latitude,
        longitude : location.coords.longitude 
      })
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [originMarker,setOriginMarker] = useState({
    latitude:10.939,
    longitude: 76.955
  })
  const destinationMarker = { 
    latitude:11.00672,
    longitude:76.96923
  }
  const [distance,setDistance] = useState()
  const [duration,setDuration] = useState()



  const [mapRegion, setmapRegion] = useState({
    latitude:originMarker.latitude,
    longitude:originMarker.longitude,
    latitudeDelta: 0,
    longitudeDelta: 0.002,
  });

  //Animation of card

  // const animatedValue = useRef(new Animated.Value(0)).current
  // const lastGestureDy = useRef(0)
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder:() => true,
  //     onPanResponderGrant:()=>{},
  //     onPanResponderMove:(e,gesture)=>{animatedValue.setValue(gesture.dy)},
  //     onPanResponderRelease:(e,gesture)=>{lastGestureDy.current += gesture.dy},
  //   }),
  // ).current
  
  // const mapComponentAnimation = {
  //   transform:[{translateY:animatedValue}]
  // }

  //animation by another
  const translateY = useSharedValue(0)
  const context = useSharedValue({y:0})
  const gesture = Gesture.Pan().onStart(()=>{
    context.value = {y:translateY.value}
  })
    .onUpdate((event)=>{
    // console.log(event.translationY);
    translateY.value = event.translationY+context.value.y
    translateY.value = Math.max(translateY.value,-BOTTOM_SHEET_MAX_HEIGHT + 80)
    translateY.value = Math.min(translateY.value,-BOTTOM_SHEET_MIN_HEIGHT + 40)
  })
  const rBottomSheetStyle = useAnimatedStyle(() =>{
    return{
      transform:[{translateY:translateY.value}]
    }
  }
  )
  return (
    <View style = {styles.container}> 
    <NavBar icon={Images.menu} onHomePress={() => navigation.navigate('Home')} onMenuPress={() => navigation.navigate('Menu')}/>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={mapRegion} > 
          <Marker coordinate={originMarker} pinColor = 'red'/>
          <Marker coordinate={destinationMarker} pinColor = 'red'/>
          <MapViewDirections
            origin = {originMarker}
            destination = {destinationMarker}
            apikey="AIzaSyAimFCHqcdDFZMGyxWSuJiU3A09mdbBa_0"
            strokeColor= "black"
            strokeWidth={5}
            onReady={result =>{
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)
              setDistance(result.distance)
              setDuration(Math.ceil((result.duration)))
            }}
          />
        </MapView>
        <GestureDetector gesture={gesture}>
        {/* //have to add mapComponentAnimation  */}
        <Animated.View style={[styles.mapComponentsContainer,rBottomSheetStyle]}> 
        {/* {...panResponder.panHandlers} */}
          <View style={styles.dragArea} >
            <View style={styles.dragHandle}/>
          </View>
          <View style={styles.Flags}>
              <Image style={styles.indiaFlag} source={Images.indiaFlag}/>
              <Text style={styles.flagText}>VS</Text>
              <Image style={styles.australiaFlag}  source={Images.australiaFlag} />
          </View>
          <>
            <Text style={{marginTop:10,marginLeft:30,color:'#9F9F9F', fontFamily:'HindSiliguriRegular'}}>Test 3 of 4 (IND leads 2-0)</Text>
            <View style={{borderBottomColor: '#DADADA',borderBottomWidth: 1,marginTop:10,marginBottom:20}}/>
          </>
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginLeft:10}}>
              <View style={{marginRight:10}}>
                <Text style={{fontFamily:'HindSiliguriBold', fontSize:20}}>9:10am</Text>
                <Text style={{fontFamily:'HindSiliguriRegular'}}>Gandhinagar</Text>
              </View>
              <View style={{alignSelf:'center',width:77,height:27,borderRadius:50,justifyContent:'center',alignContent:'center',alignItems:'center',borderWidth:1.55,borderColor:'#DBDBDB'}}>
               <Text style={{color:'#8D8D8D', fontFamily:'HindSiliguriMedium'}}>{duration} min</Text>
              </View>
              <View style={{marginLeft:10}}>
                <Text  style={{fontFamily:'HindSiliguriBold', fontSize:20}}>10:00am</Text>
                <Text style={{fontFamily:'HindSiliguriRegular'}}>Narendra Stadium</Text>
              </View>
          </View>
        <View style={{flexDirection:'row',marginTop:10, marginLeft:10}}>
          <View>
            <View style={styles.modeOfTransportation}>
              <Image style={{width:19,height:19,marginLeft:10, alignSelf:'center'}} source={Images.car} />
              <Text style={{alignSelf:'center',marginLeft:10, fontFamily:'HindSiliguriRegular'}}>Car</Text>
            </View>
          </View>
          <View>
            <View style={styles.profCount}>
              <Image style={{width:16,height:16,marginLeft:10,alignSelf:'center'}} source={Images.Profile} />
              <Text style={{alignSelf:'center',marginLeft:15, fontFamily:'HindSiliguriRegular'}}>2</Text>
            </View>
          </View>
          <View>
            <View style={styles.way}>
              <Text style={{alignSelf:'center', fontFamily:'HindSiliguriRegular',fontSize:13}}>One-Way</Text>
            </View>
          </View>
        </View>
        
        <View style={{flexDirection:'column',marginTop:20,marginLeft:30}}>
          <View style={{flexDirection:'row'}}>
            <TouchableHighlight style={styles.roundshape}>
             <Image style={styles.item} source={Images.whiteCar} />
            </TouchableHighlight>
            <View style={{flexDirection:'column',marginLeft:20,alignSelf:'center'}}>
              <Text style={{}}>Gandhinagar, Gujarat</Text>
              <Text style={{color:'#BABABA'}}>Start destination, 9:10am</Text>
            </View>
          </View>

          <View style={{width:60,height:30}}>
            <View style={{height:40,width:1,backgroundColor:'black',alignSelf:'center'}}>
            </View>
          </View>

        </View>


        <View style={{alignSelf:'center'}}>
          <View style={styles.whiteCard}>
            <View style={{height:75,justifyContent:'center'}}>
            <View style={{flexDirection:'row',height:65,alignItems:'center'}}>
                <TouchableHighlight style={styles.roundshape2}>
                <Image style={styles.item2} source={Images.hotel} />
                </TouchableHighlight>
              <View style={{flexDirection:'column',marginLeft:20,alignSelf:'center'}}>
                <Text style={{}}>Gandhinagar, Gujarat</Text>
                <Text style={{color:'#BABABA'}}>Start destination, 9:10am</Text>
              </View>
              </View>
            </View>

            <View style={{width:60,height:30,marginLeft:13}}>
            <View style={{height:40,width:1,backgroundColor:'black',alignSelf:'center',borderStyle:'dotted'}}>
            </View>

          </View>
        </View>
          


          <View>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:30}}>
              <TouchableHighlight style={styles.roundshape3}>
              <Image style={styles.item2} source={Images.location} />
              </TouchableHighlight>
              <View style={{flexDirection:'column',marginLeft:20,alignSelf:'center'}}>
                <Text style={{}}>Gandhinagar, Gujarat</Text>
                <Text style={{color:'#BABABA'}}>Start destination, 9:10am</Text>
              </View>
            </View>
          </View>
        </View>
        </Animated.View>
        </GestureDetector>
    </View>
  )
}

export default TrafficSystem

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex:-1
  },
  mapComponentsContainer:{
    bottom:BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    height:BOTTOM_SHEET_MAX_HEIGHT,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    width:Dimensions.get('window').width,
    backgroundColor:'#F2F5F8',
    position:'absolute',
    ...Platform.select({
      android:{
        elevation:3,    
    },
      ios:{
        shadowColor:'#a8bed2',
        shadowOpacity:1,
        shadowRadius:6,
        shadowOffset:{
          width:2,
          height:2
        },
      },
    }),
  },  
  dragArea:{
    width:100,
    height:32,
    alignSelf:'center',
    justifyContent:'center',
    alignItems:'center', 
  },
  dragHandle:{
    width:100,
    height:6,
    backgroundColor:'#d3d3d3',
    borderRadius:10 
  },
  Flags:{
    flexDirection:'row',
    marginLeft:30,
    marginTop:10
  },
  indiaFlag:{
    marginRight:10,
    width:30,
    height:30
  },
  australiaFlag:{
    marginLeft:10,
    width:30,
    height:30
  },
  flagText:{
    // backgroundColor:'red',
    alignSelf:'center',
    fontWeight:"900"
  },
  modeOfTransportation:{
    height:30,
    width:95,
    marginLeft:20,
    marginTop:20,
    flexDirection:'row',
    borderRadius:8,
    borderWidth:1.55,
    borderColor:'#DBDBDB',
  },
  profCount:{
    height:30,
    width:80,
    marginLeft:10,
    marginTop:20,
    flexDirection:'row',
    borderRadius:8,
    borderWidth:1.55,
    borderColor:'#DBDBDB'
  },
  way:{
    height:30,
    width:95,
    marginLeft:10,
    marginTop:20,
    flexDirection:'row',
    borderRadius:8,
    justifyContent:'center',
    borderWidth:1.55,
    borderColor:'#DBDBDB'
  },
  item: {
    alignSelf: "center",
    color:"white",
    width:20,
    height:20
  },
  roundshape:{
    width:60,height:60,
    backgroundColor:'#0E1736',
    borderRadius:50,
    justifyContent:"center",
  },
  whiteCard:{
    width:350,
    height:75,
    backgroundColor:'white',
    // marginTop:20,
    borderRadius:20,
    elevation:8
  },
  roundshape2:{
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:50,
    justifyContent:"center",
    borderWidth:1,
    borderColor:'#FF9C07',
    marginLeft:13,
  },
  item2: {
    alignSelf: "center",
    color:"white",
    width:30,
    height:30,
  },
  roundshape3:{
    width:60,height:60,
    backgroundColor:'white',
    borderRadius:50,
    justifyContent:"center",
    borderWidth:1,
    borderColor:'#DBDBDB',
    marginLeft:13,
  },


  


});