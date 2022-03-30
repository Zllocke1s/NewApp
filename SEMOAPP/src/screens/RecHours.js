import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/AthleticsStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import {Game}  from '../components/Game';
import {Tile} from '../components/Tile';
import {recFacilities} from '../core/static';

export default function RecHours({navigation}) {


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
      <View style={styles.container2}>
      <ScrollView style={styles.scrollable}>
      <View style={styles.headerContainer}>
          <Image style={styles.logo}
                   source={require("../assets/rec.png")}
           ></Image>
      </View>
      <View style={styles.content}>
      <View style={styles.infoContainer}>
        <Text style={[styles.textTitle, {fontFamily: 'Times'}]}>Recreation Center</Text>
        <Image source={require("../assets/recCenter.jpg")} style={{width: 200, height: 100}} />
        <Text style={[styles.address, {fontFamily: "Times"}]}>750 New Madrid Street, Cape Girardeau, MO 63701</Text>
        <Text style={[styles.hours, {fontFamily: "Times"}]}>Hours of Operation</Text>
        <View style={styles.hoursContainer}>
        <View style={styles.dates}>
            <Text style={styles.dateText}>Sunday</Text>
            <Text style={styles.dateText}>Monday</Text>
            <Text style={styles.dateText}>Tuesday</Text>
            <Text style={styles.dateText}>Wednesday</Text>
            <Text style={styles.dateText}>Thursday</Text>
            <Text style={styles.dateText}>Friday</Text>
            <Text style={styles.dateText}>Saturday</Text>
          </View>
          <View style={styles.hoursListed}>
          <Text style={styles.dateText}>12:00 PM     to     11:00 PM</Text>
          <Text style={styles.dateText}>5:30 AM       to     11:00 PM</Text>
          <Text style={styles.dateText}>5:30 AM       to     11:00 PM</Text>
          <Text style={styles.dateText}>5:30 AM       to     11:00 PM</Text>
          <Text style={styles.dateText}>5:30 AM       to     11:00 PM</Text>
          <Text style={styles.dateText}>5:30 AM       to     8:00 PM</Text>
          <Text style={styles.dateText}>10:00 AM     to     8:00 PM</Text>
          </View>
        </View>
        <View style={styles.facilityContainer}>
          <Text style={[styles.hours, {fontFamily: "Times"}]}>Facilities</Text>
        {recFacilities.map((item) => {
          return(
            <Text style={styles.facility}>{item}</Text>
          )
        })}</View>
        </View>
        </View>
        </ScrollView>
        </View>
        </View>
        
    
  );
}

