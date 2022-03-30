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
          <Text style={styles.facility}>West Gym Court #1</Text>
          <Text style={styles.facility}>West Gym Court #2</Text>
          <Text style={styles.facility}>East Gym Court #3</Text>
          <Text style={styles.facility}>East Gym Court #4</Text>
          <Text style={styles.facility}>East Gym Court #5</Text>
          <Text style={styles.facility}>Indoor Track</Text>
          <Text style={styles.facility}>Multipurpose Room 1</Text>
          <Text style={styles.facility}>Multipurpose Room 2</Text>
          <Text style={styles.facility}>Group Fitness Studio</Text>
          <Text style={styles.facility}>Upper Parker Gym (Dasherboard Court)</Text>
          <Text style={styles.facility}>Parker Sand Volleyball Court</Text>
          <Text style={styles.facility}>Parker Field</Text>
          <Text style={styles.facility}>Sprigg Field (Artificial Turf)</Text>
          <Text style={styles.facility}>Bertling Field (Artificial Turf)</Text>
          <Text style={styles.facility}>Upper Bertling Field (Natural Grass)</Text>
          <Text style={styles.facility}>Low Challenge Course</Text>
          <Text style={styles.facility}>High Challenge Course</Text>
          <Text style={styles.facility}>Indoor Rock Climbing Wall</Text>
        </View>
        </View>
        </View>
        </ScrollView>
        </View>
        </View>
        
    
  );
}

