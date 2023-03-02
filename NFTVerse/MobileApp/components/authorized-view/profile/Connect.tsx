import React from 'react';
import { Alert, Image, Linking, Pressable, Text, View } from 'react-native';

const data = [
    {
        image: require(`../../../assets/authorized-view/instagram.png`),
        text: 'Instagram',
        link: 'https://www.instagram.com/onnftverse/',
    },
    {
        image: require('../../../assets/authorized-view/linkedin.png'),
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/company/nftverse/',
    },
    {
        image: require('../../../assets/authorized-view/twitter.png'),
        text: 'Twitter',
        link: 'https://twitter.com/TaleWallet',
    },
    {
        image: require('../../../assets/authorized-view/facebook.png'),
        text: 'Facebook',
        link: 'https://www.facebook.com/onnftverse',
    },
    {
        image: require('../../../assets/authorized-view/discord.png'),
        text: 'Discord',
        link: 'https://discord.gg/tbs47P7gDW',
    },
    {
        image: require('../../../assets/authorized-view/info.png'),
        text: 'Learn more',
        link: 'https://www.onnftverse.com/',
    },
];

const openLink = (url: string) => {
    Linking.canOpenURL(url).then(res => {
        if (res) {
            Linking.openURL(url);
        } else {
            Alert.alert('Invalid URL');
        }
    });
};

const Connect = () => {
    return (
        <View className={'flex flex-col items-center h-[100vh]'}>
            <Image source={require('../../../assets/authorized-view/connect-bg.png')} className={'w-[100vw] h-[25%]'} />
            <Text className={'text-2xl'}>Connect with us</Text>
            <View className={'flex flex-row flex-wrap gap-3 w-[70%] mt-5 mx-auto'}>
                {data.map((item, index) => (
                    <Pressable
                        onPress={() => openLink(item.link)}
                        key={index}
                        className={'flex flex-col items-center rounded-lg p-5 bg-[#BBFF0020] w-[45%]'}
                    >
                        <Image
                            resizeMode={'contain'}
                            resizeMethod={'resize'}
                            source={item.image}
                            className={'w-[50px] h-[50px]'}
                        />
                        <Text className={'text-sm mt-2'}>{item.text}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default Connect;
