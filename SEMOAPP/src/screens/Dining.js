import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { DiningChoiceTile } from '../components/Tile';
import React, { useEffect } from 'react';
import { theme } from '../core/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BackButton} from '../components/BackButton'
import { Heading } from '../components/Heading';
import { Button } from 'react-native-paper';

export default function Dining({navigation}) {

  var dining = {
    name: "Houcks Place",
    location: "1 University Plaza\nCape Girardeau, MO 63701",
    hours: "Open; Closes at 6"
  }

  const [hours, setHours] = React.useState(null)
  const [so, setSO] = React.useState(null)
  const [board, setBoard] = React.useState(null)
  const [flex, setFlex] = React.useState(null)
  const [redbucks, setRedBucks] = React.useState(null)
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


    
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setSO( jsonValue != null ? (JSON.parse(jsonValue).so) : null);
      } catch(e) {
      console.log("error")
      // error reading value
    }
  }

  useEffect(() => {
    getData("credentials")
  }, [])

useEffect(() => {
if(so!=null)
{
  fetch("http://app.semo.edu/genl/cbalance/index.asp", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "varid=" + so,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then((resp)=>{ return resp.text() }).then((text)=>{
  var array = (text.split("<div class=\"col-5-8\">")).filter((item) => !item.includes("Premium Board"))
  setBoard(array[array.findIndex((item) => item.includes("Board</div>"))+1].split("</div>")[0])
  setFlex(array[array.findIndex((item) => item.includes("Flex With Plan</div>"))+1].split("</div>")[0])
  setRedBucks(array[array.findIndex((item) => item.includes("Redbucks</div>"))+1].split("</div>")[0])
  //console.log(array[array.indexOf(array.find((item) => item.includes("Board</div>")))+1])
  //console.log(array)
})
}

}, [so])
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
      <Heading navigation={navigation} title={"Locations"}>
      </Heading>
      
      <View style={styles.tileContainer}>
        <ScrollView persistentScrollbar={true} style={styles.diningTileSub}>
          {isLoaded ? formattedTiles : <ActivityIndicator style={styles.loadingBar} size="large" color={theme.colors.red} />}
        </ScrollView>
      </View>
      <View style={!((board==null || board.length>4) && (flex==null || flex.length > 10) && (redbucks == "$0.00" || redbucks==null || redbucks.length > 10)) ? {borderTopLeftRadius: 10, padding: 10, position: "absolute", bottom: 0, right: 0, backgroundColor: theme.colors.red} : {display: "none"}}>
        {(board==null || board.length>4) ? null :     <Text style={[styles.mealsRemaining, {color:'white'}]}>{board != null ? "Meals Remaining: " + board : ""}</Text>}
     {(flex==null || flex.length > 10) ? null :      <Text style={[styles.mealsRemaining, {color:'white'}]}>{flex != null ? "Flex: " + flex : ""}</Text>}
     {(redbucks == "$0.00" || redbucks==null || redbucks.length > 10) ? null : <Text style={[styles.mealsRemaining, {color:'white'}]}>{redbucks != "$0.00" && redbucks!=null ? "RedBucks: " + redbucks : ""}</Text>}
        </View>
 
    </View>
    
  );
}
