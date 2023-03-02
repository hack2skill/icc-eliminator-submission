import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const BlackPrimaryButton = ({ children, onPress, style, className, disabled, primary, loading }) => {
    return (
        <TouchableOpacity
            style={style}
            disabled={disabled}
            className={`w-full ${className}${disabled ? 'bg-white  border border-lime-300' : ''} ${primary
                ? "bg-blue-600 text-lime-500 border-none  hover:bg-lime-500 "
                : " text-white bg-blue-900 border border-blue-700"
                } rounded-full px-4 ease-in-out duration-300 `}
            onPress={onPress}
        >
            <View className='flex flex-row justify-center items-center gap-x-2'>
                <Text className={`py-2 ${disabled ? 'text-gray-200' : ''} flex flex-row justify-center items-center text-center font-medium text-white`}>
                    {children}
                </Text>
                {loading &&
                    <Text>{loading && <ActivityIndicator size="small" color="#0000ff" />}</Text>
                }
            </View>
        </TouchableOpacity>
    );
};

export default BlackPrimaryButton;
