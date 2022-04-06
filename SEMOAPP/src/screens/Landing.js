import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/LandingStyle';
import { Tile, HeaderTile, NewsTile, SecretTile } from '../components/Tile';
import { SocialMediaButton } from '../components/SocialMediaButton';
import React, { useState, useEffect } from 'react';


export default function Landing({ navigation }) {
  function placeholder() {
            
  }

  const [news, setNews] = React.useState({})

  useEffect(() => {
    fetch('https://semo.edu/_data/recent-news-data.json')
    .then((response) => response.json())
    .then((json) => {
      setNews(json)
    }
      )
    .catch((error) => {
      console.error(error);
    });
  }, [])


  function secret() {
    if(global.secretCounter>=20)
    {
      global.secretCounter=0;
      navigation.navigate("Secret");
    }
    else if(isNaN(global.secretCounter))
    {
      global.secretCounter=1;
    }
    else
    {
      global.secretCounter = global.secretCounter + 1;
      console.log(global.secretCounter);
    }
  }
  function calendar()
  {navigation.navigate("CalendarPage");
  }
  function maps()
  {navigation.navigate("Maps");
  }
  function shuttle()
  {navigation.navigate("Shuttle");
  }function portal()
  {navigation.navigate("Portal");
  }function dining()
  {navigation.navigate("Dining");
  }function labs()
  {navigation.navigate("Labs");
  }function reserve()
  {navigation.navigate("Reserve");
  }function athletics()
  {navigation.navigate("Athletics");
  }function stugov()
  {navigation.navigate("StuGov");
  }



  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter+1) % 10)
    }, 8000);
    return () => clearInterval(interval);
  })

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <HeaderTile name={'Calendar'} onP={calendar} src={require("../assets/tiles/calendar.png")} fullscreen={false} />
          <HeaderTile name={"Maps"} onP={maps} src={require("../assets/tiles/map.png")} fullscreen={false} />
        </View>
      </View>
      <View style={styles.tileContainer}>
      <View style={styles.tileSubContainer}>
            <Tile name={"Shuttle Tracker"} onP={shuttle} src={require("../assets/tiles/shuttle.png")} fullscreen={false} />
          <Tile name={"Student Grades"} onP={portal} src={require("../assets/tiles/monitor.png")} fullscreen={false} />
         </View>
        <View style={styles.tileSubContainer}>
        <Tile name={"Dine on Campus"} onP={dining} src={require("../assets/tiles/plate.png")} fullscreen={false} />
          <Tile name={"Lab Availability"} onP={labs} src={require("../assets/tiles/editcal.png")} fullscreen={false} />
            
          </View>
        <View style={styles.tileSubContainer}>
          <Tile name={"Athletics"} onP={athletics} src={require("../assets/tiles/athletics.png")} fullscreen={false} />
          <Tile name={"Student Government"} onP={stugov} src={require("../assets/tiles/stugov.png")} fullscreen={true} />
         
          </View>
      {/*  <View style={styles.tileSubContainer}>
          <Tile name={""} onP={placeholder} src={false} fullscreen={false} />
          <Tile name={""} onP={secret} src={false} fullscreen={false} />
          <Tile name={""} onP={placeholder} src={false} fullscreen={false} />
  </View>*/}
        </View>
        <View style={styles.newsTileContainer}>
          <NewsTile name={"Latest News:"} item={news[counter]} />
        </View>
        <SecretTile name={"Secret"} onP={secret} />

        <View style={styles.socialMediaContainer}>
        <SocialMediaButton type="Instagram" link="https://www.instagram.com/semissouristate/?hl=en"></SocialMediaButton>
        <SocialMediaButton type="Facebook" link="https://www.facebook.com/SEMissouriState/"></SocialMediaButton>
        <SocialMediaButton type="Twitter" link="https://twitter.com/SEMissouriState"></SocialMediaButton>
        <SocialMediaButton type="Youtube" link="https://www.youtube.com/user/semissouristate"></SocialMediaButton>
        </View>
        
    </View>
    
    
  );
}

