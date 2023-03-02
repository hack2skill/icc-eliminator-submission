import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React, { useCallback } from 'react'
import BlackPrimaryButton from '../common/BlackPrimaryButton'
import { REACT_APP_X_APP_TOKEN } from 'denv';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function SpinTheWheel({navigation}) {
    const appCtx = useSelector((state) => state.app)
    const [reward, setReward] = React.useState([
        {
            rewardsValue: { image: require('../../assets/wheel/spin1.png') }
        },
        {
            rewardsValue: { image: require('../../assets/wheel/spin2.png') }
        },
        {
            rewardsValue: { image: require('../../assets/wheel/spin3.png') }
        },
        {
            rewardsValue: { image: require('../../assets/wheel/spin4.png') }
        },
        {
            rewardsValue: { image: require('../../assets/wheel/spin5.png') }
        },
        {
            rewardsValue: { image: require('../../assets/wheel/spin6.png') }
        },
    ]);
    const [result, setResult] = React.useState(null);

    const [metaData, setMetaData] = React.useState('Nothing');
    const [showColor, setShowColor] = React.useState(['blue']);
    const [opponentCard, setOpponentCard] = React.useState([
        {
            image: require('../../assets/throwcard/p1.png')
        },
        {
            image: require('../../assets/throwcard/p2.png')
        },
        {
            image: require('../../assets/throwcard/p3.png')
        },
        {
            image: require('../../assets/throwcard/p4.png')
        },
        {
            image: require('../../assets/throwcard/p5.png')
        },
        {
            image: require('../../assets/throwcard/p7.png')
        }
    ]);
    // const loadData1 = React.useCallback(() => {

    //     let config = {
    //         url: `http://gs-dev.api.onnftverse.com/v1/game/1/spin/items`,
    //         method: 'get',
    //         headers: {
    //             // "X-App-Token": REACT_APP_X_APP_TOKEN,
    //             "X-Auth-Token": appCtx.authToken,
    //             "Content-Type": "application/json",
    //         }
    //     }
    //     console.log(config);

    //     axios(config)
    //         .then(function (response) {
    //             setReward(response?.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    // }, [reward])
    // React.useEffect(() => {
    //     loadData1();
    // }, [])
    const handleShowReward = useCallback(() => {
        let config = {
            url: `http://gs-dev.api.onnftverse.com/v1/game/${Math.floor(Math.random()*100)}/spin/result`,
            method: 'get',
            headers: {
                // "X-App-Token": REACT_APP_X_APP_TOKEN,
                "X-Auth-Token": appCtx.authToken,
                "Content-Type": "application/json",
            }
        }
        console.log(config);

        axios(config)
            .then(function (response) {
                let randomReward = opponentCard[Math.floor(Math.random()*6)];
                // console.log('====================================');
                // console.log(randomReward,Math.floor(Math.random()*6));
                // console.log('====================================');
                metaDataImage = (randomReward)?.image
                setMetaData(metaDataImage);
                setResult(response?.data);
            })
            .catch(function (error) {
                Alert.alert('try agiain later')
            })
    }, [result])
    let i = 0, metaDataImage = 'Nothing';
    let simulateSpinningWheel = (callback) => {
        //array of colors
        const color = ["pink", "red", "orange", "blue", "green", "lightblue"];
        let showColor = 0;//use to iterate through color array


        let timerId = setInterval(() => {

            setShowColor(color[showColor])
            let randomReward = reward[showColor];
            console.log(randomReward);
            metaDataImage = randomReward?.rewardsValue && (randomReward?.rewardsValue)?.image;
            setMetaData(metaDataImage);
            console.log(metaDataImage);
            showColor++;
            if (showColor === color.length-1) {
                showColor = 0;
            }
        }, 1000);

        setTimeout(() => {
            clearInterval(timerId); //use the timer id  to clear the interval
            //showColor = 0;
            handleShowReward()
        }, 10000);
        // }
    }
    React.useEffect(() => {
        simulateSpinningWheel();
    }, [])

    return (
        <View className="flex justify-center items-center min-h-screen w-screen">
            {/* <Text>{metaData}</Text>
            <View>
                <BlackPrimaryButton primary={true} className="w-[200px]">Stop the spin</BlackPrimaryButton>
            </View> */}
            <View className="gap-5" style={styles.container}>
                {
                    result && <Text className="text-[20px] font-bold">Congratulations !!!</Text>
                }
                {
                    result ?
                        <TouchableHighlight
                            style={[styles.wheel]}>
                            <View>
                                {/* <Text>{metaData}</Text> */}
                                <Image className='w-60 ' source={ metaData } resizeMode="contain" />
                            </View>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight
                            style={[styles.wheel]}>
                            <View>
                                {/* <Text>{metaData}</Text> */}
                                <Image className='w-60 ' source={metaData} resizeMode="contain" />
                            </View>
                        </TouchableHighlight>
                }
                {
                    result && <BlackPrimaryButton className="text-[20px] font-bold" onPress={()=>{navigation.navigate('Wallet')}}>Claim your reward</BlackPrimaryButton>
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        alignItems: "center",
        justifyContent: "center",
        //alignSelf: "stretch", //stretch the area of the container across the screen    
        marginTop: -50,//fix a issue with the inside the "MainScreen" container in that the "Score" component was hidden under the buttons.
    },
    wheel: {
        //flex: 1,
        //backgroundColor:{props.newColor},
        //   borderRadius:100,
        width: 175,
        height: 175,
        alignItems: "center",
        justifyContent: "center",
    },
    awardText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bolder",
    },
});