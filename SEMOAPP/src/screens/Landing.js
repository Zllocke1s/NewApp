import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Dimensions, TextInput, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/LandingStyle';
import { Tile, HeaderTile, NewsTile, SecretTile } from '../components/Tile';
import { SocialMediaButton } from '../components/SocialMediaButton';
import { HoverButton } from '../components/HoverButton';
import React, { useState, useEffect } from 'react';
import Logo from "../assets/splashfileV.svg";
import { Entypo } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../core/theme';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Landing({ navigation }) {
  function placeholder() {
            
  }

  const [news, setNews] = React.useState({})
  const [credentials, setCredentials] = React.useState(null);
  const [showLogin, promptLogin] = React.useState(false);
  const [invalid, setInvalid] = React.useState(false);
  const [username, onChangeUser] = React.useState("");
  const [password, onChangePass] = React.useState("");
  const [isSecure, toggleSecure] = React.useState(true);
  const [save, toggleSave] = React.useState(true);

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setCredentials( jsonValue != null ? (JSON.parse(jsonValue)) : null);
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  
  /* item = {
                title: "",
                image: "",
                intro: "",
                link: "http://semo.edu/news"
            }*/

  useEffect(() => {
    fetch('https://semo.edu/_data/recent-news-data.json')
    .then((response) => response.json())
    .then((json) => {
      setNews(json.slice(0, 10))
    }
      )
    .catch((error) => {
      console.error(error);
    });

    getData("credentials")
  }, [])

  //
 /* useEffect(() => {
    fetch('https://content.guardianapis.com/search?api-key=1d18721a-fb93-4b9a-8c0f-e79873ba3d8c')
    .then((response) => response.json())
    .then((json) => {
      var newNews = []
      json.response.results.map((item) => {
        console.log(item)
        newNews.push({title: item.webTitle,
        image: "",
        intro: "",
        link: item.webUrl})
      })
      //setNews(newNews)
    }
      )
    .catch((error) => {
      console.error(error);
    });
  }, [])*/
    


  function secret() {
    if(global.secretCounter>=4)
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
  }async function portal()
  {
    navigation.navigate("Portal");
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
  }function settings()
  {navigation.navigate("Settings");
  }function alert()
  {
    navigation.navigate("Alerts");
  }
  function schedule()
  {
    navigation.navigate("Schedule");
  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
    console.log("Stored")
    getData("credentials")
  }



  function login() {
    fetch('http://mportal.semo.edu:8080/banner-mobileserver/api/2.0/security/getUserInfo',
    {
      headers: {
        Authorization: 'Basic '+base64.encode(username + ":" + password), 
    }, 
    })
    .then((response) => {
      console.log(JSON.stringify(response))
      if(!response.ok)
      {
       // throw new Error("invalid_credentials")
        setInvalid(true)
        return;
      }
      response.json().then((json) => {
      console.log(json)
      setInvalid(false)
      promptLogin(false)
      if(save)
      {
        storeData("credentials", {username: username, password: password, so: json.userId})
      }
      
    }
      )})
    .catch((error) => {
      console.log((error));
    });
    //
  }
  
  



  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter+1) % news.length)
    }, 8000);
    return () => clearInterval(interval);
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPressIn={() => {
        promptLogin(!showLogin)
      }} style={showLogin ? styles.loginPrompt : {display: 'none'}}>
        <TouchableOpacity activeOpacity={1} style={styles.loginBox}>
      <Text style={styles.message}>You are not currently logged in</Text>
      <Text style={invalid ? styles.error : styles.hidden}>Error: Invalid Login.  Please try again.</Text>
<TextInput
        style={styles.input}
        onChangeText={onChangeUser}
        value={username}
        autoComplete="username"
        placeholder="Username"
      />
      <View style={styles.rows}>
      <TextInput
        style={styles.input}
        error={true}
        errorText={{color: "red"}}
        onChangeText={onChangePass}
        value={password}
        autoComplete="password"
        placeholder="Password"
        secureTextEntry={isSecure}
      />
      <TouchableOpacity style={styles.visible} onPress={() => {
        toggleSecure(!isSecure)
      }}><Entypo name={isSecure ? "eye-with-line" : "eye"} size={24} color={theme.colors.red} /></TouchableOpacity>
      
      </View>
 {/*       <TouchableOpacity style={styles.rememberMeRow} onPress={() => {
        toggleSave(!save)
      }}><AntDesign name={!save ? "checksquareo" : "checksquare"} size={20} color={theme.colors.red} />
      <Text>Remember me</Text>
    </TouchableOpacity> */}
              <TouchableOpacity style={styles.button} onPress={() => {
          login()
        }}><Text style={styles.logout}>Log In</Text></TouchableOpacity>  
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
          {/*<Image resizeMode='contain' source={require("../assets/splashfile2.png")} style={{width: "100%"}}></Image>
     */}
     <Logo width={Dimensions.get('window').width *0.9}></Logo>
      </View>

      <HoverButton pass={alert}/>
      <View style={styles.tileContainer}>  
      <View style={styles.tileSubContainer}>
      <Tile name={'Calendar'} onP={calendar} src={require("../assets/tiles/calendar.png")} fullscreen={false} />
      <Tile name={"Maps"} onP={maps} src={require("../assets/tiles/map.png")} fullscreen={false} />
      <Tile name={"Shuttle Tracker"} onP={shuttle} src={require("../assets/tiles/shuttle.png")} fullscreen={false} />
         </View>
        <View style={styles.tileSubContainer}>
        <Tile name={"Dine on Campus"} onP={dining} src={require("../assets/tiles/plate.png")} fullscreen={false} />
        <Tile name={"Recreation Services"} onP={athletics} src={require("../assets/tiles/athletics.png")} fullscreen={false} />
        <Tile name={"Lab Availability"} onP={labs} src={require("../assets/tiles/editcal.png")} fullscreen={false} />
            
          </View>
          <View style={styles.tileSubContainer}>
          <Tile name={"Directory"} onP={() => {
            Linking.openURL("https://semo.edu/people-directory/")
          }} src={require("../assets/tiles/directory.png")} fullscreen={false} />
          <Tile name={"Reserve A Space"} onP={reserve} src={require("../assets/tiles/editcal.png")} fullscreen={false} />
          <Tile name={"Student Government"} onP={stugov} src={require("../assets/tiles/stugov.png")} fullscreen={true} />    
            </View>  
        <View style={styles.tileSubContainer}>
        <Tile name={"Settings"} onP={settings} src={require("../assets/tiles/settings.png")} fullscreen={false} />
        <Tile name={"Classes"} onPD={() => {promptLogin(true)}} disabled={credentials==null} onP={schedule} src={require("../assets/tiles/calendar.png")} fullscreen={false} /> 
        <Tile name={"Student Grades"} onPD={() => {promptLogin(true)}} disabled={credentials==null} onP={portal} src={require("../assets/tiles/monitor.png")} fullscreen={false} />
          </View>
      {/*  <View style={styles.tileSubContainer}>
          <Tile name={""} onP={placeholder} src={false} fullscreen={false} />
          <Tile name={""} onP={secret} src={false} fullscreen={false} />
          <Tile name={""} onP={placeholder} src={false} fullscreen={false} />
  </View>*/}
        <View style={styles.newsTileContainer}>
          <NewsTile name={"Latest News:"} item={news[counter]} />
        </View>
        
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

