import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Dimensions, ImageBackground, Linking } from 'react-native';
import { styles } from '../styles/SecretStyle';
import { GameEngine} from 'react-native-game-engine';
import entities from '../game/entities';
import Physics from '../game/physics';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { b64 } from './Screen'


export default function Secret({navigation}) {

  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [jonah, setJonah] = useState(0)
  const [seKey, setSEKey] = useState("")
  const [globalHS, setGlobalHS] = useState(null)

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      //console.log(JSON.stringify(jsonValue))
      setHighScore( jsonValue != null ? (JSON.parse(jsonValue)) : 0);
      console.log("Pulled: " + jsonValue)
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  const getCredentials = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("credentials")
      //console.log(JSON.stringify(jsonValue))
      setSEKey( jsonValue != null ? (JSON.parse(jsonValue).username + ":" + (JSON.parse(jsonValue).password)) : 0);
      console.log("Pulled: " + (JSON.parse(jsonValue).username))
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  const getNickname = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("nickname")
      //console.log(JSON.stringify(jsonValue))
      onChangeNickname( jsonValue != null ? (JSON.parse(jsonValue)) : "");
      console.log("Pulled: " + jsonValue)
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  const getGlobalHS = () => {

    fetch("https://outpostorganizer.com/SEMO/game.php", {
      method: 'POST',
      body: JSON.stringify({
        score: parseInt(currentPoints),
        user: nickname=="" ? "test" : nickname,
        name: seKey
      })
    }).then(response => response.json()).then((responseJSON) => {
         console.log("New HS set: ")
        ///(responseJSON)
        setGlobalHS(responseJSON)
      }).catch((e) => {
        console.log(e)
      })
    }

  
  useEffect(() => {
    getData("highscore")
    getCredentials()
    getNickname()
    getGlobalHS()
  }, [])

  const windowHeight = Dimensions.get('window').height
  const windowWidth = Dimensions.get('window').width
  const [nickname, onChangeNickname] = useState("");

  useEffect(() => {
    getGlobalHS()                
  }, [running])


  const storeHighScore = async () => {
    try {
      const jsonValue = JSON.stringify(currentPoints)
      await AsyncStorage.setItem("highscore", jsonValue)
    } catch (e) {
      // saving error
    }
    console.log("Stored New high score")
    
  }

  const storeNickname = async () => {
    try {
      const jsonValue = JSON.stringify(nickname)
      await AsyncStorage.setItem("nickname", jsonValue)
    } catch (e) {
      // saving error
    }
    console.log("Stored nickname")
    
  }

  const saveHighScore = () => {
    setHighScore(currentPoints)
    storeHighScore()
  }

  return (
   
      <View style={{flex: 1}}>
        <View style={{position: "absolute", top: 0, left: 0, right: 0, height: 30, width: "100%", zIndex: 150, }}>
          <TouchableOpacity onPress={() => {
          console.log(jonah)
          setJonah(jonah+1)
        }} style={{width: "100%", height: 30}}>
            
          </TouchableOpacity>
        </View>
        
          <ImageBackground source={require("../assets/game/background.jpg")} resizeMode="cover" style={{width: windowWidth, height: windowHeight}}>
        <Text style={{textAlign: "center", fontSize: 40, margin: 20, fontWeight: 'bold'}}>{currentPoints}</Text>
        <GameEngine
          ref={(ref) => {setGameEngine(ref)}}
          style={{position: 'absolute', bottom: 0, top: 0, left: 0, right: 0}}
          entities={entities()}
          systems={[Physics]}
          running={running}
          onEvent={(e) => {
            switch(e.type) {
              case 'game_over':
                setRunning(false)
                gameEngine.stop()
                if(highScore==null || highScore==0 || currentPoints>highScore)
                {
                  saveHighScore(currentPoints)
                }
                if(currentPoints>100)
                {
                  Linking.openURL("https://www.youtube.com/watch?v=B8zkCR6rh0s")
                  setCurrentPoints(0)
                }
                break;
              case 'new_point':
                setCurrentPoints(currentPoints+1)
                break;
            }
          }}
        >
        </GameEngine>
        {!running ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, backgroundColor: "rgba(235, 235, 235, 0.7)"}}>
                    <Text style={{textAlign: "center", fontSize: 30, margin: 5, fontWeight: 'bold'}}>Flappy Rowdy</Text>
                    {currentPoints!=0 ? <Text style={{textAlign: "center", fontSize: 20, margin: 5, fontWeight: 'bold'}}>Score: {currentPoints}</Text> : null}
                    {highScore!=0 ? <Text style={{textAlign: "center", fontSize: 20, margin: 5, fontWeight: 'bold'}}>Your High Score: {highScore}</Text> : null}
                    <View style={{borderRadius: 3, backgroundColor: "rgba(255, 255, 255, 0.7)", padding: 10, marginBottom: 10}}>{globalHS!=null ? <Text style={{textAlign: "center", fontSize: 16, margin: 0, fontWeight: 'normal'}}>Global High Score: {globalHS.score}</Text> : null}
                    {globalHS!=null ? <Text style={{textAlign: "center", fontSize: 16, marginBottom: 10, fontStyle: 'italic'}}>Held By: <Text style={{fontWeight: "bold"}}>{globalHS.user}</Text></Text> : null}
                    <TextInput
        style={styles.input}
        onChangeText={onChangeNickname}
        value={nickname}
        autoComplete="nickname"
        placeholder="Nickname"
      />
                    </View><TouchableOpacity onPress={() => {
              setCurrentPoints(0)
              storeNickname()
              setRunning(true)
              gameEngine.swap(entities())
            }}style={{backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 4}}>
              <Text style={{fontWeight: 'bold', color: 'white', fontSize: 30}}>START</Text>
            </TouchableOpacity>
          </View> : null}
        <StatusBar style="auto" hidden={true}></StatusBar>
        </ImageBackground>
        <View style={jonah==69 ? {zIndex: 150, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#fff"} : {display: "none"}}>
        <TouchableOpacity onPress={() => {
          setJonah(0) 
        }} style={{height: Dimensions.get("screen").height, width: "100%", backgroundColor: 'rgba(0, 0, 0, 0.1)' }}><Image source={{uri: `data:image/jpeg;base64,${b64}`}} style={{marginTop: 80, alignSelf: "center", width: "100%", height: 800}}></Image></TouchableOpacity>
        </View>
      </View>
    
  );
}

