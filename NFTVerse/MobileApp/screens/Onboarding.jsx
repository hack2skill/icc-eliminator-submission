import React, { FC } from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';

const Onboarding = ({ navigation }) => {
    const { width } = Dimensions.get('window');
    const [slider, setSlider] = React.useState({ currentPage: 0 });

    const setSliderPage = (event) => {
        const { currentPage } = slider;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.round(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSlider({
                ...slider,
                currentPage: indexOfNextScreen,
            });
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{ flex: 0 }}
                horizontal={true}
                scrollEventThrottle={10}
                pagingEnabled={true}
                onScroll={setSliderPage}
            >
                

            </ScrollView>
            <View className={'flex flex-row justify-center w-screen mb-10 absolute bottom-0'}>
                {Array.from(Array(3).keys()).map((key, index) => (
                    <View
                        key={key}
                        className={`rounded-full w-5 h-5 mx-2 ${slider.currentPage === index ? 'bg-[#2F37DB]' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </View>
        </SafeAreaView>
    );
};

export default Onboarding;
