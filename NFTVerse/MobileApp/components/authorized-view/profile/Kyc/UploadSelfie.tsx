import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View, Button, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import BlackPrimaryButton from '../../../common/BlackPrimaryButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../../../store/app-slice';
import { StoreStateType } from '../../../../misc/types';
import { REACT_APP_FILE_UPLOAD, REACT_APP_X_APP_TOKEN } from 'denv';
import axios from 'axios';

const UploadSelfie: React.FC<{ navigation: NativeStackNavigationProp<any> }> = ({ navigation }) => {
    const [cameraPicture, setCameraPicture] = useState<any>();
    const [picture, setPicture] = useState('');
    const [capture, setCapture] = useState<string>('');
    const dispatch = useDispatch();
    const handleNext = React.useCallback(() => navigation.navigate('CheckDocuments'), [navigation]);
    const appCtx = useSelector((state: StoreStateType) => state.app)

    const _handleUploadSelfie = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            opacity: 1,
            base64: true
        });

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
                    fileName:'selfie',
                    fileUrl: result.base64,
                    type:'jpeg'
                }
            }
            axios(config)
                .then(function (response: any) {
                    console.log(response);
                    
                    dispatch(appActions.setPicture(response.data?.fileUrl));
                    dispatch(appActions.setCameraPicture(''));
                })
                .catch(function (error) {
                    console.log(error);

                    // toast.error('Uploading Back Side failed!');
                })

        }
    };


    const launchCamera = React.useCallback(async () => {

        //   storageOptions: {
        //     skipBackup: true,
        //     path: 'images',
        //   },
        // };
        // ImagePicker.launchCameraAsync(options, (response) => {
        //   console.log('Response = ', response);

        //   if (response.didCancel) {
        //     console.log('User cancelled image picker');
        //   } else if (response.error) {
        //     console.log('ImagePicker Error: ', response.error);
        //   } else if (response.customButton) {
        //     console.log('User tapped custom button: ', response.customButton);
        //     alert(response.customButton);
        //   } else {
        //     const source = { uri: response.uri };
        //     console.log('response', JSON.stringify(response));
        //     // this.setState({
        //     //   filePath: response,
        //     //   fileData: response.data,
        //     //   fileUri: response.uri
        //     // });
        //     setPicture(response.uri)
        //   }
        // });
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9],
            base64: true,
        });
        console.log(img);

        if (!img.cancelled) {
            let config = {
                method: 'post',
                url: `${REACT_APP_FILE_UPLOAD}/image/upload/base64`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': appCtx.authToken,
                    "X-App-Token": REACT_APP_X_APP_TOKEN,
                },
                data: {
                    fileName:'selfie',
                    fileUrl: img.base64,
                    type:'jpeg'
                }
            }
            axios(config)
                .then(function (response: any) {
                    console.log(response);
                    setCameraPicture(response.data?.fileUrl);
                    dispatch(appActions.setPicture(''));
                    dispatch(appActions.setCameraPicture(response.data?.fileUrl));
                })
                .catch(function (error) {
                    console.log(error);

                    // toast.error('Uploading Back Side failed!');
                })

        }
        // }
    }, []);

    return (
        <View className='pt-16 flex justify-center items-center' >
            <ScrollView
                className='w-[100%] flex gap-5'
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            >
                {/* {!appCtx.picture && */}

                <View className='w-[90%]'>
                    <Button
                        title="Click Selfie using camera"
                        onPress={() => launchCamera()}
                    // color={'#C1C2C4'}
                    />
                    {appCtx.cameraPicture ?
                        <Image source={{ uri: appCtx.cameraPicture }} style={{ width: '100%', height: 200 }} />
                        :
                        <View className='w-r[100%] h-[200px] flex justify-center items-center border border-gray-200'>
                            <Text>Click above button to Upload your selfie</Text>
                        </View>
                    }
                </View>
                {/* } */}
                <Text className='text-[20px]'>OR</Text>
                {/* {!appCtx.cameraPicture && */}
                <View className='w-[90%]'>
                    <Button
                        title="upload Selfie from device"
                        onPress={() => _handleUploadSelfie()}
                    // color={'#C1C2C4'}
                    />
                    {appCtx.picture ?
                        <Image source={{ uri: appCtx.picture }} style={{ width: '100%', height: 200 }} />
                        :
                        <View className='w-[100%] h-[200px] flex justify-center items-center border border-gray-200'>
                            <Text>Click above button to Upload your selfie</Text>
                        </View>
                    }
                </View>
                {/* } */}
                {(appCtx.cameraPicture || appCtx.picture) &&
                    <BlackPrimaryButton className='w-[90%]' primary={true} onPress={() => handleNext()}>{`Next -> Verify Documents`}</BlackPrimaryButton>
                }
            </ScrollView>
        </View>
    )
}
export default UploadSelfie