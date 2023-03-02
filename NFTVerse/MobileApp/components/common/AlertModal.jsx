import React from 'react';
import { Modal, Text, View } from 'react-native';
import BlackPrimaryButton from './BlackPrimaryButton';

const AlertModal= ({ visible, onClose, children, buttonText, header }) => {
    return (
        <Modal visible={visible} animationType={'fade'} transparent>
            <View className={'bg-gray-800/50 w-screen h-screen flex-1 justify-center text-white'}>
                <View
                    className={'bg-violet-800 rounded-[40px] w-[85vw] p-10 pt-0 flex flex-col gap-y-10 mx-auto items-center'}
                >
                    {header &&
                        <Text className={'text-[25px] font-bold text-center text-white'}>{header}</Text>
                    }
                    <Text className={'text-lg text-center text-white'}>{children}</Text>
                    <BlackPrimaryButton primary={true} className={'w-[70%]'} onPress={onClose}>
                        <Text className={'text-neon text-lg text-center'}>{buttonText || 'OK'}</Text>
                    </BlackPrimaryButton>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;
