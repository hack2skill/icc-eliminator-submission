import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Contest from '../components/Pages/Contest';
import CustomTabBar from '../components/authorized-view/CustomTabBar';
import Header from '../components/authorized-view/Header';
import Wallet from '../components/Pages/Wallet';
import Marketplace from '../components/Pages/Marketplace';

const Tab = createBottomTabNavigator();

const AuthorizedView = ({ navigation }) => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
            }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                options={{
                    header: () => <Header navigation={navigation} />,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Image
                                className={'w-[30px] h-[30px]'}
                                source={require(`../assets/navigationIcon/cryptoshover.png`)}
                            />
                        ) : (
                            <Image
                                className={'w-[30px] h-[30px]'}
                                source={require(`../assets/navigationIcon/cryptos.png`)}
                            />
                        ),
                }}
                name="Contest"
                component={Contest}
            />
            <Tab.Screen
                options={{
                    header: () => <Header navigation={navigation} />,
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Image
                                className={'w-[30px] h-[30px]'}
                                source={require(`../assets/navigationIcon/rewardshover.png`)}
                            />
                        ) : (
                            <Image
                                className={'w-[30px] h-[30px]'}
                                source={require(`../assets/navigationIcon/rewards.png`)}
                            />
                        ),
                }}
                name="Marketplace"
                component={Marketplace}
            />

            <Tab.Screen
                options={{
                    header: () => <Header navigation={navigation} />,

                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Image
                                className={'w-[30px] h-[30px] bg-transparent'}
                                source={require(`../assets/navigationIcon/homehover.png`)}
                                resizeMode={"contain"}
                            />
                        ) : (
                            <Image
                                className={'w-[30px] h-[30px] bg-transparent'}
                                source={require(`../assets/navigationIcon/home.png`)}
                                resizeMode={"contain"}

                            />
                        ),
                }}
                name="Wallet"
                component={Wallet}
            />
        </Tab.Navigator>
    );
};

export default AuthorizedView;
