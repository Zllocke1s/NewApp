import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/MapStyle';
import MapView from 'react-native-maps';
import React from 'react';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import { theme } from '../core/theme';


export default function Maps() {

  const [poi, setPOI] = React.useState(null)
  const [buildings, setBuildings] = React.useState(null)
  const [resHalls, setResHall] = React.useState(null)
  const [showB, toggleB] = React.useState(false)
  const [showR, toggleR] = React.useState(false)
  const [search, setSearch] = React.useState("")

  useEffect(() => {
    fetch("https://api.concept3d.com/categories/8965,7961,7928?map=423&batch&children&key=0001085cc708b9cef47080f064612ca5")
      .then((response) => response.json())
      .then((json) => {
        setPOI(json.slice(1))
        //console.log(json)
      }
        )
      .catch((error) => {
        console.error(error);
      });

      
  }, [])



  useEffect(() => {
    if(poi!=null)
    {
      //console.log((poi[1].name))
      //console.log(JSON.stringify(poi[1].children.locations))
      //console.log(poi[1].children.locations)
      console.log(search)
      setBuildings(poi[0].children.locations.map((item) => {
        if(item.name.includes(search))
        {
        return <MapView.Marker key={item.id}
        coordinate={{latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lng)}}
        title={item.name}
        ><FontAwesome name="map-marker" size={34} color={"#e55"} />
        </MapView.Marker>
        }
      }))
      setResHall(poi[1].children.locations.map((item) => {
        if(item.name.includes(search))
        {
        return <MapView.Marker key={item.id}
        coordinate={{latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lng)}}
        title={item.name}
        ><FontAwesome name="map-marker" size={34} color={"#5a5"} />
        </MapView.Marker>
        }
      }))

    }
  }, [poi, search])

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



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
        <Text style={styles.title}>Maps</Text>
         </View>
      </View>
      
      <View style={styles.mapContainer}>
        <MapView style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: 37.3153623,
            longitude: -89.5324009,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}

        >
          {showB ? buildings : null}
          {showR ? resHalls : null}
        </MapView>
        <View style={styles.legend}>
          <TouchableOpacity onPress={() => {
            toggleR(!showR)
          }} style={styles.legendOption}>
            <Text><FontAwesome name="map-marker" size={21} color={showR ? "#5a5" : "#ddd"} />  Residence Halls</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            toggleB(!showB)
          } }style={styles.legendOption}>
            <Text><FontAwesome name="map-marker" size={21} color={showB ? "#e55" : "#ddd"} />  Academic Buildings</Text>
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.red}
          underlineColorAndroid='transparent'
          selectionColor={theme.colors.red}
          onChangeText={setSearch}
          value={search}
          placeholder="Search for a building" />
          
        </View>
        </View>
    
  );
}

