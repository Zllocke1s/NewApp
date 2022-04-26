import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/LandingStyle';
import * as FileSystem from 'expo-file-system';
import { b64 } from './drip'
import React, { useEffect } from 'react';
export default function AboutUs() {

  const [loc, setLoc] = React.useState(null)


  useEffect(() => {
    setLoc({uri: `data:image/jpeg;base64,${loc}`})
  }, [])


  return (
    <View style={{flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: "#000",
      alignItems: 'center',
      alignContent: "center",
      justifyContent: 'flex-start', 
      }}>
      
        <Image source={{uri: `data:image/jpeg;base64,${b64}`}} style={{marginTop: 80, alignSelf: "center", width: "90%", height: 400}}></Image>
        <Text style={{marginLeft: 20, marginTop: 20, color: "#eee"}}><Text style={{fontWeight: 'bold'}}>The Team: </Text>Zack Winslow, Tyler Creamer, Jennifer Tenholder, Zachary Locke, Stephen Gullette, Grant Trowbridge (not pictured)</Text>
    </View>
    
  );
}

