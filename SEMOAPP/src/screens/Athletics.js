import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/AthleticsStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import {Game}  from '../components/Game';
import {SportsTile} from '../components/Tile';

export default function Athletics() {


  var dummyGames = [
    {
      id: 1,
      sport: "Softball", 
      home: "Gamma Phi/Sigma Chi", 
      away: "Alpha Chi/Lambda Chi", 
      location: "Intramural Fields / Bertling", 
      date: "March 21", 
      time: "5:00 PM"
    },
    {
      id: 2,
      sport: "Flag Football", 
      home: "Alpha Xi", 
      away: "Alpha Delta Pi", 
      location: "Intramural Fields / Sprigg", 
      date: "March 22", 
      time: "6:00 PM"
    },
    
  ]




  useEffect(() => {
    setGames(
      dummyGames.map((game) => { 
        return(
        <Game 
          key={game.id} 
          sport={game.sport}
          home={game.home}
          away={game.away}
          location={game.location}
          date={game.date}
          time={game.time}
        />)
      })
    )
  }, [])

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
      <View style={styles.headerContainer}>
          <Image style={styles.logo}
                   source={require("../assets/rec.png")}
           ></Image>
      </View>
      <View style={styles.content}>
        <View style={styles.row1}>
          <Text style={[styles.quote, { fontFamily: 'Times'}]}>"The secret of getting ahead is getting started" -Mark Twain</Text>
        <TouchableOpacity style={styles.hoursButton}>
        <Ionicons name="hourglass-outline" size={44} color="black" />
          <Text>Hours</Text>
        </TouchableOpacity>
        </View>
      <View style={styles.upcomingContainer}>
        <Text style={[styles.title, {fontFamily: 'Times'}]}>Upcoming Games:</Text>
        <View style={styles.gameContainer}>
          {games}
        <TouchableOpacity onPress={() => {
        console.log("Launch Full Schedule")
      }} style={styles.fullSchedule}>
          <Text style={[styles.fullScheduleText, {fontFamily: 'Times'}]}>View Full Schedule</Text>
        </TouchableOpacity>
        </View>
      </View>
        </View>
      <View style={styles.tileContainer}>
      <SportsTile name={"Facilities"} onP={() => {
        console.log("Launch Facilities")
      }} src={require("../assets/tiles/facilities.png")}  />
      <SportsTile name={"Fitness Classes"} onP={() => {
        console.log("Launch Fitness Classes")
      }} src={require("../assets/tiles/classes.png")}  />
      <SportsTile name={"Contact Information"} onP={() => {
        console.log("Launch Contact Info")
      }} src={require("../assets/tiles/contact.png")}  />
      
      </View>
        </View>
        </View>
        
    
  );
}

