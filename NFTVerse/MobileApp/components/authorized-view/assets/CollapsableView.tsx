import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const CollapsableView: React.FC<{
    style?: any;
    className?: string;
    headerTitle: string;
    headerImage?: React.ReactNode;
    body: React.ReactNode;
}> = ({ style, className, body, headerTitle, headerImage }) => {
    const [collapsed, setCollapsed] = React.useState(true);

    const toggleCollapsed = React.useCallback(() => setCollapsed(prev => !prev), []);

    return (
        <View
            style={style}
            className={`${className} w-full flex flex-col bg-white rounded-xl shadow-xl overflow-y-hidden`}
        >
            <TouchableOpacity
                onPress={toggleCollapsed}
                className={`w-full px-4 py-2 h-[50px] bg-gray-200 ${
                    collapsed ? 'rounded-t-xl' : 'rounded-xl'
                } flex flex-row items-center justify-between`}
            >
                <View className={'flex flex-row gap-x-2 items-center'}>
                    {headerImage && headerImage}
                    <Text className={'text-lg'}>{headerTitle}</Text>
                </View>
                <Image
                    className={`${collapsed && 'rotate-180'} transition-all ease-out duration-300 w-[20px] h-[20px]`}
                    source={require('../../../assets/common/arrow.png')}
                />
            </TouchableOpacity>
            <View className={`bg-white shadow-xl rounded-b-xl p-5 ${!collapsed && 'hidden'}`}>{body}</View>
        </View>
    );
};

export default CollapsableView;
