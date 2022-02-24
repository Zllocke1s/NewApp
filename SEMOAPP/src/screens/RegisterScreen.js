import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { styles } from '../styles/RegisterScreenStyle'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView } from 'react-native-gesture-handler';
import * as Crypto from 'expo-crypto';


import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../core/utils';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [smallGroup, setSmallGroup] = useState({ value: '', error: '' });
  const [entryCode, setEntryCode] = useState({ value: '', error: '' });



  async function runCrypto() {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password.value 
    );
    const entryHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      entryCode.value 
    );
    console.log('hash: ', hash);
    fetch('http://outpostorganizer.com/SITE/api.php/records/EntryCodes?camp=global', {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson0) => {
      var campSite = (responseJson0.records.find(el => el.code === entryHash));
        if(campSite==null)
        {
          setEntryCode({ ...entryCode, error: "Error: This entry code is not associated with a registered camp." });
          return;
        }

          fetch('http://outpostorganizer.com/SITE/api.php/records/SmallGroups?camp=' + campSite.camp, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        var gID = (responseJson.records.find(el => el.Name === smallGroup.value));
        console.log(gID);
        fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + campSite.camp, {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson2) => {
          if((responseJson2.records.find(el => el.recoveryEmail === email.value) != null) ||
          (responseJson2.records.find(el => el.screenName === name.value) != null))
          {
            if((responseJson2.records.find(el => el.screenName === name.value) != null))
            {
              setName({ ...name, error: "Error: This name is associated with another account." });
            }
            if((responseJson2.records.find(el => el.recoveryEmail === email.value) != null))
            {
              setEmail({ ...email, error: "Error: This email is associated with another account." });
            }
            console.log("Error: Account in use");

          }
          else if((gID==null))
          {
            setSmallGroup({ ...smallGroup, error: "Error: There are no small groups associated with this name." });
          }
          else
          {

            fetch('http://outpostorganizer.com/SITE/api.php/records/Users/?camp=global', {
              method: 'POST',
              body: JSON.stringify(
                {
                  Home: campSite.camp,
                  screenName: name.value,
                  password: hash,
                  recoveryEmail: email.value,
              
          }
              )
            })
          .then((response) => response.json().then((responseJson3) => {
            fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=global', {
          method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson4) => {

            fetch('http://outpostorganizer.com/SITE/api.php/records/Users/?camp=' + campSite.camp, {
              method: 'POST',
              body: JSON.stringify(
                {
                  UID: (responseJson4.records.find(el => el.recoveryEmail === email.value)).UID,
                  Home: campSite.camp,
                  screenName: name.value,
                  password: hash,
                  smallGroup: gID.id,
                  recoveryEmail: email.value,
                  location: "",
                  points: 0,
                  isAdmin: 0,
                  isOwner: 0, 
                  infCoins: 0,
                  infShield: 0,
                  infIsInfected: 0,
                  infFoundCoin: 0,
                  profilePicURL: "https://sorel-lookbook.com/wp-content/themes/sorel-microsite-theme/library/img/default-person.png"
          }
              )
            })
          .then((response) => response.json())
          .then((responseJson) => {

              console.log("Post Response from webpage\nhttp://outpostorganizer.com/SITE/api.php/records/Users/?camp=" + campSite.camp)
              console.log(JSON.stringify(responseJson));
              console.log("Body from post: \n\n" + JSON.stringify(
                {
                  UID: (responseJson4.records.find(el => el.recoveryEmail === email.value)).UID,
                  Home: campSite.camp,
                  screenName: name.value,
                  password: hash,
                  smallGroup: gID.id,
                  recoveryEmail: email.value,
                  location: "",
                  points: 0,
                  isAdmin: 0,
                  isOwner: 0, 
                  infCoins: 0,
                  infShield: 0,
                  infIsInfected: 0,
                  infFoundCoin: 0,
                  profilePicURL: "https://sorel-lookbook.com/wp-content/themes/sorel-microsite-theme/library/img/default-person.png"
          }
              ));
              navigation.navigate('Wrapper', {user: {
                UID: (responseJson4.records.find(el => el.recoveryEmail === email.value)).UID,
                Home: campSite.camp,
                screenName: name.value,
                password: hash,
                smallGroup: gID,
                recoveryEmail: email.value,
                location: "",
                points: 0,
                isAdmin: 0,
                isOwner: 0, 
                infCoins: 0,
                infShield: 0,
                infIsInfected: 0,
                infFoundCoin: 0,
                profilePicURL: ""
              }} );
            })
            
            .catch((error) => {
              console.error(error);
              console.log("ERROR");
            });


        });
          }));

            
          }

        });
        
      });

});
    
  }



  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    runCrypto();

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
    <ScrollView contentContainerStyle={styles.container}><BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Header>Create Account</Header>
      <View style={styles.registerBox}>
      <TextInput
        label="Entry Code"
        returnKeyType="next"
        value={entryCode.value}
        onChangeText={text => setEntryCode({ value: text, error: '' })}
        error={!!entryCode.error}
        errorText={entryCode.error}
      />
      <TextInput
      label="Small Group"
      returnKeyType="next"
      value={smallGroup.value}
      onChangeText={text => setSmallGroup({ value: text, error: '' })}
      error={!!smallGroup.error}
      errorText={smallGroup.error}
    />
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />

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

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.registerButton}>
        Sign Up
      </Button>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View></ScrollView></ScrollView></View>
  );
  }
};


export default memo(RegisterScreen);
