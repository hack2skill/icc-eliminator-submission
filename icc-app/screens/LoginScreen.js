import React, { useState } from 'react';
import { Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Formik } from 'formik';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { View, TextInput, Logo, Button, FormErrorMessage} from '../components';
import { Images, Colors, auth } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = values => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch(error =>
      setErrorState(error.message)
    );
  };

  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            // width='20'
            source={Images.logo}
          />
            <Text style={styles.screenTitle}>Welcome back!</Text>
            <Text style={styles.screenSubTitle}>Experience Cricket Like Never Before - Anytime, Anywhere!</Text>
          </View>
          
        <View style={{flex: 1, alignItems: 'center'}}>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur
            }) => (
              <>
                {/* Input fields */}
                <TextInput
                  name='email'
                  leftIconName='email'
                  placeholder='Enter email'
                  autoCapitalize='none'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                <TextInput
                  name='password'
                  leftIconName='key-variant'
                  placeholder='Enter password'
                  autoCapitalize='none'
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType='password'
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <FormErrorMessage
                  
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to create a new account */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Create a new account?'}
            color='#ffffff'
            onPress={() => navigation.navigate('Signup')}
            titleStyle={styles.buttonTitle}
            
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Forgot Password'}
            onPress={() => navigation.navigate('ForgotPassword')}
          />

        </View>

        </KeyboardAwareScrollView>
      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 140,
    resizeMode: 'contain',
    marginBottom: 10
  },
  screenTitle: {
    fontSize: 32,
    color: Colors.white,
    fontFamily: 'HindSiliguriBold',
  },
  screenSubTitle:{
    fontSize: 18,
    color: Colors.white,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'HindSiliguriMedium',
    lineHeight: 26,
  },
  buttonTitle: {
    color: 'white',
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.orange
  },
  button: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
    backgroundColor: Colors.lightBlue,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: 'HindSiliguriSemiBold',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
