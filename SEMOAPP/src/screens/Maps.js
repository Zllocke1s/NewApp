import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/MapStyle';
import MapView from 'react-native-maps';
import React from 'react';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
import { Button, TextInput } from 'react-native-paper';
import { theme } from '../core/theme';
import { BackButton } from '../components/BackButton';
import { Heading } from '../components/Heading';


export default function Maps({navigation}) {

  var colors = [
    "#0A9258",
    "#125589",
    "#F00",
    "#D4470F",
    "#A0A",
    "#D5A30F",
    "#1BAE0C",
    "#AB0C66",
    "#444",
    "#696969"
  ]
  const [poi, setPOI] = React.useState(null)
  const [expanded, expand] = React.useState(false)
  const [buildings, setBuildings] = React.useState([])
  const [showMarkers, toggleMarker] = React.useState([])
  const [search, setSearch] = React.useState("")


  useEffect(() => {
    console.log(showMarkers);
  }, [showMarkers])

  useEffect(() => {
    fetch("https://api.concept3d.com/categories/7961,7928,7942,8810,3164,3165,3160,7956,7945,3163?map=423&batch&children&key=0001085cc708b9cef47080f064612ca5")
      .then((response) => response.json())
      .then((json) => {
       // console.log(json)
        setPOI(json)

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

      setBuildings(poi.map((location, index) => {
        return({
          group: location.name,
          elements: location.children.locations.map((item) => {
        if(item.name.includes(search))
        {
        return (<MapView.Marker key={item.name}
        coordinate={{latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lng)}}
        title={item.name}
        ><FontAwesome name="map-marker" size={34} color={colors[index]} />
        </MapView.Marker>)
        }
      })})
    }
      )
      )
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
      <Heading navigation={navigation} title={"Maps"} />
      
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
          {buildings.map((item) => {
            if(showMarkers.includes(item.group))
            {
              return item.elements
            }
          })}
        </MapView>
        <View style={styles.legend}>
          <View style={expanded ? styles.legendOption : styles.hidden}>
         {poi!=null ? poi.map((item, index) => {
           return( <TouchableOpacity key={item.name} onPress={() => {
             //console.log(item.name)
              if(showMarkers.includes(item.name))
              {
                toggleMarker(showMarkers.filter((i) => i != item.name))
              }
              else
              {
                toggleMarker([... showMarkers, item.name])
              }

          }} style={styles.legendOption}>
            <Text><FontAwesome name="map-marker" size={21} color={showMarkers.includes(item.name) ? colors[index] : "#bbb"} /> {item.name}</Text>
          </TouchableOpacity>
           )
          }) : null
          }
          </View>
          <Button style={{borderWidth: 1, borderColor: theme.colors.gray3}} onPress={() => {
            expand(!expanded)
          }}>{expanded ? "^" : "v"}</Button>
          
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

