import React, { useEffect } from 'react';
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';
import { REACT_APP_GATEWAY_IPFS } from 'denv';
import { ResizeMode, Video } from 'expo-av';
import { Linking } from 'react-native';
import { Alert } from 'react-native';

const AssetItemView = ({ nft, onClick }) => {
    const [metaData, setMetaData] = React.useState(null);
    const [src, setSrc] = React.useState('')

    let ipfs = nft?.params?.url?.split('/');

    const fetchData = async () => {
        fetch(`${REACT_APP_GATEWAY_IPFS}/${ipfs[ipfs?.length - 1]}`).then((response) => {
            return response.json();
        }).then((data) => {

            if (nft?.params?.total?.length === 1) {
                setMetaData(data);
            }
        })
            .catch((rej) => {
                // console.log(rej);
            })
    }

    const handlePress = React.useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`${url} is Invalid !!`);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [])
    // handlePress(`https://www.talewallet.com/asset/${nft?.assetId}`)

    return (
        <>

            {metaData && (

                <Pressable
                    // onPress={() => { (metaData?.mime_type?.split('/')[0] === 'threeD' || metaData?.type === 'threeD') ? handlePress(`https://www.talewallet.com/asset/${nft?.assetId}`) : onClick(metaData, nft) }}
                    className={'rounded-xl mx-2 my-2 bg-white shadow-xl shadow-black/50'}
                >
                    <View className={'rounded-t-xl h-[180px] w-[45vw]'}>
                        {metaData?.mime_type?.split('/')[0] === 'text' ? (
                            <Text className={'text-2xl font-bold'}>{metaData?.name}</Text>
                        ) :
                            metaData?.mime_type?.split('/')[0] === 'image' || metaData?.type === 'image' ? (<>

                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    // source={require('../../../assets/kyc/edit.png')}
                                    // source={require('../../../assets/common/nft.png')}
                                    source={{ uri: `${REACT_APP_GATEWAY_IPFS}/${metaData?.image?.split('/')[metaData?.image?.split('/')?.length - 1] || metaData?.ipfsHash?.split('/')[metaData?.ipfsHash?.split('/')?.length - 1]}` }}
                                    resizeMode={'contain'}
                                />
                            </>
                            ) : metaData?.mime_type?.split('/')[0] === 'video' || metaData?.type === 'video' ? (
                                <Video
                                    source={{ uri: `${REACT_APP_GATEWAY_IPFS}/${metaData?.media_url?.split('/')[metaData?.media_url?.split('/')?.length - 1] || metaData?.ipfsHash?.split('/')[metaData?.ipfsHash?.split('/')?.length - 1]}` }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    shouldPlay
                                    resizeMode={ResizeMode.COVER}
                                    isLooping
                                    className={'w-full h-full rounded-t-xl'}
                                />
                            ) :
                                metaData?.mime_type?.split('/')[0] === 'threeD' || metaData?.type === 'threeD' ?
                                    //    <ThreeDRenderer 
                                    //    className={'w-full h-full rounded-t-xl'}
                                    //     src={`${REACT_APP_GATEWAY_IPFS}/${metaData?.media_url?.split('/')[metaData?.media_url?.split('/')?.length-1] || metaData?.ipfsHash?.split('/')[metaData?.ipfsHash?.split('/')?.length-1]}`}
                                    //     type={metaData?.mime_type?.split('/')[1]}
                                    //    />
                                    <View className={'flex justify-center items-center font-bold w-full h-full rounded-t-xl'}>
                                        Click To View 3D
                                    </View>
                                    :
                                    <></>
                        }
                    </View>
                    {/* <View className={'flex flex-row items-center justify-between py-2 px-1 border-b border-b-gray-200'}>
                            <Text className={'text-sm'}>{metaData?.name}</Text>
                            <View className={'flex flex-row items-center gap-x-1'}>
                                <Image
                                    className={'w-[15px] h-[15px]'}
                                    source={require('../../../assets/common/like-gray.png')}
                                />
                                <Text>20</Text>
                            </View>
                        </View> */}
                    <View className={'flex flex-row justify-between px-1 border-t border-t-gray-200'}>
                        <View className={'flex flex-col'}>
                            <Text className={'text-sm text-gray-700'}>Price</Text>
                            {/* <Text className={'text-lg'}>{metaData?.price} Algo</Text> */}
                        </View>
                        <View className={'flex flex-col'}>
                            <Text className={'text-sm text-gray-700'}>{nft?.amount} Algo</Text>
                            {/* <Text className={'text-lg'}>2 Algo</Text> */}
                        </View>
                    </View>
                    <View className={'flex gap-x-2 flex-row items-center px-1 pb-1'}>
                        <Image
                            className={'w-[15px] h-[15px]'}
                            source={require('../../../assets/authorized-view/default-profile.png')}
                        />
                        <Text className={'text-[10px] font-bold text-gray-700'}>{metaData?.name}</Text>
                    </View>
                </Pressable>
            )
                // :
                // <View className='flex flex-row justify-center items-center w-[100%] h-[100px] '>
                //     <Text className='font-bold'>No NFTs found</Text>
                // </View>
            }
        </>
    );
};

export default AssetItemView;
