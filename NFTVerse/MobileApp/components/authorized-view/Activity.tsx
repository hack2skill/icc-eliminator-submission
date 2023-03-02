import axios from 'axios';
import { REACT_APP_ALGOEXPLORER_ADDRESS, REACT_APP_ALGORAND_TRANSACTION, REACT_APP_GATEWAY_ALGOEXPLORER } from 'denv';
import React, { useCallback } from 'react';
import { Alert, Linking, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../../misc/types';
import { jsonToCSV } from 'react-native-csv'
import TransactionSkeletonLoader from '../skeletonLoader/TransactionSkeletonLoader';

const Activity = () => {
    const [transaction, setTransaction] = React.useState<any>([]);
    const appCtx = useSelector((state: StoreStateType) => state.app)

    const handlePress = useCallback(async (url: string) => {
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


    const handleDownload = () => {
        let array = [{}];
        let csv = 'amount,sender,reciever,type\n'
        transaction?.map((tran: any) => {
            let type = tran['asset-transfer-transaction']?.amount ? tran['asset-transfer-transaction']?.amount : tran['payment-transaction']?.amount ? tran['payment-transaction']?.amount : '0';
            let type1 = type === 0 ? 'OptedIn' : 'Transfer'
            csv +=
                tran['asset-transfer-transaction']?.amount ? tran['asset-transfer-transaction']?.amount / 1000000 : tran['payment-transaction']?.amount ? tran['payment-transaction']?.amount / 1000000 : '0' + ',' +
                    tran?.sender?.substring(0, 10) || null + ',' +
                    tran['asset-transfer-transaction']?.receiver?.substring(0, 10) || tran['payment-transaction']?.receiver?.substring(0, 10) + ',' +
                    type1 + '\n'
            array = [...array, {
                amount: tran['asset-transfer-transaction']?.amount ? tran['asset-transfer-transaction']?.amount / 1000000 : tran['payment-transaction']?.amount ? tran['payment-transaction']?.amount / 1000000 : '0',
                sender: tran?.sender?.substring(0, 10) || null,
                reciever: tran['asset-transfer-transaction']?.receiver?.substring(0, 10) || tran['payment-transaction']?.receiver?.substring(0, 10),
                type: type1
            }]

        })
        //     array.forEach(function(row) {  
        //         csv += row.join(',');  
        //         csv += "\n";  
        // });
        const results = jsonToCSV(array);
        // var hiddenElement = document.createElement('a');
        // hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        // hiddenElement.target = '_blank';

        //provide the name for the CSV file to be downloaded  
        // hiddenElement.download = 'Famous Personalities.csv';
        // hiddenElement.click();

    }
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const loadData = React.useCallback(() => {
        setIsLoading(true)
        axios(`${REACT_APP_ALGORAND_TRANSACTION}${appCtx.walletAddress[0]?.address}/transactions?limit=100`)
            .then((res) => {
                setIsLoading(false)
                console.log(res.data.transactions);
                setTransaction(res.data.transactions || []);
            })
            .catch((rej) => {
                setIsLoading(false)
                setTransaction([])
            })
    }, [])

    React.useEffect(() => {
        loadData();
    }, [])
    return (
        <>

            <ScrollView
            >
                <View className='flex flex-row justify-between items-center w-[90%] py-5'>
                    <Text className='text-[25px] font-bold pl-2'>Activity</Text>
                    {/* <Text className='bg-purple-200 rounded-lg p-2 text-[12px] flex justify-center items-center font-bold'>Downoad CSV</Text> */}
                </View>
                {
                    isLoading ?
                        <>
                            {/* <View className={`flex-1 ${''} w-screen flex-col flex-wrap justify-center items-center`}> */}
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />
                            <TransactionSkeletonLoader />

                            {/* </View>   */}
                        </>
                        :
                        transaction?.length !== 0 ?
                            transaction?.map((tran: any) => {
                                let type = tran['asset-transfer-transaction']?.amount ? tran['asset-transfer-transaction']?.amount : tran['payment-transaction']?.amount ? tran['payment-transaction']?.amount : '0';

                                return (
                                    <View className='flex flex-col items-center'>
                                        <View className='flex flex-row gap-2 w-[100%] justify-center items-center'>
                                            <View className='bg-violet-300 h-[2px] w-[35%]'></View>
                                            <Text className='text-blue-500' onPress={() => { handlePress(`${REACT_APP_GATEWAY_ALGOEXPLORER}${tran?.id}`) }}><Text className='font-bold'>txid:</Text>{tran?.id?.substring(0, 10)}...</Text>
                                            <View className='bg-violet-300 h-[2px] w-[35%]'></View>
                                        </View>
                                        <View className='w-[100%] flex flex-col gap-10 justify-center items-center mb-[30px]'>
                                            <View className='flex flex-row justify-between items-center w-[90%]'>
                                                <View className='gap-2'>
                                                    <Text className='text-[18px] font-bold'>Amount</Text>
                                                    {/* <Text >{tran?.sender?.substring(0, 10) || null}...</Text> */}
                                                </View>
                                                <View>
                                                    <Text className='text-green-500'>{tran['asset-transfer-transaction']?.amount ? tran['asset-transfer-transaction']?.amount / 1000000 : tran['payment-transaction']?.amount ? tran['payment-transaction']?.amount / 1000000 : '0'}</Text>
                                                </View>
                                            </View>
                                            <View className='flex flex-row justify-between items-center w-[90%]'>
                                                <View className='gap-2'>
                                                    <Text className='text-[18px] font-bold'>Sender</Text>
                                                </View>
                                                <View>
                                                    <Text className='text-blue-500' onPress={() => { handlePress(`${REACT_APP_ALGOEXPLORER_ADDRESS}${tran?.sender}`) }}>{tran?.sender?.substring(0, 10) || null}...</Text>
                                                </View>
                                            </View>
                                            <View className='flex flex-row justify-between items-center w-[90%]'>
                                                <View className='gap-2'>
                                                    <Text className='text-[18px] font-bold'>Reciever</Text>
                                                </View>
                                                <View>
                                                    <Text className='text-blue-500' onPress={() => { handlePress(`${process.env.REACT_APP_REACT_APP_ALGOEXPLORER_ADDRESS}${tran['asset-transfer-transaction']?.receiver || tran['payment-transaction']?.receiver}`) }}>{tran['asset-transfer-transaction']?.receiver?.substring(0, 10) || tran['payment-transaction']?.receiver?.substring(0, 10)}...</Text>
                                                </View>
                                            </View>
                                            <View className='flex flex-row justify-between items-center w-[90%]'>
                                                <View className='gap-2'>
                                                    <Text className='text-[18px] font-bold'>Type</Text>
                                                </View>
                                                <Text >{type === '0' ? 'Opt In' : 'transfer'}</Text>
                                                {/* <View>
                                    <Text className='text-green-500'>-1.00 Algo</Text>
                                </View> */}
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                            :
                            <View className='flex flex-row justify-center items-center font-bold w-screen h-[70vh]'>
                                <Text className='font-bold text-[15px]'>No Transactions found</Text>
                            </View>
                }
            </ScrollView>
        </>
    )
};

export default Activity;
