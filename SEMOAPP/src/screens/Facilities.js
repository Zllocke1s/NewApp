import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/AthleticsStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import {Game}  from '../components/Game';
import {Tile} from '../components/Tile';
import {recFacilities} from '../core/static';

export default function Facilities({navigation}) {

  const [games, setGames] = useState(null)
  

  const [loaded] = useFonts({
    Times: require('../assets/fonts/times.ttf'),
  });

  if(!loaded)
  {
    return <AppLoading/>

  }
  return (
    <View style={styles.container}>
                  <Heading navigation={navigation} title={null}>
          <Image style={styles.logo}
            source={require("../assets/rec.png")}
           ></Image>
                     </Heading>
      <View style={styles.content}>

      <View style={styles.upcomingContainer}>
        <Text style={[styles.title, {fontFamily: 'Times'}]}>Facilities:</Text>
        <View style={styles.gameContainer}>
        {recFacilities.map((item) => {
          return(
            <Text style={styles.facility}>{"\t\t\u25CF\t\t" + item}</Text>
          )
        })}
        </View>
        </View>
        </View>
        </View>
        
    
  );
}

