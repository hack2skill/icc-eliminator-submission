import React from 'react';
import { Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const [keyboardHidden, setKeyboardHidden] = React.useState(true);

    React.useEffect(() => {
        const showListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardHidden(false);
        });
        const hideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHidden(true);
        });
        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return (
        <View className={`flex flex-row ${!keyboardHidden && 'hidden'}`}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label = route.name;
                const iconName = options.tabBarIcon;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity key={index} className={`bg-blue-100 flex-1 shadow-2xl`} onPress={onPress}>
                       {/* ${isFocused ? 'bg-black' : 'bg-gray-300'
                                }  */}
                        <View
                            className={`
                            
                            p-2 rounded-lg flex flex-col items-center justify-between`}
                        >
                            {iconName && iconName({ color: '', size: 0, focused: isFocused })}
                            <Text className={'text-sm'} style={{ color: isFocused ? '#6100AE' : '#222' }}>
                                {label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;
