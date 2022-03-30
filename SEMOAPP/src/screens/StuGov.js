import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/StuGovStyle';
import { MinuteItem } from '../components/MinuteItem';
import React, { useEffect } from 'react';
import { theme } from '../core/theme';
export default function StuGov() {

  const [minutes, setMinutes] = React.useState(null)
  const [agenda, setAgenda] = React.useState(null)
  const [formattedItems, setFormattedItems] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);


  React.useEffect(() => {
    fetch("https://selink.semo.edu/legacy/webapi/drive/folder/1973483/contents?page=1&pageSize=30", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "groupkey": "studentgov",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-xsrf-token": "f5qfqgfA2rEftQqnGQcJYTYrpKrgdm5oXnxDlaI7TD4K4_JIeHfWQrFoSXJnCCnrb-AuFOoZMwnk2jVfQOkkzM7IWp27ERggL1JOJytjqC01:A1V9FmYEp1lpBhuVqj_IsSNlzihVSNeKBuG8aK-Fb24ENh5OREiMkt0iC8PrXh-l-rZwIEPlGOSdzE5C7Kyu6Ecy_HUnqA6b0f8d3OG8xyI1"
      },
      "referrer": "https://selink.semo.edu/organization/studentgov/documents",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then((response) => response.json())
    .then((json) => {
      console.log("Still Loading")
      setMinutes((json))
    }).catch((error) => {
      console.log(error)
    })
    
    fetch("https://selink.semo.edu/legacy/webapi/drive/folder/1969729/contents?page=1&pageSize=30", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "groupkey": "studentgov",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-xsrf-token": "iLMWswYnBAZy_PjiWfmgFJqBHmySqJ-Sq0oMvgz_vllEPkP0jYov3YOxlOTs8AOe6gNXqSVEAuQ_AfwbO2XcO6cjIM8MdsLOHuoJ6SHbbOM1:iFBuM3am8qgVx7HxrWYqJ2NgLrXzDnA9TA-FmNtlvRcUbtIkYRZ4lmNULJii421dn8iS4rt1cQ4rMfuqAoT45RzVBbhQTTIC-zjaG-cTUkM1"
      },
      "referrer": "https://selink.semo.edu/organization/studentgov/documents",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then((response) => response.json())
    .then((json) => {
      setAgenda((json))
    })
    
  }, [])
  
React.useEffect(() => {
  if(minutes!=null && agenda!=null)
  {
  setFormattedItems(
    minutes.map((minute) => {
      return(
        <MinuteItem minutes={minute}/>
      )
    })
  )
  setIsLoaded(true)
  }
}, [minutes, agenda])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Student Government</Text>
         </View>
      </View>
      
      <View style={styles.galleryContainer}>
        <Image source={require("../assets/stugov.png")} style={styles.galleryImg}></Image>
        </View>
      <View style={styles.minutesContainer}>
        <ScrollView>
        {isLoaded ? formattedItems : <ActivityIndicator style={styles.loadingBar} size="large" color={theme.colors.red} />}
        <MinuteItem minutes={{Title: "4_4_2022\t\t\t\t\t\t\t\tMinutes\t\t\t\t\t\t\t\t\tAgenda"}}/>
        </ScrollView>
      </View>
        </View>
    
  );
}

