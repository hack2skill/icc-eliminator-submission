import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState, FC } from 'react';
import { Image, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { StoreStateType } from '../../../../misc/types';
import DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import BlackPrimaryButton from '../../../common/BlackPrimaryButton';
import { ScrollView } from 'react-native-gesture-handler';
import { appActions } from '../../../../store/app-slice';
import { REACT_APP_FILE_UPLOAD, REACT_APP_X_APP_TOKEN } from 'denv';
import useHttp from '../../../../hooks/use-http';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const KycVerification: FC<{ navigation: NativeStackNavigationProp<any> }> = ({ navigation }) => {
    const appCtx = useSelector((state: StoreStateType) => state.app)
    const [country, setCountry] = useState([{}]);
    const [selectedCountry, setSelectedCountry] = useState();
    const fileRef = useRef();
    const [image, setImage] = useState<any>();
    const [backImage, setBackImage] = useState<any>();
    const [hasGallaryPermission, setHasGallaryPermission] = useState<any>(null);
    const makeRequest = useHttp();


    const handleNext = React.useCallback(() => {

        if (appCtx.country) {
            if (appCtx.frontSide || image) {
                if (appCtx.backSide || backImage) {
                    navigation.navigate('KycUploadSelfie'), [navigation]
                }
                else {
                    Alert.alert('Document BackSide not uploaded')
                }
            }
            else {
                Alert.alert('Document FrontSide not uploaded')
            }
        } else {
            Alert.alert('Please select your country')
        }
    }, [appCtx.country,appCtx.frontSide,appCtx.backSide]);
    const dispatch = useDispatch();
    const handleCountryCode = () => {

        fetch('https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json', { method: 'get' })
            .then((response) => {
                return response.json();
            })
            .then((result: any) => {
                let codeArray: any = [];
                result.map((res: any) => {
                    codeArray = [...codeArray, res.name]
                })
                setCountry(codeArray);
            })
    }

    //     fileRef?.current?.click();
    // }
    // const handleBackChange = useCallback((file:any) => {
    //     console.log('back');

    //     if (file) {

    //         // setBackSide(file.File);
    //         // dispatch(appActions.setBackSideFile(file))
    //         const objectUrl = URL.createObjectURL(file);
    //         // setBacksidePreview(objectUrl);
    //         const data = new FormData();
    //         data.append('file', file);
    //         data.append('fileName', `Document Back`);
    //         data.append('fileUrl', objectUrl);
    //         let config = {
    //             method: 'post',
    //             url: `${process.env.REACT_APP_REACT_APP_FILE_UPLOAD}/kyc/document/upload`,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'X-Auth-Token': appCtx.authToken,
    //                 "X-App-Token": process.env.REACT_APP_REACT_APP_X_APP_TOKEN,
    //             },
    //             data: data
    //         };
    //         // toast.promise(
    //         //     () =>
    //                 axios(config)
    //                     .then(function (response:any) {
    //                         // setLogoUrl(response.data.fileUrl);
    //                         // const marketplace = {
    //                         //     marketplaceId: marketplaceId,
    //                         //     collectionLogo: response.data.fileUrl
    //                         // };
    //                         // dispatch(appActions.setBackSide(response.data?.fileUrl))

    //                         // toast.success('Back Side Uploaded Successfully')
    //                     })
    //                     .catch(function (error:any) {
    //                         // toast.error('Uploading Back Side failed!');
    //                     }),
    //             {
    //                 pending: 'uploading Back side',
    //                 // success: 'Settings updated successfully!',
    //                 // error: 'Uh-oh! Something went wrong'
    //             }
    //         // );
    //         return () => URL.revokeObjectURL(objectUrl);
    //     }
    // }, []);
    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGallaryPermission(galleryStatus.status === 'granted');
        })();
        handleCountryCode();
    }, [])

    // const _pickDocument = async () => {
    //     let result = await DocumentPicker.getDocumentAsync({});
    //     // alert(result.uri);
    //     console.log(result);
    // }

    const _pickImageFront = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            opacity: 1,
            base64: true
        });

        // alert(result);

        if (!result.cancelled) {
            //   this.setState({ image: result.uri });
            console.log(result)

            let config = {
                method: 'post',
                url: `${REACT_APP_FILE_UPLOAD}/image/upload/base64`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': appCtx.authToken,
                    "X-App-Token": REACT_APP_X_APP_TOKEN,
                },
                data: {
                    fileName: 'FrontSide',
                    fileUrl: result.base64,
                    type: 'jpeg'
                }
            }
            axios(config)
                .then(function (response: any) {
                    console.log(response);
                    setImage(response.data?.fileUrl)
                    dispatch(appActions.setFrontSide(response.data?.fileUrl));
                })
                .catch(function (error) {
                    console.log(error);

                    // toast.error('Uploading Back Side failed!');
                })

        }
    };

    const _pickImageBack = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            opacity: 1,
            base64: true
        });

        // alert(result);
        console.log(result)

        if (!result.cancelled) {
            //   this.setState({ image: result.uri });


            let config = {
                method: 'post',
                url: `${REACT_APP_FILE_UPLOAD}/image/upload/base64`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': appCtx.authToken,
                    "X-App-Token": REACT_APP_X_APP_TOKEN,
                },
                data: {
                    fileName: 'BackSide',
                    fileUrl: result.base64,
                    type: 'jpeg'
                }
            }
            axios(config)
                .then(function (response: any) {
                    console.log(response);
                    setBackImage(response.data?.fileUrl);
                    dispatch(appActions.setBackSide(response.data?.fileUrl));
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    };

    if (hasGallaryPermission === false) {
        return alert('No Access to Internal Storage')
    }



    return (
        <View className='pt-3 flex justify-center items-center overflow-y-scroll' >
            <ScrollView
                className='w-[100%] flex'
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                <Text className='text-[30px] font-bold mb-[20px]'>
                    Kyc Verification
                </Text>
                <View className='w-[100%] flex justify-center items-center gap-2'>
                    <Text className='text-[20px] font-bold w-[100%] pl-[20px] text-left'>Select Country</Text>
                    <SelectDropdown
                        // dropdownStyle={{width:'80%'}}
                        defaultButtonText={selectedCountry}
                        defaultValue={selectedCountry}
                        buttonStyle={{ width: '80%', borderBottomColor: 'black' }}
                        data={country}
                        onSelect={(selectedItem, index) => {
                            setSelectedCountry(selectedItem)
                            dispatch(appActions.setCountry(selectedItem))
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        onChangeSearchInputText={() => {

                        }}
                    />
                </View>
                <View className='w-[100%] flex justify-center items-center gap-2'>
                    <Text className='text-[20px] font-bold w-[100%] pl-[20px] text-left'>Identity Document</Text>
                    <View className='flex justify-between gap-y-3 w-[90%]'>
                        <View >
                            <Button
                                title="Select FrontSide"
                                onPress={() => _pickImageFront()}

                            // color={'#C1C2C4'}
                            />
                            {appCtx.frontSide ?
                                <Image source={{ uri: appCtx.frontSide }} style={{ width: '100%', height: 200 }} />
                                :
                                <View className='w-[100%] h-[200px] flex justify-center items-center border border-gray-200'>
                                    <Text>Upload Front Side of your Document</Text>
                                </View>
                            }
                        </View>
                        <View >
                            <Button
                                title="Select BackSide"
                                onPress={() => _pickImageBack()}
                            // color={'#C1C2C4'}
                            />
                            {appCtx.backSide ?
                                <Image source={{ uri: appCtx.backSide }} style={{ width: '100%', height: 200 }} />
                                :
                                <View className='w-[100%] h-[200px] flex justify-center items-center border border-gray-200'>
                                    <Text>Upload Back Side of your Document</Text>
                                </View>
                            }
                        </View>
                    </View>

                    <BlackPrimaryButton primary={true} onPress={() => { handleNext() }}>{`Next -> Upload Selfie`}</BlackPrimaryButton>
                </View>
            </ScrollView>
        </View>
    );
};

export default KycVerification;