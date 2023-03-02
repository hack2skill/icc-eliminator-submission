import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Linking, ScrollView, Text, TouchableOpacity, View, VirtualizedList } from 'react-native';
import CollapsableView from './CollapsableView';
import AssetsView from './AssetsView';
import { REACT_APP_ALGOEXPLORER_ADDRESS, REACT_APP_GATEWAY_IPFS } from 'denv';
import { ResizeMode, Video } from 'expo-av';

const AssetDetailView = ({ route }) => {
    const nftDomain =route?.params?.nfts;
    const assetMetadata =  route?.params?.metaData;
    //  JSON?.parse(nftDomain?.metaData);
    console.log(assetMetadata);
    
    const [property, setProperty] = useState([{key:'',value:''}]);
    console.log(nftDomain);
    // console.log(assetMetadata);
    useEffect(() => {
        setProperty(assetMetadata?.properties?.length? assetMetadata?.properties : assetMetadata?.properties && Object?.entries(assetMetadata?.properties)?.map((e) => ({ [e[0]]: e[1] })))
    }, [assetMetadata?.properties])
    let obj = [];

    property?.map((item) => {
        for (var i in item) {
            obj = [...obj, { key: i, value: item[i] }]
        }
    })
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

    return (
        <ScrollView className={'flex flex-col pt-3 px-4'}>
            <View className={'flex flex-row justify-between items-center'}>
                <View className={'flex flex-row gap-x-2 items-center'}>
                    <Image
                        source={require('../../../assets/authorized-view/default-profile.png')}
                        className={'w-[25px] h-[25px] rounded-full'}
                    />
                    <Text className={'text-sky-500 text-sm'}>{assetMetadata?.name}</Text>
                </View>
                {/* <View className={'flex flex-row gap-x-4 items-center'}>
                    <Image source={require('../../../assets/common/reload.png')} className={'w-[20px] h-[20px]'} />
                    <Image source={require('../../../assets/common/share.png')} className={'w-[20px] h-[20px]'} />
                    <Image source={require('../../../assets/common/options.png')} className={'w-[20px] h-[20px]'} />
                </View> */}
            </View>
            <Text className={'text-lg my-2'}></Text>
            <View className={'rounded-xl h-[300px] w-[100%]'}>
                {assetMetadata?.mime_type?.split('/')[0] === 'text' ? (
                    <Text className={'text-2xl font-bold'}>{assetMetadata?.name}</Text>
                ) : assetMetadata?.mime_type?.split('/')[0] === 'image' || assetMetadata?.type === 'image' ? (
                    <Image
                        className={'w-[100%] h-[100%] rounded-xl'}
                        source={{ uri: `${REACT_APP_GATEWAY_IPFS}/${assetMetadata?.image?.split('/')[assetMetadata?.image?.split('/')?.length-1] || assetMetadata?.ipfsHash?.split('/')[assetMetadata?.ipfsHash?.split('/')?.length-1]}` }}
                        resizeMode={'contain'}
                    />
                ) : (
                    <Video
                        source={{ uri: `${REACT_APP_GATEWAY_IPFS}/${assetMetadata?.media_url?.split('/')[2]}` }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        shouldPlay
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        className={'w-full h-full rounded-xl'}
                    />
                )}
            </View>
            {/* <View className={'flex flex-col shadow-xl bg-white px-4 py-3 mt-3'}>
                <View className={'flex flex-row justify-between items-center border-b border-b-gray-200 pb-2'}>
                    <View className={'flex flex-row gap-x-2 items-center'}>
                        <Image
                            source={require('../../../assets/authorized-view/default-profile.png')}
                            className={'w-[30px] h-[30px]'}
                        />
                        <View className={'flex flex-col'}>
                            <Text className={'text'}>Creator</Text>
                            <Text className={'text-sm text-sky-500'}>guywhodoodles</Text>
                        </View>
                    </View>
                    <View className={'flex flex-row gap-x-2 items-center'}>
                        <Image
                            source={require('../../../assets/authorized-view/default-profile.png')}
                            className={'w-[30px] h-[30px]'}
                        />
                        <View className={'flex flex-col'}>
                            <Text className={'text'}>Current owner</Text>
                            <Text className={'text-sm text-sky-500'}>guywhodoodles</Text>
                        </View>
                    </View>
                </View>
                <View className={'flex flex-row justify-between items-center mt-2'}>
                    <View className={'flex flex-row gap-x-2 items-center'}>
                        <Image
                            source={require('../../../assets/common/ethereum.png')}
                            className={'w-[20px] h-[32px]'}
                        />
                        <Text className={'text-lg'}>Ethereum</Text>
                    </View>
                    <View className={'flex flex-row gap-x-2 items-center'}>
                        <Image
                            source={require('../../../assets/common/view-black.png')}
                            className={'w-[30px] h-[30px]'}
                        />
                        <Text className={'text-lg'}>320</Text>
                    </View>
                    <View className={'flex flex-row gap-x-2 items-center'}>
                        <Image
                            source={require('../../../assets/common/like-black.png')}
                            className={'w-[30px] h-[30px]'}
                        />
                        <Text className={'text-lg'}>12</Text>
                    </View>
                </View>
            </View> */}
            {/* <View className={'flex flex-row gap-x-5 mt-5'}>
                <View className={'rounded-xl bg-[#BBFF0020] p-6 w-[40vw] flex flex-col'}>
                    <Text className={'text-sm text-gray-600'}>Price</Text>
                    <Text className={'text-xl'}> */}
                        {/* {assetMetadata.price || nftDomain.price}{' '} */}
                        {/* {nftDomain.priceUnit && nftDomain.priceUnit.toUpperCase()} */}
                    {/* </Text>
                    <Text className={'text-md'}>
                        $ */}
                        {/* {Number(1500.65 * ((assetMetadata.price || nftDomain.price) as unknown as number))
                            .toFixed(2)
                            .toString()} */}
                    {/* </Text>
                </View>
                <View className={'rounded-xl bg-[#BBFF0020] p-6 flex-grow flex flex-col'}>
                    <View>
                        <Text className={'text-sm text-gray-600'}>Current bid by</Text>
                        <Text className={'text-sm text-gray-600'}>0xj3js...3htj</Text>
                    </View>
                    <Text className={'text-xl'}>2 ETH</Text>
                    <Text className={'text-md'}>$3000</Text>
                </View>
            </View> */}
            <CollapsableView
                className={'my-5'}
                headerTitle={'Description'}
                headerImage={
                    <Image source={require('../../../assets/common/description.png')} className={'w-[20px] h-[20px]'} />
                }
                body={
                    <View className={'flex flex-col gap-y-1'}>
                        {/* <Text className={'text-lg'}>About this item</Text> */}
                        <Text>{assetMetadata?.description}</Text>
                        {/* <Text className={'text-lg'}>About "{assetMetadata.collection}"</Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec</Text> */}
                    </View>
                }
            />
            <CollapsableView
                className={'mb-5'}
                headerTitle={'Properties'}
                headerImage={
                    <Image source={require('../../../assets/common/options.png')} className={'w-[20px] h-[20px]'} />
                }
                body={
                    <FlatList
                        ListEmptyComponent={() => (
                            <Text className={'text-sm text-gray-500 text-center p-3'}>Uh-oh! No properties found.</Text>
                        )}
                        data={obj}
                        renderItem={({ item, index }) => (
                            <View
                                key={index}
                                className={'rounded-xl flex items-center flex-col w-[25vw] m-1 p-3 bg-[#BBFF0020]'}
                            >
                                <Text className={'text-gray-600'}>{item?.key}</Text>
                                <Text className={'text-xl'}>{item?.value }</Text>
                            </View>
                        )}
                        numColumns={3}
                        className={'flex flex-row flex-wrap gap-3'}
                    />
                }
            />
            <CollapsableView
                className={'mb-5'}
                headerTitle={'Details'}
                headerImage={
                    <Image source={require('../../../assets/common/info.png')} className={'w-[20px] h-[20px]'} />
                }
                body={
                    <View className={'flex flex-col gap-y-1'}>
                        <Text className={'text-md'}>NFT Standard {assetMetadata?.standard || 'arc69'} asset</Text>
                        <Text className={' text-sm'} onPress={()=>{handlePress(`${REACT_APP_ALGOEXPLORER_ADDRESS}${nftDomain?.params?.creator}`)}}><Text className='font-bold'>Mint Address: </Text><Text className='text-blue-400 border-b border'>{nftDomain?.params?.creator?.substr(0,13)}...</Text></Text>
                        {/* <Text className={'text-sky-500 text-lg'}>Show mined address</Text> */}
                    </View>
                }
            />
            <CollapsableView
                className={'mb-5'}
                headerTitle={'Owners'}
                body={
                    <View className={'flex flex-col gap-y-2'}>
                        <View className={'flex flex-row gap-x-2 items-center'}>
                            <Image
                                source={require('../../../assets/authorized-view/default-profile.png')}
                                className={'w-[30px] h-[30px]'}
                            />
                            <View className={'flex flex-row items-center justify-between flex-grow'}>
                                <View className={'flex flex-col'}>
                                    <Text>Creator address</Text>
                                    {/* <Text className={'text-sky-500'}>{nftDomain?.params?.creator?.substr(0,13)}...</Text> */}
                                </View>
                                <Text className={'text-sky-500'}>{nftDomain?.params?.creator?.substr(0,13)}...</Text>
                            </View>
                        </View>
                        <View className={'flex flex-row gap-x-2 items-center'}>
                            <Image
                                source={require('../../../assets/authorized-view/default-profile.png')}
                                className={'w-[30px] h-[30px]'}
                            />
                            <View className={'flex flex-row items-center justify-between flex-grow'}>
                                <View className={'flex flex-col'}>
                                    <Text>Manager address</Text>
                                    {/* <Text className={'text-sky-500'}>guywhodoodles</Text> */}
                                </View>
                                <Text className={'text-sky-500'}>{nftDomain?.params?.manager?.substr(0,13)}...</Text>
                            </View>
                        </View>
                       
                    </View>
                }
            />
            <CollapsableView
                className={'mb-5'}
                headerTitle={'Activities'}
                body={
                    // <View className={'flex flex-col gap-y-2'}>
                    //     <View
                    //         className={
                    //             'flex flex-col gap-y-2 border-b border-b-gray-200 pb-3 items-end justify-between'
                    //         }
                    //     >
                    //         <View className={'w-full flex flex-row items-center justify-between'}>
                    //             <Image
                    //                 source={require('../../../assets/common/ethereum.png')}
                    //                 className={'w-[20px] h-[32px]'}
                    //             />
                    //             <Text className={'text-lg'}>2 ETH</Text>
                    //             <Text className={'text-lg'}>$3000</Text>
                    //             <Text>by 0xm3md...j23k</Text>
                    //         </View>
                    //         <View className={'flex flex-row item'}>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-neon'}>
                    //                 <Text className={'text-sm'}>Accept</Text>
                    //             </TouchableOpacity>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-purple-500 ml-3'}>
                    //                 <Text className={'text-sm'}>Decline</Text>
                    //             </TouchableOpacity>
                    //         </View>
                    //     </View>
                    //     <View
                    //         className={
                    //             'flex flex-col gap-y-2 border-b border-b-gray-200 pb-3 items-end justify-between'
                    //         }
                    //     >
                    //         <View className={'w-full flex flex-row items-center justify-between'}>
                    //             <Image
                    //                 source={require('../../../assets/common/ethereum.png')}
                    //                 className={'w-[20px] h-[32px]'}
                    //             />
                    //             <Text className={'text-lg'}>2 ETH</Text>
                    //             <Text className={'text-lg'}>$3000</Text>
                    //             <Text>by 0xm3md...j23k</Text>
                    //         </View>
                    //         <View className={'flex flex-row item'}>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-neon'}>
                    //                 <Text className={'text-sm'}>Accept</Text>
                    //             </TouchableOpacity>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-purple-500 ml-3'}>
                    //                 <Text className={'text-sm'}>Decline</Text>
                    //             </TouchableOpacity>
                    //         </View>
                    //     </View>
                    //     <View
                    //         className={
                    //             'flex flex-col gap-y-2 border-b border-b-gray-200 pb-3 items-end justify-between'
                    //         }
                    //     >
                    //         <View className={'w-full flex flex-row items-center justify-between'}>
                    //             <Image
                    //                 source={require('../../../assets/common/ethereum.png')}
                    //                 className={'w-[20px] h-[32px]'}
                    //             />
                    //             <Text className={'text-lg'}>2 ETH</Text>
                    //             <Text className={'text-lg'}>$3000</Text>
                    //             <Text>by 0xm3md...j23k</Text>
                    //         </View>
                    //         <View className={'flex flex-row item'}>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-neon'}>
                    //                 <Text>Accept</Text>
                    //             </TouchableOpacity>
                    //             <TouchableOpacity className={'rounded-full px-4 py-2 border-2 border-purple-500 ml-3'}>
                    //                 <Text>Decline</Text>
                    //             </TouchableOpacity>
                    //         </View>
                    //     </View>
                    // </View>
                    <Text>No Activities to display</Text>
                }
            />
            {/* <Text className={'text-xl text-center mb-5'}>More from this collection</Text> */}
            {/* <AssetsView  /> */}
        </ScrollView>
    );
};

export default AssetDetailView;
