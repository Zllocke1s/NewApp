import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, Image, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/ShuttleStyle';
import {theme} from '../core/theme';
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Location from 'expo-location';



//To-do: Find a way to make a route on the map


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


  const snap = () => {
    //console.log(tracker[0].props.coordinate.latitude)
    animateMap(tracker[0].props.coordinate.longitude, tracker[0].props.coordinate.latitude)
  }

  useEffect(() => {
    if(location!=null)
    {
    mapRef.current.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
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

  const animateMap = (lat, lng) => {
    mapRef.current.animateToRegion({ // Takes a region object as parameter
        longitude: lat,
        latitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    },1000);
}

  function defineTrackers() {
    fetch('http://wds.semo.edu/nexus/get_data.php')
    .then((response) => response.json())
    .then((json) => {
    //  console.log((json)) 
      setTracker(json.map((item) => {
     //   console.log('lat: ' + parseFloat(item.lng))
        if(item.route.includes(tabs[aID].name))
        {
         if(mapRef.current!=null)
         {
          animateMap(item.lat, item.lng)
         }
         else{
           console.log(item.lat, item.lng)
         }
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
              {id: 0, color: theme.colors.red, name: "Red", route: "\u2022\tTowers\n\u2022\tDPS/Greek Village\n\u2022\tMMTF/Rec\n\u2022\tDempster\n\u2022\tScully\n\u2022\tParker/Cheney\n\u2022\tMemorial\n\u2022\tRear Academic\n\u2022\tGrauel\n\u2022\tUniversity Center\n\u2022\tMyers\n\u2022\tRear Kent\n\u2022\tPacific\n\u2022\tGrauel\n\u2022\tTowers"}, 
              {id: 1, color: theme.colors.blue, name: "River", route: "\u2022\tMyers\n\u2022\tRear of Kent\n\u2022\tPacific/Grauel\n\u2022\tBroadway Catapult\n\u2022\tBroadway Mass Media\n\u2022\tIndependence & Spanish\n\u2022\tRiver Campus\n\u2022\tBand Annex\n\u2022\tVandiver/Merick\n\u2022\tBookstore\n\u2022\tDempster\n\u2022\tPoly-Tech/LaFerla\n\u2022\tMMTF/Rec\n\u2022\tInternational Village\n\u2022\tTowers\n\u2022\tGrauel\n\u2022\tRear of Academic\n\u2022\tMemorial"},
              {id: 2, color: theme.colors.green, name: "Green", route: "\u2022\tMemorial\n\u2022\tParker/Cheney\n\u2022\tScully\n\u2022\tDempster\n\u2022\tPolyTech/LaFerla\n\u2022\tMMTF/Rec\n\u2022\tDPS/Greek Village\n\u2022\tInternational Village\n\u2022\tTowers\n\u2022\tGrauel\n\u2022\tHouck\n\u2022\tVandiver/Merick\n\u2022\tU.C.Myers\n\u2022\tRear of Kent\n\u2022\tPacific\n\u2022\tGrauel\n\u2022\tRear of Academic"}
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
        <Text style={[styles.routeTitle, {fontFamily: "Times"}]}>Route:</Text>
        <ScrollView>
          <Text style={[styles.routeText, { fontFamily: 'Times'}]}>{route}</Text>
        </ScrollView>
        </View>
        <View style={styles.mapContainer}>
          <Text style={tracker==null || tracker[0]==undefined ? styles.error : styles.hidden}>
            Uh Oh!  We can't seem to locate the shuttle.{"\n"}Please try again later.
          </Text>
          <View style={tracker==null || tracker[0]==undefined ? styles.hidden : styles.snap}>
          <Button color={theme.colors.red} title="Snap To Shuttle" onPress={snap}></Button>
          </View>
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

