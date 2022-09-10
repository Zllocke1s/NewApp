import { StatusBar } from 'expo-status-bar';
import { ScrollView, AppState, StyleSheet, TouchableOpacity, Text, Image, View, Picker } from 'react-native';
import { styles } from '../styles/LandingStyle';
import { Tile, HeaderTile, NewsTile } from '../components/Tile';
import { SocialMediaButton } from '../components/SocialMediaButton';
import React, {useEffect, useState} from 'react';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import BackgroundTask from "../components/BackgroundTask";
import { Button, TextInput } from 'react-native-paper';
import { getDistance } from 'geolib';



var wings = false;


export default function Landing({ navigation }) {



  var convert = {
    "red": 1,
    "blue": 2,
    "green": 3,
    "default": 4,
  }
  const[tracker, setTracker] = React.useState(false)
  const [route, setRoute] = React.useState(wings ? "wings" : "green");
  const [stops, setStops] = React.useState([])
  const [req, setReq] = React.useState(false)
  const [heading, setHeading] = React.useState(0)
  const [prevRoute, setPrevRoute] = React.useState("");
  const [hide, setHide] = React.useState(false)
  const [debug, setDebug] = React.useState(0)
  const [prevTime, setPrevTime] = React.useState(Date.now())
  const [distances, setActiveDistances] = React.useState([])
  var invalid = ["wings"] 
  function isColor(strColor){
    return !invalid.includes(strColor);
  }
 
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);


  useEffect(()=>{
    if(route!=null)
    {
      fetch('http://bustracker.semo.edu/sDown.php', {
              method: 'GET',
                 })
           .then((response) => response.json())
           .then((responseJson) => {
              var currentRoute = (responseJson.records.filter((item) => item.RID==convert[route]));
              setStops(currentRoute.map((item) => {
                return {...item, Heading: item.SID-currentRoute[0].SID}
              }))
              
            })
            
            .catch((error) => {
               console.error(error);
               console.log("ERROR");
            });
            
          
    }
  }, [route])

  useEffect(() => {
    console.log(stops)
  }, [stops])
  //

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const { status2 } = await Location.requestBackgroundPermissionsAsync();
    if (status2 === "granted" && status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  };

  useEffect(() => {
    if(req)
    {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    setReq(false)
  }
  }, [req]);


  useEffect(() => {
    requestPermissions()
  }, [])
  var codes = Object.keys(convert);
  var loc = codes.includes(route) ? convert[route] : convert["default"]

  useEffect(() => {
    if(route!=null && prevRoute!="" && tracker && location!=null)
    {
      var loc = codes.includes(prevRoute) ? convert[prevRoute] : convert["default"]
      console.log("Shutdown: " + prevRoute + " ")
      fetch('http://bustracker.semo.edu/tUp.php', {
              method: 'PUT',
              body: JSON.stringify({
                Loc: loc,
                Lat: 0,
                Lon: 0,
                LastUpdated: new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString(),
                hash: (1+heading)*((location.coords.latitude + location.coords.longitude)/7)
                
            })
            })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log("ProfileUpdate Response: " + JSON.stringify(responseJson));
              console.log(location.coords.latitude + ":" + location.coords.longitude)     
              setReq(false)
            })
            
            .catch((error) => {
               console.error(error);
               console.log("ERROR");
            });
            }  
          

    setPrevRoute(route)
  }, [route])
  
  useEffect(() => {
    if(route!=null && !tracker)
    {
      console.log("Shutdown: " + route)
      setPrevRoute("")
    }
    else if(route==null && tracker)
    {
      setTracker(false)
    }
  }, [tracker])

  const label = {fontWeight: "bold"}
  const normal = {fontWeight: 'normal'}

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Tracker</Text>
        </View>
      </View>
      <TouchableOpacity onPressIn={() => setHide(false)} style={hide ? {position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#000", zIndex: 150} : {display: "none"}}></TouchableOpacity>
      <View style={styles.tileContainer}>
      <View style={styles.tileSubContainer}>
            <Tile name={"Turn On"} onP={() => setTracker(true)} src={require("../assets/tiles/shuttle.png")} on={true} />
          <Tile name={"Turn Off"} onP={() => setTracker(false)} src={require("../assets/tiles/shuttle.png")} on={false} />
      </View>
      <Picker
        Route={route}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setRoute(itemValue)}
      >
{!wings ? <Picker.Item label="Green" value="green" />: null}
{!wings ? <Picker.Item label="Red" value="red" /> : null}
{!wings ? <Picker.Item label="Blue/River" value="blue" /> : null}
{wings ? <Picker.Item label="Wings" value="wings" /> : null}
{!wings ? <Picker.Item label="Gold" value="gold" />: null}
{!wings ? <Picker.Item label="Silver" value="silver" />: null}
{!wings ? <Picker.Item label="Purple" value="purple" />: null}
       </Picker>
      <Text style={styles.status}>Tracking: {tracker ? <Text style={[styles.status, {color: "#0a0"}]}>on</Text> : <Text style={[styles.status, {color: "#e00"}]}>off</Text>}{"\n"}Route: <Text style={{color: isColor(route) ? route : "#000", fontWeight: "bold"}}>{route} route.</Text></Text>
        </View>
        <View style={tracker ? styles.tileContainer : {display: 'none'}}>
        <Text numberOfLines={1} style={styles.status}>Headed To: {(heading!=null && stops!=null && stops.find((item) => item.Heading==heading)!=undefined ? stops.find((item) => item.Heading==heading).Name + " (" + stops.find((item) => item.Heading==heading).Heading + ")": null)}</Text>
        <Text style={styles.status}>Altitude: {(location != null ? Math.round(location.coords.altitude*10)/10 : null)}</Text>
        <Text style={styles.status}>Heading: {(location != null ? Math.round(location.coords.heading*10)/10 : null)}</Text>
        <Text style={styles.status}>Latitude: {(location != null ? (location.coords.latitude) : null)}</Text>
        <Text style={styles.status}>Longitude: {(location != null ? (location.coords.longitude) : null)}</Text>
        <Text style={styles.status}>Speed: {(location != null ? Math.round(location.coords.speed*10000)/10000 : null)}</Text>
        </View>
        <Button style={{borderRadius: 1, width: "50%", backgroundColor: "#fff"} 
      } onLongPress={() => {
        setDebug((debug+1)%3)
      }} onPress={() => setHide(true)}>Blackout</Button>
      <View style={debug==1 ? {width: "80%"} : {display: "none"}}>
      <Text style={label}>Debug</Text>
      <Text style={label}>Location: <Text style={normal}>{JSON.stringify(location)}</Text></Text>
      <Text style={label}>Heading: <Text style={normal}>{JSON.stringify(heading)}</Text></Text>
      <Text style={label}>Error Message: <Text style={normal}>{JSON.stringify(errorMsg)}</Text></Text>
      <Text style={label}>Tracker: <Text style={normal}>{JSON.stringify(tracker)}</Text></Text>
      </View>
      <ScrollView style={debug==2 ? {width: "80%"} : {display: "none"}}>
        {distances!=[] ? distances.map((item, index) => {
          return(
            <Text key={index} style={label}>{item.name}: <Text style={item.distance<70 ? [{backgroundColor: "#0f0"}, label] : normal}>{item.distance} meters</Text></Text>
          )
        }) : null}
      <Text style={label}><Text style={normal}></Text></Text>
        </ScrollView>
        <BackgroundTask
        interval={3800}
        function={() => {
          if(tracker)
          {
            setReq(true)
          }
          if(tracker && location!=null && location.coords!=null){
            var distances = stops.map((item) =>
            {
              return({
                name: item.Name,
                SID: item.SID,
                Heading: item.Heading,
                distance:
                getDistance(
                  {latitude: location.coords.latitude, longitude: location.coords.longitude},
                  {latitude: item.Lat, longitude: item.Lon})    
                }
              )
            })
            setActiveDistances(distances) 
            //console.log(distances.find((d) => d.distance < 70))
            if(distances.find((d) => d.distance < 70)!=undefined)
            {
              var d1 = distances.filter((d) => d.distance < 70 && (d.Heading-heading)>0)
              //(d)
              console.log("Parked!")
              var d = d1.length>1 ? d1 : distances.filter((d) => d.distance < 70)
              console.log(d[0])
              if(d[0].Heading!=null)
              {
                setHeading((d[0].Heading+1)%stops.length)
              }           
              console.log(new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString() + ".000")
              fetch('http://bustracker.semo.edu/tUp.php', {
              method: 'PUT',
              body: JSON.stringify({
                Loc: loc,
                Lat: location.coords.latitude,
                Lon: location.coords.longitude,
                Heading: heading,
                hash:(1+heading)*((location.coords.latitude + location.coords.longitude)/7),
                LastStopTime: new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString() + ".000",


              })
            }).then((json) => json.json()).then((json2) => console.log("New Stop Stored:  " + json2))
              setPrevTime(Date.now())
            }
            else
            {

              fetch('http://bustracker.semo.edu/tUp.php', {
              method: 'PUT',
              body: JSON.stringify({
                Loc: loc,
                Lat: location.coords.latitude,
                Lon: location.coords.longitude,
                Heading: heading,
                LastUpdated: new Date().toISOString().split("T")[0] + " " + new Date().toLocaleTimeString(),
                hash: (1+heading)*((location.coords.latitude + location.coords.longitude)/7)
            })
            })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log("Update Response: " + JSON.stringify(responseJson));     
            })
            
            .catch((error) => {
               console.error(error);
               console.log("ERROR");
            });
            }
             
            }  
          
        }}
      />
     </View>
    
  );
}

