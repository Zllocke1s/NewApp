import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/SettingsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import base64 from 'react-native-base64'
import { Entypo } from '@expo/vector-icons'; 
import { theme } from '../core/theme';
import { AntDesign } from '@expo/vector-icons'; 

export default function Settings() {

  const [message, setMessage]  = React.useState(null)
  const [invalid, setInvalid] = React.useState(false);
  const [username, onChangeUser] = React.useState("");
  const [password, onChangePass] = React.useState("");
  const [isSecure, toggleSecure] = React.useState(true);
  const [save, toggleSave] = React.useState(true);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
    console.log("Stored")
    getData("credentials")
  }

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setMessage( jsonValue != null ? (JSON.parse(jsonValue)) : null);
      console.log("Pulled: " + jsonValue)
    } catch(e) {
      console.log("error")
      // error reading value
    }
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }

  function login() {
    fetch('http://mportal.semo.edu:8080/banner-mobileserver/api/2.0/security/getUserInfo',
    {
      headers: {
        Authorization: 'Basic '+base64.encode(username + ":" + password), 
    }, 
    })
    .then((response) => {
      console.log(JSON.stringify(response))
      if(!response.ok)
      {
       // throw new Error("invalid_credentials")
        setInvalid(true)
        return;
      }
      response.json().then((json) => {
      console.log(json)
      setInvalid(false)
      if(save)
      {
        storeData("credentials", {username: username, password: password, so: json.userId})
      }
    }
      )})
    .catch((error) => {
      console.log((error));
    });
    //
  }
  
  
  React.useEffect(() => {
      getData("credentials")
      }, [])


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Settings</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
      <View style={message!=null ? styles.loggedIn : styles.hidden}>
        <Text style={styles.message}>You are currently logged in as: <Text style={styles.username}>{message != null ? message.username : ""}</Text></Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          clearAll()
          setMessage(null)
        }}><Text style={styles.logout}>Logout</Text></TouchableOpacity>    
      </View>
      <View style={message==null ? styles.logIn : styles.hidden}>
      <Text style={styles.message}>You are not currently logged in</Text>
      <Text style={invalid ? styles.error : styles.hidden}>Error: Invalid Login.  Please try again.</Text>
<TextInput
        style={styles.input}
        onChangeText={onChangeUser}
        value={username}
        autoComplete="username"
        placeholder="Username"
      />
      <View style={styles.rows}>
      <TextInput
        style={styles.input}
        error={true}
        errorText={{color: "red"}}
        onChangeText={onChangePass}
        value={password}
        autoComplete="password"
        placeholder="Password"
        secureTextEntry={isSecure}
      />
      <TouchableOpacity style={styles.visible} onPress={() => {
        toggleSecure(!isSecure)
      }}><Entypo name={isSecure ? "eye-with-line" : "eye"} size={24} color={theme.colors.red} /></TouchableOpacity>
      
      </View>
 {/*       <TouchableOpacity style={styles.rememberMeRow} onPress={() => {
        toggleSave(!save)
      }}><AntDesign name={!save ? "checksquareo" : "checksquare"} size={20} color={theme.colors.red} />
      <Text>Remember me</Text>
    </TouchableOpacity> */}
              <TouchableOpacity style={styles.button} onPress={() => {
          login()
        }}><Text style={styles.logout}>Log In</Text></TouchableOpacity>    
        </View>
     
   
        </View>
        </View>
    
  );
}

