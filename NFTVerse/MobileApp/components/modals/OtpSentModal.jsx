import React from 'react';
import { Modal, Text, View } from 'react-native';
import BlackPrimaryButton from '../common/BlackPrimaryButton';

const OtpSentModal = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} animationType={'fade'} transparent>
            <View className={'bg-gray-800/50 w-screen h-screen flex-1 justify-center text-white'}>
                <View
                    className={'bg-[#43178A] rounded-[60px] w-[85vw] p-10 pt-0 flex flex-col gap-y-10 mx-auto items-center'}
                >
                    <Text className={'text-[25px] font-bold text-center text-white'}>OTP Verification</Text>
                    <Text className={'text-lg text-center text-white'}>An OTP has been sent to your registered email ID</Text>
                    <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={onClose}>
                        <Text className={'text-neon text-lg text-center'}>Ok</Text>
                    </BlackPrimaryButton>
                </View>
            </View>
        </Modal>
    );
};

export default OtpSentModal;
