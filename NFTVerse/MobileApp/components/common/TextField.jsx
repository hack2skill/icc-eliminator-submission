import React, { FC } from 'react';
import { TextInput } from 'react-native';

const TextField = ({ value, style, className, onChange, placeholder, }) => {
    return (
        <TextInput
            className={`${className} px-4 py-2 bg-[#BBFF0015] rounded-lg border-2 border-gray-200 focus:border-neon`}
            style={style}
            value={value}
            placeholder={placeholder}
            onChangeText={e => onChange && onChange(e)}
        />
    );
};

export default TextField;
