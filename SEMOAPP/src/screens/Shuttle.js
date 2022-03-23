import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/ShuttleStyle';
import {theme} from '../core/theme';
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Location from 'expo-location';






export default function Shuttle() {


  const mapRef = React.createRef();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    if(location!=null)
    {
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    })
  }
    //console.log("LOCATION: " + JSON.stringify(location.latitude + location.longitude))
  }, [location])

  const [tracker, setTracker] = useState(null)
  const [aID, setAID] = useState(0)
  const [route, setRoute] = useState("")
  const [loaded] = useFonts({
    Times: require('../assets/fonts/times.ttf'),
  });

  var load = false;

  useEffect(() => {
    const interval = setInterval(() => {
      defineTrackers()
    }, 8000);
    return () => clearInterval(interval);
  })


  function defineTrackers() {
    fetch('http://wds.semo.edu/nexus/get_data.php')
    .then((response) => response.json())
    .then((json) => {
      console.log((json)) 
      setTracker(json.map((item) => {
        console.log('lat: ' + parseFloat(item.lng))
        if(item.route.includes(tabs[aID].name))
        {
        return <MapView.Marker key={item.id}
        coordinate={{latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lng)}}
        title={tabs[aID].name + " Shuttle"}
        >
          <FontAwesome name="map-marker" size={34} color={tabs[aID].color} />
        </MapView.Marker>
        }
      }))
      
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

  }

  useEffect(() => {
    setRoute(tabs[aID].route)
    defineTrackers()
  }, [load, aID])

  load = true;
  var tabs = [
              {id: 0, color: theme.colors.red, name: "Red", route: ""}, 
              {id: 1, color: theme.colors.blue, name: "River", route: "Myers, Rear of Kent, Pacific/Grauel, Broadway Catapult, Broadway Mass Media, Independence & Spanish, River Campus, Band Annex, Vandiver/Merick, Bookstore, Dempster, Poly-Tech/LaFerla, MMTF/Rec, International Village, Towers, Grauel, Rear of Academic, Memorial"},
              {id: 2, color: theme.colors.green, name: "Green", route: "Memorial, Parker/Cheney, Scully, Dempster, Poly, Tech/LaFerla, MMTF/Rec, DPS/Greek Village, International Village, Towers, Grauel, Houck, Vandiver/Merick, U.C.Myers, Rear of Kent, Pacific, Grauel, Rear of Academic"}
            ] 
  if(!loaded)
  {
    return <AppLoading/>

  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <View style={styles.headerContainer}>
          <Text style={styles.title}>SHUTTLE TRACKER</Text>
      </View>
      
      <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => setAID(0)} style={aID==0 ? styles.redActive: styles.inactive}><Text style={styles.tabTitle}>RED</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setAID(1)} style={aID==1 ? styles.blueActive : styles.inactive}><Text style={styles.tabTitle}>BLUE</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setAID(2)} style={aID==2 ? styles.greenActive : styles.inactive}><Text style={styles.tabTitle}>GREEN</Text></TouchableOpacity>
        </View>
      <View style={[styles.infoContainer, {borderColor: tabs[aID].color}]}>
        <View style={styles.routeContainer}>
          <Text style={[styles.routeText, { fontFamily: 'Times'}]}>Route: {route}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView style={styles.map}
              showsUserLocation={true}
              ref={mapRef}
              initialRegion={{
                latitude: 37.3153623,
                longitude: -89.5324009,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0221,
              }}

              >
            {tracker}
          </MapView>
        </View>
      </View>
        </View>
      </View>
    
  );
}

