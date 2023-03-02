import React, { FC, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import useAuthorizedHttp from '../../../hooks/use-authorized-http';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../../../hooks/use-http';
import AssetItemView from './AssetItemView';
import NftViewSkeleton from './NftViewSkeleton';
import { REACT_APP_URL_BLOCKCHAIN_SERVICE, REACT_APP_X_APP_TOKEN } from 'denv';

const AssetsView = ({ navigation }) => {
    const makeAuthorizedRequest = useAuthorizedHttp();
    const makeRequest = useHttp();
    const userId = useSelector((state) => state.app.user.userId);
    const [nfts, setNfts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const appCtx = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const loadData = React.useCallback(() => {
        setIsLoading(true);
        // ${appCtx.walletAddress[0]?.address}
        makeAuthorizedRequest(
            {
                method: 'get',
                url: `${REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/${appCtx.walletAddress[0]?.address}/list`,
                headers: {
                    "X-App-Token": REACT_APP_X_APP_TOKEN,
                    "X-Auth-Token": appCtx.authToken,
                    "Content-Type": "application/json",
                }
            },
            data => {
                // setNfts(data.content);
                let nftArray= [];
                data.content?.map((item) => {
                    if (item?.params?.total?.length == 1) {
                        nftArray = [...nftArray, item]
                    }
                })
                setNfts(nftArray)
                // dispatch(appActions.setTaleAmount(tokenArray));

            },
            error => console.log(error),
            () => setIsLoading(false),
        );
    }, [makeRequest]);

    useEffect(loadData, [loadData]);

    const handlePress = React.useCallback(
        (metaData, nfts) => {
            navigation && navigation.navigate('AssetDetails', { metaData, nfts });
        },
        [navigation],
    );

    return (
        // nfts?.length === 0 ? (
        //     <View className="w-[100%] min-h-[200px] flex flex-row justify-center items-center">
        //         <Text style={{ fontSize: 20, fontWeight: 'bold' }} >No NFTs</Text>
        //     </View>
        // ) : (
        <>
           
            <FlatList
                className={` w-[99vw] ${nfts?.length > 2 && 'mb-[120px]'}`}
                numColumns={2}
                onRefresh={loadData}
                refreshing={isLoading}
                data={nfts}
                extraData={nfts}
                ListEmptyComponent={(nfts) => (
                    <>
                        {isLoading ?
                            <View className={`flex-1 ${navigation && 'mx-2 py-2'} w-screen flex-row flex-wrap`}>
                                <NftViewSkeleton />
                                <NftViewSkeleton />
                                <NftViewSkeleton />
                            </View>
                            :
                            <View className="w-[100%] min-h-[200px] flex flex-row justify-center items-center ">
                                <Text className="text-white" style={{ fontSize: 20, fontWeight: 'bold' }} >No NFTs</Text>
                            </View>
                        }
                    </>
                )}
                renderItem={({ item, index }) => {
                    return <AssetItemView onClick={handlePress} nft={item} key={index} />
                }}
            />
             
        </>
        // )
    )
};

export default AssetsView;
