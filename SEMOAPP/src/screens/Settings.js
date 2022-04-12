import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TextInput, Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/SettingsStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import base64 from 'react-native-base64'

export default function Settings() {

  const [message, setMessage]  = React.useState(null)
  const [invalid, setInvalid] = React.useState(false);
  const [username, onChangeUser] = React.useState("");
  const [password, onChangePass] = React.useState("");


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
      if(response.ok)
      {
      response.json()
      }
      else
      {
       // throw new Error("invalid_credentials")
        setInvalid(true)
        return;
      }
    })
    .then((json) => {
      console.log(json)
      storeData("credentials", {username: username, password: password, so: json.userId})
    }
      )
    .catch((error) => {
      console.log((error));
    });
    //
  }
  


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
<TextInput
        style={styles.input}
        onChangeText={onChangeUser}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        error={true}
        errorText={{color: "red"}}
        onChangeText={onChangePass}
        value={password}
        placeholder="Password"
      />
        <TouchableOpacity style={styles.button} onPress={() => {
          login()
        }}><Text style={styles.logout}>Log In</Text></TouchableOpacity>    
        </View>
     
   
        </View>
        </View>
    
  );
}

