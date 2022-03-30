import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { DiningChoiceTile } from '../components/Tile';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';

export default function Dining({navigation}) {

  var dining = {
    name: "Houcks Place",
    location: "1 University Plaza\nCape Girardeau, MO 63701",
    hours: "Open; Closes at 6"
  }

  const [hours, setHours] = React.useState(null)

  const [formattedTiles, setFormattedTiles] = React.useState(null)

  const [isLoaded, setLoaded] = React.useState(false)

    useEffect(() => {
      fetch('https://api.dineoncampus.com/v1/locations/status?site_id=5751fd3290975b60e0489360&platform=0')
      .then((response) => response.json())
      .then((json) => {
        setHours(json)
        console.log(json);
      }
        )
      .catch((error) => {
        console.error(error);
      });
      
  
    }, [])
  

  function navigateTo(id, name, status) {
    navigation.navigate("SubDining", {id: id, name: name, status: status})
  }

  useEffect(() => {
    if(hours!=null)
    {
    setFormattedTiles(hours.locations.map((item) => {
      console.log(item)
      return(
        <DiningChoiceTile onP={navigateTo} key={item.id} id={item.id} name={item.name} location={item.metadata} status={item.status} />
      )
    }))
  }
  }, [hours])
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.choiceTitle, {color:'white'}]}>Choose a Location...</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
        <ScrollView style={styles.diningTileSub}>
          {formattedTiles}
        </ScrollView>
      </View>
    </View>
    
  );
}
