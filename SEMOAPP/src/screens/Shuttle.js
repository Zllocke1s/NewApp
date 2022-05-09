import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, Image, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../styles/ShuttleStyle';
import {theme} from '../core/theme';
import { useFonts } from 'expo-font';
import MapView from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { FontAwesome } from '@expo/vector-icons'; 
import * as Location from 'expo-location';
import { Heading } from '../components/Heading';
import Moment from 'moment';



//To-do: Find a way to make a route on the map


export default function Shuttle({navigation}) {


  const mapRef = React.createRef();
  const [stops, setStops] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shuttleID, setShuttleID] = useState(1);
  const [genTabs, setGenTabs] = useState([])
  const [viewStops, setViewStops] = useState(false)
  const [found, setFound] = useState(false)

  useEffect(() => {
    if(genTabs.length>0)
    {
      //genTabs.find((item) => item.id==shuttleID).route.map((item) => {
      //  return JSON.stringify(item,Name) + "\n"
     // }) 
     var current = genTabs.find((item) => item.id==shuttleID)
     var index = current.route.findIndex((loc) => (loc.SID-current.route[0].SID)==current.heading)
     var sgenTabs = current.route.slice(index, current.route.length).concat(current.route.slice(0, index-1))
     var running = (Moment(current.stopTime.replace(" ", "T")).add(new Date(sgenTabs[0].Time*1000).getMinutes(), 'm')).toDate()- new Date()
     
     if(Math.round(Math.abs(running/60000))>500)
     {
       setFound(true)
     }
     else
     {
       setFound(false)
     }

     setTabs(sgenTabs.map((item,index) => {
      if(index>0)
      {
      running = running + item.Time*1000
      }
      if(Math.round(Math.abs(running/60000))<500)
      {
       if(running<0)
       {
        return <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}><Text>{"\u2022\t" + item.Name}</Text><Text>{(
          Math.round(Math.abs(running/60000)).toString() + " Minutes Late")}</Text></View>
       }
       else
       {
        return <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}><Text>{"\u2022\t" + item.Name}</Text><Text>{(
          Math.round(Math.abs(running/60000)).toString() + " Minutes")}</Text></View> 
       }
      }
      else
      {
        return <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}><Text>{"\u2022\t" + item.Name}</Text></View> 
      }
       
     }))
    }
  }, [genTabs])

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


  const snap = () => {
    console.log("tracker")
    console.log(tracker.length)
    
    animateMap(tracker.props.coordinate.longitude, tracker.props.coordinate.latitude)
  }



  const [tracker, setTracker] = useState(null)
  const [aID, setAID] = useState(0)
  const [formattedTabs, setTabs] = useState(null)
  const [route, setRoute] = useState("")
  const [loaded] = useFonts({
    Times: require('../assets/fonts/times.ttf'),
  });



  var load = false;

  useEffect(() => {
    const interval = setInterval(() => {
      defineTrackers()
    }, 8000);
    return () => clearInterval(interval);
  })

  const animateMap = (lat, lng) => {
    mapRef.current.animateToRegion({ // Takes a region object as parameter
        longitude: lat,
        latitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    },1000);
}

  function defineTrackers() {
    fetch('https://outpostorganizer.com/SEMO/tDown.php?route=' + shuttleID)
    .then((response) => response.json())
    .then((json) => {
      if(json!=null && json.code!="1003")
      {
        setTracker( <MapView.Marker key={json.records[0].ID}
        coordinate={{latitude: parseFloat(json.records[0].Lat),
        longitude: parseFloat(json.records[0].Lon)}}
        title={json.Name + " Shuttle"}
        >
          <FontAwesome name="map-marker" size={34} color={tabs[aID].color} />
        </MapView.Marker>
        )
        }
    
      else
      {
        setTracker(null)
      }
    
        
      
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

  }

  function getColor(ID)
  {
    switch(ID)
    {
      case(1):
        return theme.colors.red
      case(2):
        return theme.colors.blue
      case(3):
        return theme.colors.green
    }
    return theme.colors.black
  }
  function getStyle(ID)
  {
    switch(parseInt(ID))
    {
      case(1):
        return styles.redActive
      case(2):
        return styles.blueActive
      case(3):
        return styles.greenActive
      default:
        return styles.wingsActive

    }
  }

  

  useEffect(() => {
    if(aID!=null)
    {
    setRoute(tabs[aID].route)
    defineTrackers()
    }
  }, [load, aID])

  useEffect(() => {
    fetch('https://outpostorganizer.com/SEMO/tDown.php').then((response) => response.json())
    .then((json) => {
      fetch('https://outpostorganizer.com/SEMO/sDown.php').then((response) => response.json())
    .then((json2) => {
      setStops(
        json.records.map((route) => {
          return json2.records.filter((item) => item.RID==route.ID).map((item2) => {
          return(
            <MapView.Marker tracksViewChanges={false} key={item2.SID}
            coordinate={{latitude: parseFloat(item2.Lat),
            longitude: parseFloat(item2.Lon)}}
            title={item2.Name}
            >
              <FontAwesome name="map-marker" size={20} color={theme.colors.gray3} />
            </MapView.Marker>
          )
        })
        })
      )
      setGenTabs(json.records.map((route) => {
        return ({
          id: route.ID,
          stopTime: route.LastStopTime,
          heading: route.Heading,
          color: getColor(route.ID),
          style: getStyle(route.ID),
          name: route.Name,
          route: json2.records.filter((item) => item.RID==route.ID)
        })
      }))
   }).catch((error) =>console.log(error))
    }).catch((error) =>console.log(error))

  }, [shuttleID])


  load = true;
  var tabs = [
              {id: 0, color: theme.colors.red, name: "Red", route: "\u2022\tTowers\n\u2022\tDPS/Greek Village\n\u2022\tMMTF/Rec\n\u2022\tDempster\n\u2022\tScully\n\u2022\tParker/Cheney\n\u2022\tMemorial\n\u2022\tRear Academic\n\u2022\tGrauel\n\u2022\tUniversity Center\n\u2022\tMyers\n\u2022\tRear Kent\n\u2022\tPacific\n\u2022\tGrauel\n\u2022\tTowers"}, 
              {id: 1, color: theme.colors.blue, name: "River", route: "\u2022\tMyers\n\u2022\tRear of Kent\n\u2022\tPacific/Grauel\n\u2022\tBroadway Catapult\n\u2022\tBroadway Mass Media\n\u2022\tIndependence & Spanish\n\u2022\tRiver Campus\n\u2022\tBand Annex\n\u2022\tVandiver/Merick\n\u2022\tBookstore\n\u2022\tDempster\n\u2022\tPoly-Tech/LaFerla\n\u2022\tMMTF/Rec\n\u2022\tInternational Village\n\u2022\tTowers\n\u2022\tGrauel\n\u2022\tRear of Academic\n\u2022\tMemorial"},
              {id: 2, color: theme.colors.green, name: "Green", route: "\u2022\tMemorial\n\u2022\tParker/Cheney\n\u2022\tScully\n\u2022\tDempster\n\u2022\tPolyTech/LaFerla\n\u2022\tMMTF/Rec\n\u2022\tDPS/Greek Village\n\u2022\tInternational Village\n\u2022\tTowers\n\u2022\tGrauel\n\u2022\tHouck\n\u2022\tVandiver/Merick\n\u2022\tU.C.\n\u2022\tMyers\n\u2022\tRear of Kent\n\u2022\tPacific\n\u2022\tGrauel\n\u2022\tRear of Academic"},
              {id: 3, color: theme.colors.black, name: "Wings", route: "\u2022\tTowers\n\u2022\tVandiver\n\u2022\tMyers\n\u2022\tPacific\n\u2022\tTown Plaza\n\u2022\tCrossroads\n\u2022\tBest Buy (On Request)\n\u2022\tTarget, Marcus Cape West Cine (On Request)\n\u2022\tWalmart\n\u2022\tWest Park Mall, Hobby Lobby (On Request)\n\u2022\tHouck\n\u2022\tLaFerla\n\u2022\tMMTF"}
            ] 
  if(!loaded)
  {
    return <AppLoading/>

  }
  return (
    <View style={styles.container}>
      <Heading navigation={navigation} title={"Shuttle Tracker"}></Heading>
      <View style={styles.tabContainer}>
        {genTabs!=null ? genTabs.map((tab, index) => {
          return (
            <TouchableOpacity onPress={() => {setAID(index)
              setShuttleID(tab.id)}} style={aID==index ? tab.style : styles.inactive}><Text style={styles.tabTitle}>{tab.name}</Text></TouchableOpacity>     
          )
        }) : null }
        </View>
      <View style={[styles.infoContainer, {borderColor: tabs[aID].color}]}>
        <View style={styles.routeContainer}>
        <Text style={[styles.routeTitle, {fontFamily: "Times"}]}>Route:</Text>
        <ScrollView>
        <View style={{display: "flex", width: "90%", height: 500, flexDirection: "column"}}>
          {formattedTabs}
          </View>
        </ScrollView>
        </View>
        <View style={styles.mapContainer}>
          <Text style={tracker==null || found ? styles.error : styles.hidden}>
            Uh Oh!  We can't seem to locate the shuttle.{"\n"}Please try again later.
          </Text>
          <View style={tracker==null || found ? styles.hidden : styles.snap}>
          <Button color={theme.colors.red} title="Snap To Shuttle" onPress={snap}></Button>

          </View>
          <View style={{position: "absolute", borderRadius: 5, bottom: 0, zIndex: 150, right: 0, width: 50, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <TouchableOpacity onPress={() => setViewStops(!viewStops)} style={{paddingVertical: 5, width: "100%", justifyContent: "center", alignItems: "center"}}> 
          <FontAwesome name="map-marker" size={34} color={viewStops ? theme.colors.green : theme.colors.gray} />
          </TouchableOpacity>
        </View>
          <MapView style={styles.map}
              showsUserLocation={true}
              ref={mapRef}
              initialRegion={{
                latitude: 37.3153623,
                longitude: -89.5324009,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0221,
              }}

              >
            {viewStops ? stops[aID] : null}    
            {found ? null : tracker}
            
          </MapView>
          
        </View>
      </View>
      </View>
    
  );
}

