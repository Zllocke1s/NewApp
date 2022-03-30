import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { DiningChoiceTile } from '../components/Tile';
import React, { useEffect } from 'react';
import { theme } from '../core/theme';
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
      }
        )
      .catch((error) => {
        console.error(error);
      });
      
  
    }, [])
  
    React.useEffect(() => {
      const interval = setInterval(() => {
        console.log("Refreshing Hours")
        fetch('https://api.dineoncampus.com/v1/locations/status?site_id=5751fd3290975b60e0489360&platform=0')
      .then((response) => response.json())
      .then((json) => {
        setHours(json)
      }
        )
      .catch((error) => {
        console.error(error);
      });
      
  
      }, 30000);
      return () => clearInterval(interval);
    })

  function navigateTo(id, name, status) {
    navigation.navigate("SubDining", {id: id, name: name, status: status})
  }

  useEffect(() => {
    if(hours!=null)
    {
    setFormattedTiles(hours.locations.map((item) => {
      return(
        <DiningChoiceTile onP={navigateTo} key={item.id} id={item.id} name={item.name} location={item.metadata} status={item.status} />
      )
      
    }))
    setLoaded(true)
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
        <ScrollView persistentScrollbar={true} style={styles.diningTileSub}>
          {isLoaded ? formattedTiles : <ActivityIndicator style={styles.loadingBar} size="large" color={theme.colors.red} />}
        </ScrollView>
      </View>
    </View>
    
  );
}
