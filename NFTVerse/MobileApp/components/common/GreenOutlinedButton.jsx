import React, { FC } from 'react';
import { Pressable, View } from 'react-native';

const GreenOutlinedButton = ({
    children,
    onPress,
    style,
    className,
}) => {
    return (
        <View style={style} className={`bg-transparent border border-[#BBFF00] rounded-full w-[300px] ${className}`}>
            <Pressable className={'px-10 p-4'} onPress={onPress}>
                {children}
            </Pressable>
        </View>
    );
};

export default GreenOutlinedButton;
