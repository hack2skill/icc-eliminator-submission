import { View, Text, Dimensions, Image, Alert } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import BlackPrimaryButton from '../common/BlackPrimaryButton';
import LiveRound from '../LiveRound/LiveRound';
import TossModal from '../TossModal/TossModal';
import ResultModal from '../modals/ResultModal';

export default function LiveMatch({ navigation, route }) {
    const [tossResult, setTossResult] = React.useState('default');
    const [openModal, setOpenModal] = React.useState(true);
    const [tossAgain, setTossAgain] = React.useState('no');
    const [disabled, setDisabled] = React.useState(false);
    const [openResultModal, setOpenResultModal] = React.useState(false);
    const [result, setResult] = React.useState(false);

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

    React.useEffect(() => {
        setOpenModal(true)
        setTossResult('default')
    }, [])
    return (
        <ScrollView className="flex flex-col gap-5 min-h-screen bg-blue-900"
            contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
        >
            {/* <LiveRound /> */}
            <TossModal openModal={openModal} setOpenModal={setOpenModal} tossResult={tossResult} setTossResult={setTossResult} setTossAgain={setTossAgain} />
            <View className="flex justify-center items-center gap-2">
                <View className="bg-gray-50 border rounded-full p-3">
                    <Image source={require('../../assets/LiveMatch/oppo.png')} resizeMode={'contain'} className="">
                    </Image>
                </View>
                <Text className="text-white">#opponent</Text>
            </View>
            <View className="flex-5 flex-row justify-center items-center gap-2">
                {Array.from(Array(5).keys()).map((key, index) => {
                    return (
                        <View className="">
                            <Image source={require('../../assets/LiveMatch/emptycard.png')} resizeMode={'contain'} className="h-24">
                            </Image>
                        </View>
                    )
                })}
            </View>
            <View className="flex flex-row justify-center items-center gap-2">
                {tossResult === 'default' ?
                    <View className="">
                        <Image source={require('../../assets/LiveMatch/emptycard.png')} resizeMode={'cover'} className="h-32 w-20">
                        </Image>
                    </View>
                    :
                    <>

                        <View className="">
                            <Image source={opponentCard[route?.params?.card]?.image || ''} resizeMode={'cover'} className="h-32 w-20">
                            </Image>
                        </View>

                    </>
                }
                {route?.params?.thrown ?
                    <View className="">
                        <Image source={require('../../assets/throwcard/p6.png')} resizeMode={'cover'} className="h-32 w-20">
                        </Image>
                    </View>
                    :
                    <View className="">
                        <Image source={require('../../assets/LiveMatch/emptycard.png')} resizeMode={'cover'} className="h-32 w-20">
                        </Image>
                    </View>
                }
            </View>
            <View className="flex justify-center items-center gap-2 mb-[50px]">
                <View className="">
                    <Image source={require('../../assets/LiveMatch/selectcard.png')} resizeMode={'contain'} className="">
                    </Image>
                </View>
                {route?.params?.thrown ?
                    <BlackPrimaryButton primary={true}
                        onPress={() => {
                            if (Math.floor(Math.random() * 10) % 2 === 0) {
                                setOpenResultModal(true)
                                setResult(true)
                            }
                            else {
                                setOpenResultModal(true)
                                setResult(false)
                            }
                            setDisabled(true);
                        }}
                        disabled={disabled}
                    >check</BlackPrimaryButton>
                    :
                    <BlackPrimaryButton primary={true} onPress={() => { navigation.navigate('ThrowCard', { card: route?.params?.card }) }}>Select your card</BlackPrimaryButton>
                }
                <ResultModal openModal={openResultModal} setOpenModal={setOpenResultModal} result={result} />
            </View>
        </ScrollView >
    )
}