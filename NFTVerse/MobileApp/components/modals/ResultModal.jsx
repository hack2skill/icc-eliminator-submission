import React from 'react';
import { Modal, Text, View, Image, Pressable } from 'react-native';
import BlackPrimaryButton from '../common/BlackPrimaryButton';

const ResultModal = ({ openModal, setOpenModal, result }) => {
    const onClose = React.useCallback(
        () => {
            setOpenModal(false)
        },
        [openModal],
    )
    return (
        <Modal visible={openModal} animationType={'fade'} transparent>
            <View className={'bg-gray-800/50 w-screen h-screen flex-1 justify-center text-white'}>
                <View
                    className={'bg-[#43178A] rounded-[60px] w-[85vw] p-10 pt-0 flex flex-col gap-y-10 mx-auto items-center'}
                >
                    <>
                        {!result ?
                            <>
                                <Image source={require('../../assets/rewards/lost.png')} />
                            </>
                            :
                            <>
                                <Image source={require('../../assets/rewards/win.png')} />
                            </>
                        }
                        <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={onClose}>
                            <Text className={'text-neon text-lg text-center'}>Continue</Text>
                        </BlackPrimaryButton>
                    </>
                </View>
            </View>
        </Modal>
    );
};

export default ResultModal;
