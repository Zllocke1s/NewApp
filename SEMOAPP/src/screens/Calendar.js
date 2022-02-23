import React, { memo, useEffect, useReducer } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import AdvElement from '../components/AdvElement';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/CalendarStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  CalDay  from '../components/CalDay';
import CalComp from '../components/CalComp';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../components/Button';
import EventDetails from '../components/EventDetails';
import MapView from 'react-native-maps';


const Calendar = ({ load, navigation, user }) => {
  const task1 = () => {
    return ["Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4", "Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4", "Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4", "Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4", "Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4", "Sweep Outdoors1", "Sweep Outdoors2", "Sweep Outdoors3", "Sweep Outdoors4"];
  }


  const [calOff, setCalOff] = React.useState(0);

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


  const [date, setDate] = React.useState(new Date().getFullYear() + "-" + (eval(new Date().getMonth()) > 10 ? eval(new Date().getMonth()) : "0" + eval(new Date().getMonth()+eval(calOff))).toString() + "-02");

  const [data, setData] = React.useState([]);


  
  const [showAdv, setAdv] = React.useState(false);

  const [selectedDate, setSelectedDate] = React.useState(0);


  if(load)
  {
    load = false;
  }

  //Hello future Zach!!!  If you ever find yourself running into lifecycle issues in the future, here is how you fixed it this time:
  /*Your issue: asyncronous code was written in the following order:
  1. Fetch data
  2. Render data
  Code ran in  this order:
  1. Render data
  2. Fetch data
  3. Rerender data (this is why you can't refetch the data afterwards)
  Solution: Render a blank version of your code that doesn't utilize the data (if obj==null, stuff like that)
  This will then be populated and re-rendered when the obj is set.  
  */
 

  function onReturn() {
    
    fetchData();
  
  }


  function loadEventDetPage(event, user, data)
  {
   // console.log("Pressed");
    navigation.navigate('EventSignup', {data: {data}, event: {event}, user: {user}, onGoBack: () => onReturn(), });
  }

  const loadDetails = () => {
    if(selectedDate!=0)
    {
    //  console.log(JSON.stringify(data));
      return data.map(event => {
        console.log("1: " + event.Date);
        console.log("2: " + selectedDate);
        if(parseInt(event.Date.split("-")[1], 10) + "-" + parseInt(event.Date.split("-")[2], 10) + "-" + parseInt(event.Date.split("-")[0], 10) == (eval(selectedDate.split("-")[0])).toString() + "-" + (eval(selectedDate.split("-")[1])).toString() + "-" + (eval(selectedDate.split("-")[2])).toString())
        {
          return <View><EventDetails onPress={loadEventDetPage} user={user} event={event} /></View>
        }
        else
        {
          //console.log("Event Split: " + parseInt(event.Date.split("-")[1], 10) + "-" + parseInt(event.Date.split("-")[2], 10));
          //console.log("selectedDate: " + (eval(selectedDate.split("-")[0])+1).toString() + "-" + (eval(selectedDate.split("-")[1])).toString());
        }
      })
    }
  };

  const fetchData = () => {
    return fetch('http://outpostorganizer.com/SITE/api.php/records/Calendar/?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("called");
    setData(responseJson.records);
    return responseJson.records;
    //console.log(data);
  } )
  }
useEffect(() => 
{
  fetchData();
}, [load])
//

function mod(n, m) {
  return ((n % m) + m) % m;
}

useEffect(() =>
{
 // console.log("current date: " + new Date().getFullYear() + "-" + (eval(new Date().getMonth()) > 10 ? eval(new Date().getMonth()) : "0" + eval(new Date().getMonth()+eval(calOff))).toString() + "-02");
 // console.log("Firing: " + eval(new Date().getFullYear()+Math.floor(eval(new Date().getMonth()+eval(calOff))/12)) + "-" + (((mod(eval(new Date().getMonth()+eval(calOff)), 12))+1) >= 10 ? ((mod(eval(new Date().getMonth()+eval(calOff)), 12))+1).toString() : "0" + (mod(eval(new Date().getMonth()+eval(calOff)), 12)+1).toString()) + "-02");
 // console.log("Month: " + (eval(new Date().getMonth()+eval(calOff))%12 >= 10 ? eval(new Date().getMonth()+eval(calOff))%12 : "0" + eval((new Date().getMonth()+eval(calOff)))%12).toString());
  setDate(eval(new Date().getFullYear()+Math.floor(eval(new Date().getMonth()+eval(calOff))/12)) + "-" + (((mod(eval(new Date().getMonth()+eval(calOff)), 12))+1) >= 10 ? ((mod(eval(new Date().getMonth()+eval(calOff)), 12))+1).toString() : "0" + (mod(eval(new Date().getMonth()+eval(calOff)), 12)+1).toString()) + "-02");
}, [calOff])


  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else{
  return (
    
    
    <View style={styles.container}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

{//user.screenName
}
    <Text style={styles.welcome}></Text>    
    <View style={styles.calendarHeader}><Text style={styles.calendarDateHeader}>Map</Text>
       

    </View>
    <View borderwidth={1} style={styles.CalBox}>
    <MapView style={styles.map}
    initialRegion={{
      latitude: 37.322666405074756,
      longitude: -89.52896118164064,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}><MapView.Marker
            coordinate={{latitude: 37.17447456631917,
            longitude: -89.45969581604005}}
            title={"River Ridge"}
            description={"Winery"}
         /></MapView>
    </View>
    <View borderwidth={1} style={styles.ListBox}>
      <ScrollView style={{width: '100%'}} contentContainerStyle={{width: '100%'}}>
        {loadDetails()}
        </ScrollView>
</View>
    </View>
   ) };
};

export default memo(Calendar);
