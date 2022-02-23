import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { theme } from '../core/theme';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
import Constants from 'expo-constants';



const HomeScreen = ({ navigation }) => {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


  registerForPushNotificationsAsync = async (el) => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      el.pushToken = token
        console.log("Sending " + global.feedback);
        fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + el.UID + '?camp=' + el.Home, {
          method: 'PUT',
          body: JSON.stringify({
            pushToken: token,            
        })
        })
       .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson.records == []);
          console.log("Token Response: " + JSON.stringify(responseJson));     
    
        })
        
        .catch((error) => {
           console.error(error);
           console.log("ERROR");
        });
      
      console.log("Token" + token); //Pass this to server so server can store and then use to send push  notifications
      //Side note: how tf is the server gonna send push notifications
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    };


  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function attemptLogin(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      //alert("🔐 Here's your value 🔐 \n" + JSON.stringify(result));

      fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + JSON.parse(result).Home, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(result);
         //console.log(responseJson);
      //   setData(responseJson.records);
         //const findIdByEmail = (data, email) => {
           // console.log("result.UID: " + JSON.parse(result).UID);
           //console.log("recordsLink: " + 'http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + result.Home);
          const el = responseJson.records.find(el => el.UID === JSON.parse(result).UID); // Possibly returns `undefined`
      //    console.log(responseJson.records);
          if(el==undefined)
          {
            console.error("No user found: " + result);
            
          }
          else
          {          
              if(JSON.parse(result).password == el.password)
            {
  
  
              if(el.pushToken==null || el.pushToken=="")
              {
                console.log("El's push token is null.  Registering new one.")
                registerForPushNotificationsAsync(el)
              }
              else
              {
                console.log(el.screenName + "'s Push Token: " + el.pushToken)
              }
              save("user", JSON.stringify(el));  
              navigation.navigate('Wrapper', {user: el} );
            }
          }
      });

        

    } else {
     // alert('No values stored under that key.');
    }
  }

  
  attemptLogin("user");

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else {
  return (    
  
  <Background>
    <Header>Welcome to Bottle Shock</Header>

    <Paragraph>
    
    </Paragraph>
    <Button color={theme.colors.lightGreen} mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      color={theme.colors.medBlue} 
      mode="contained"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Sign Up
    </Button>
    
  </Background> ) };
};

export default memo(HomeScreen);
