import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens';
import TrafficSystem from '../screens/TrafficSystem/TrafficSystem';
import StadiumView from '../screens/StadiumView/StadiumView';
import Menu from '../screens/menu';
import CandidMomentPurchase from '../screens/candid moments/CandidMomentsPurchase';
import FanCamPackage from '../screens/candid moments/FanCamPackage';
import StadiumViewAngle from '../screens/StadiumView/StadiumViewAngle';
import YourCollections from '../screens/YourCollections/yourCollections';
import SeatFinder from '../screens/SearFinder/seatFinder';
import ticket from '../screens/Ticket/ticket';
import NavBar from '../components/NavBar';
import BackgroundNav from '../components/BackgroundNav';
import Camera from '../screens/FanCamera/camera';
import Ticket from '../screens/Ticket/ticket';
import upcomingMatches from '../screens/upcomingMatches/upcomingMatches';
import StadiumFullView from '../screens/StadiumView/StadiumFullView';
import UpcomingMatches from '../screens/upcomingMatches/upcomingMatches';


const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Menu' component={Menu} options={{headerShown: false}}/>
      <Stack.Screen name='CamPage' component={Camera} options={{headerShown: false}}/>
      <Stack.Screen name='BackgroundNavbar' component={ BackgroundNav } options={{headerShown: false}}/>
      <Stack.Screen name='Ticket' component={Ticket} options={{headerShown:false}}/>
      <Stack.Screen name='StadiumViewAngle' component={StadiumViewAngle} options={{headerShown:false}}/>
      <Stack.Screen name='FanCamPackage' component={FanCamPackage} options={{headerShown:false}}/>
      <Stack.Screen name='TrafficSystem' component={ TrafficSystem } options={{headerShown: false}}/>
      <Stack.Screen name='Candid' component={CandidMomentPurchase} options={{headerShown:false}}/>
      <Stack.Screen name='StadiumView' component={StadiumView} options={{headerShown: false}}/>
      <Stack.Screen name='YourCollections' component={YourCollections} options={{headerShown: false}}/> 
      <Stack.Screen name='SeatFinder' component={SeatFinder} options={{headerShown: false}}/>
      <Stack.Screen name='Navbar' component={NavBar} options={{headerShown: false}}/>
      <Stack.Screen name='UpcomingMatches' component={upcomingMatches} options={{headerShown: false}}/>
      <Stack.Screen name='FullView' component={StadiumFullView} options={{headerShown: false}}/>
      <Stack.Screen name='FanCamPack' component={FanCamPackage} options={{headerShown: false}}/>
      <Stack.Screen name='UpcomingMatch' component={UpcomingMatches} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};
