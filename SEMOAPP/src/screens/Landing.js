import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, Image, View, Picker } from 'react-native';
import { styles } from '../styles/LandingStyle';
import { Tile, HeaderTile, NewsTile } from '../components/Tile';
import { SocialMediaButton } from '../components/SocialMediaButton';
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import BackgroundTask from "../components/BackgroundTask";



export default function Landing({ navigation }) {



  var convert = {
    "red": 1,
    "blue": 2,
    "green": 3,
    "wings": 4,
    "default": 5,
  }
  const[tracker, setTracker] = React.useState(false)
  const [route, setRoute] = React.useState("green");
  var invalid = ["wings"] 
  function isColor(strColor){
    return !invalid.includes(strColor);
  }
 
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);



  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const { status2 } = await Location.requestBackgroundPermissionsAsync();
    if (status2 === "granted" && status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  useEffect(() => {
    requestPermissions()
  }, [])
  var codes = Object.keys(convert);
  var loc = codes.includes(route) ? convert[route] : convert["default"]

  useEffect(() => {
    
      const interval = setInterval(() => {
            }, 3800);
      return () => clearInterval(interval);
     
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Tracker</Text>
        </View>
      </View>
      <View style={styles.tileContainer}>
      <View style={styles.tileSubContainer}>
            <Tile name={"Turn On"} onP={() => setTracker(true)} src={require("../assets/tiles/shuttle.png")} on={true} />
          <Tile name={"Turn Off"} onP={() => setTracker(false)} src={require("../assets/tiles/shuttle.png")} on={false} />
      </View>
      <Picker
        Route={route}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setRoute(itemValue)}
      >
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Blue/River" value="blue" />
        <Picker.Item label="Wings" value="wings" />
        <Picker.Item label="Gold" value="gold" />
        <Picker.Item label="Silver" value="silver" />
        <Picker.Item label="Purple" value="purple" />
      </Picker>
      <Text style={styles.status}>Tracking: {tracker ? <Text style={[styles.status, {color: "#0a0"}]}>on</Text> : <Text style={[styles.status, {color: "#e00"}]}>off</Text>}{"\n"}Route: <Text style={{color: isColor(route) ? route : "#000", fontWeight: "bold"}}>{route} route.</Text></Text>
        </View>
        <View style={tracker ? styles.tileContainer : {display: 'none'}}>
        <Text style={styles.status}>Altitude: {(location != null ? Math.round(location.coords.altitude*10)/10 : null)}</Text>
        <Text style={styles.status}>Heading: {(location != null ? Math.round(location.coords.heading*10)/10 : null)}</Text>
        <Text style={styles.status}>Latitude: {(location != null ? (location.coords.latitude) : null)}</Text>
        <Text style={styles.status}>Longitude: {(location != null ? (location.coords.longitude) : null)}</Text>
        <Text style={styles.status}>Speed: {(location != null ? Math.round(location.coords.speed*10000)/10000 : null)}</Text>
        </View>
        <BackgroundTask
        interval={3800}
        function={() => {
          if(tracker){
            fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + loc + '?camp=wartburg', {
              method: 'PUT',
              body: JSON.stringify({
                profilePicURL: location.coords.latitude + ":" + location.coords.longitude + ":" + route
                
            })
            })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log("ProfileUpdate Response: " + JSON.stringify(responseJson));     
            })
            
            .catch((error) => {
               console.error(error);
               console.log("ERROR");
            });
            }  
          
        }}
      />
     </View>
    
  );
}

