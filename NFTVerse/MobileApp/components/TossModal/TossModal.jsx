import React from 'react';
import { Modal, Text, View, Image, Pressable } from 'react-native';
import BlackPrimaryButton from '../common/BlackPrimaryButton';

const TossModal = ({ openModal, setOpenModal, tossResult, setTossResult, setTossAgain }) => {
    const handleToss = React.useCallback((pick) => {
        if (Math.floor(Math.random()*2) % 2 === pick) {
            setTossResult(true);
        }
        else {
            setTossResult(false)
        }
    }, [tossResult])
    const onClose = React.useCallback(
        () => {
            setOpenModal(false)
            setTossAgain(true)
        },
        [openModal],
    )

    return (
        <Modal visible={openModal} animationType={'fade'} transparent>
            <View className={'bg-gray-800/50 w-screen h-screen flex-1 justify-center text-white'}>
                <View
                    className={'bg-[#43178A] rounded-[60px] w-[85vw] p-10 pt-0 flex flex-col gap-y-10 mx-auto items-center'}
                >
                    {tossResult=='default' ? <>
                        <Text className={'text-lg text-center text-white'}>Select Head or Tail for the toss</Text>
                        <View className="flex flex-row justify-between w-[90%]">
                            <Pressable className="flex items-center" onPress={() => { handleToss(2) }}>
                                <Image source={require('../../assets/LiveMatch/head.png')} resizeMode={'contain'} className="">
                                </Image>
                                <BlackPrimaryButton primary={true} className="text-white font-medium">Head</BlackPrimaryButton>
                            </Pressable>
                            <Pressable className="flex items-center gap-2" onPress={() => { handleToss(1) }}>
                                <Image source={require('../../assets/LiveMatch/tail.png')} resizeMode={'contain'} className="">
                                </Image>
                                <BlackPrimaryButton primary={true} className="text-white font-medium">Tail</BlackPrimaryButton>
                            </Pressable>
                        </View>

                    </>
                        :
                        <>
                            {!tossResult ?
                                <>
                                    <Text className={'text-[30px] font-bold text-center text-white mt-5'}>OOPs.. No</Text>
                                    <Text className={'text-lg text-center text-white'}>You Lost the toss !!</Text>
                                </>
                                :
                                <>
                                    <Text className={'text-[30px] font-bold text-center text-white mt-5'}>Congratulations</Text>
                                    <Text className={'text-lg text-center text-white'}>You won the toss !!</Text>
                                </>
                            }
                            <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={onClose}>
                                <Text className={'text-neon text-lg text-center'}>Continue</Text>
                            </BlackPrimaryButton>
                        </>
                    }
                </View>
            </View>
        </Modal>
    );
};

export default TossModal;
