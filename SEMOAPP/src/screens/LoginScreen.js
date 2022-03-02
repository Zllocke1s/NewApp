import React, { memo, useState } from 'react';
import { TouchableOpacity, Text, View, KeyboardAvoidingView, ToastAndroid, Platform } from 'react-native';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { styles } from '../styles/LoginScreenStyle'
import { emailValidator, passwordValidator } from '../core/utils';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native-gesture-handler';
import * as Crypto from 'expo-crypto';
import { sha256 } from 'react-native-sha256';
import { Snackbar } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';






const LoginScreen = ({ navigation }) => {
  


  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [data, setData] = useState([]);
  const [inputText, setInputText] = useState('');
  const [text, setText] = useState('');

  

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    //http://outpostorganizer.com/SITE/api.php/records/SmallGroups?camp=wartburg
      fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=global', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //console.log(responseJson);
         setData(responseJson.records);
         const findIdByEmail = (data, email) => {
          const el = data.find(el => el.recoveryEmail.toLowerCase() === email.toLowerCase()); // Possibly returns `undefined`
          return el; // so check result is truthy and extract `id`
        }

        const user = findIdByEmail(responseJson.records, email.value);
        if(user==undefined)
        {
          console.error("No user found");
          
          return;
        }
        else
        {
          async function runCrypto() {
            const hash = await Crypto.digestStringAsync(
              Crypto.CryptoDigestAlgorithm.SHA256,
              password.value 
            );
        //    console.log('hash: ', hash);
        //    console.log('server hash: ', user.password);
            if(user.password === (hash))
          {
            fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + user.Home, {
              method: 'GET'
           }).then((response) => response.json())
           .then((responseJson2) => {
            const userAdv = findIdByEmail(responseJson2.records, email.value);

            save("user", JSON.stringify(userAdv))
            console.log(userAdv);
            navigation.navigate('Wrapper', {user: userAdv} );
          

           });

            }
          else
          {
            //console.log(user.password + " does not match " + hash);
            setEmail({ ...email, error: "Invalid Username or Password" });
            setPassword({ ...password, error: "Invalid Username or Password" });
            return;
          }
          }
          runCrypto(); //THIS IS WHAT I"M WORKING ON!  TRYING TO GET THE PASSWORD ENCRYPTED WITH SHA-256
          
        }
         
      })
      
      .catch((error) => {
         console.error(error);
      });
      
      

 // 
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
<Text style={styles.title}>Log In</Text>
<View style={styles.loginBox}>
<TextInput
  label="Email"
  returnKeyType="next"
  value={email.value}
  onChangeText={text => setEmail({ value: text, error: '' })}
  error={!!email.error}
  errorText={email.error}
  autoCapitalize="none"
  autoCompleteType="email"
  textContentType="emailAddress"
  keyboardType="email-address"
  underlineColorAndroid="transparent"
/>

<TextInput 
  label="Password"
  returnKeyType="done"
  value={password.value}
  onChangeText={text => setPassword({ value: text, error: '' })}
  error={!!password.error}
  errorText={password.error}
  
  secureTextEntry
/>
<View>
<View style={styles.forgotPassword}>
{  <TouchableOpacity
    onPress={() => navigation.navigate('ForgotPasswordScreen')}
  >
  <Text style={styles.label}>Forgot your password?</Text>
  </TouchableOpacity>}
  <Button style={styles.loginButton} mode="contained" onPress={_onLoginPressed}>
  <Text style={styles.loginButtonText} >Log In</Text>
</Button>

  </View>

</View>
</View>

<View style={styles.row}>
  <Text style={styles.label}>Don’t have an account? </Text>
  <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
    <Text style={styles.link}>Sign up</Text>
  </TouchableOpacity>
</View></View>
</ScrollView>
</View>



   
  );
  }
};



export default memo(LoginScreen);
