import React,{useState} from 'react';
import { Image, Text, View,Alert } from 'react-native';
import TextField from '../../common/TextField';
import BlackPrimaryButton from '../../common/BlackPrimaryButton';
import useHttp from '../../../hooks/use-http';
import { REACT_APP_NFTVERSE_DEV_API, REACT_APP_X_APP_TOKEN } from 'denv';

const FAQ = () => {
    const makeRequest = useHttp();
    const [email, setEmail] = useState('');
    const [query, setQuery] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [isQueryEmailSent, setIsQueryEmailSent] = useState(false);
    const sendEmail = React.useCallback(() => {
        if (email && query) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                makeRequest(
                    {
                        url: `${REACT_APP_NFTVERSE_DEV_API}/internal/email/send`,
                        data: {
                            "body": `${email} ${userId} ${address} ${query}`,
                            "email": "info@onnftverse.com",
                            "subject": 'NFTVerse Info query Details'
                        },
                        method: "post",
                        headers: {
                            "X-App-Token": REACT_APP_X_APP_TOKEN,
                            "Content-Type": "application/json",
                        },
                    },
                    (data) => {
                        console.log(data);
                        setIsQueryEmailSent(true);
                        setEmail('');
                        setQuery('');
                        setUserId('');
                        setAddress('');
                        Alert.alert('Your Query Mailed successfully!')

                    },
                    (error) => {
                        Alert.alert('Something went worng')
                    }
                )
            }
            else {
                Alert.alert('Incorrect Email Id')
            }
        }
        else {
            Alert.alert('Input field cannot be empty')
        }
    },[email,query])

    const handleEmailChange = React.useCallback((emailId:string) => {
        setEmail(emailId);
    },[email])
    const handleQueryChange = React.useCallback((queryText:string) => {
        setQuery(queryText);
    },[query])
    return (
        <View className={'flex flex-col items-center h-screen'}>
            <Image source={require('../../../assets/authorized-view/faq-bg.png')} className={'w-[100vw] h-[26%]'} />
            <Text className={'text-2xl'}>Support</Text>
            <View className={'flex flex-col w-full px-5 mt-9 mb-3'}>
                <Text>Your Email</Text>
                <TextField placeholder={'johndoe@gmail.com'} className="bg-violet-100 border border-violet-200" value={email} onChange={handleEmailChange}/>
            </View>
            <View className={'flex flex-col w-full px-5 mb-8'}>
                <Text>Your Query</Text>
                <TextField placeholder={'Enter your query'} className="bg-violet-100 border border-violet-200" value={query} onChange={handleQueryChange} />
            </View>
            <BlackPrimaryButton className={'w-[200px]'} onPress={()=>{sendEmail()}}>Submit</BlackPrimaryButton>
        </View>
    );
};

export default FAQ;
