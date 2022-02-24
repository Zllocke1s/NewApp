import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../core/utils';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../assets/logo.svg';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../styles/ForgotPasswordScreenStyle';
import qs from 'qs';
import { Linking } from 'react-native';





const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    Linking.openURL("http://outpostorganizer.com/SITE/OutpostMobile/forgotPassword.php").then(() => {
      
    navigation.navigate('LoginScreen');
    })

  };

const [isLoaded] = useFonts({
      "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
      "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
      "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
      });
    if (!isLoaded) {
      return <AppLoading />;
    } else {
    return (
  
    <View style={[styles.container]}>
      <View style={[styles.fixed]}>
        <Background />
      </View>
      <ScrollView style={[styles.fixed, {backgroundColor: 'transparent'}]}>
      <View style={styles.container}><BackButton goBack={() => navigation.navigate('HomeScreen')} />
  <Logo />

      <Header style={styles.heading}>Restore Password</Header>
      <View style={styles.forgotPassBox} >
    {/*  <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
    />*/}

      <Button mode="contained" onPress={_onSendPressed} style={styles.forgotPassButton}>
        Send Reset Instructions
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Back to login</Text>
      </TouchableOpacity>

      </View></View></ScrollView></View>
  );
}
};


export default memo(ForgotPasswordScreen);
