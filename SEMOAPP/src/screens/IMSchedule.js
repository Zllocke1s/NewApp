import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, ScrollView} from 'react-native';
import { styles } from '../styles/AthleticsStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import { theme } from '../core/theme';
import Moment from 'moment';
import {Calendar, CalendarList, AgendaList} from 'react-native-calendars';
import {IMItem} from '../components/IMItem';
import { Entypo } from '@expo/vector-icons'; 

export default function IMSchedule({navigation}) {


  var dummyGames = {
    "2022-04-21":  {
      events: [{
        id: 1,
        sport: "Softball", 
        home: "Lambda Chi", 
        away: "Delta Chi", 
        location: "Intramural Fields / Sprigg", 
        time: "6:00 PM"
        }],
        dots: [{"tag":"Athletics","color":"#a6a"}],
    },
    "2022-04-22": {
      events: [{
      id: 2,
      sport: "Flag Football", 
      home: "Alpha Xi", 
      away: "Alpha Delta Pi", 
      location: "Intramural Fields / Sprigg", 
      time: "6:00 PM"
      }],
      dots: [{"tag":"Athletics","color":"#02f796"}],
    },
    
  }

  
  const [itemList, setItemList] = React.useState(null)

  const [loaded] = useFonts({
    Times: require('../assets/fonts/times.ttf'),
  });

  if(!loaded)
  {
    return <AppLoading/>

  }
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <View style={styles.headerContainer}>
          <Image style={styles.logo}
                   source={require("../assets/rec.png")}
           ></Image>
      </View>
      <View style={styles.content}>
        <View style={styles.row1}>
        </View>
        <Text style={[styles.title, {fontFamily: 'Times'}]}>Upcoming Games:</Text>
        </View>
      <View style={styles.upcomingContainer}>
      <Calendar
     //Right now, each item in the datamapped object has a .dots property
     //I need the property to be the only thing, and in the actual object, not the sub object
  selected={Moment(Date().toString()).format("YYYY-MM-DD")}
  markingType={'multi-dot'}
  markedDates={dummyGames}
  renderArrow={direction => {
    console.log(direction)
    if(direction=="left")
    {
      return (
        <Entypo name="chevron-left" size={24} color="black" />
      )
    }
    else
    {
      return (
        <Entypo name="chevron-right" size={24} color="black" />
      )
    }
    
  }}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
//    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
    if(dummyGames[day.dateString]!=null)
    {
      console.log(dummyGames[day.dateString])
    setItemList(
      
      (dummyGames[day.dateString].events.map((event) => {
      return (<IMItem item={event} />)
      })))
    }
    else
    {
      setItemList(null)
    }
  }}
  // Initially selected day
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <CalendarItem key={item.id} item={item} />;
  }}
  onDayChange={day => {
    console.log("Scrolled")
  }}
  
  enableSwipeMonths={true}


  // Specify how each date should be rendered. day can be undefined if the item is not first in that day

  // Agenda theme
  theme={{
    selectedDayBackgroundColor: theme.colors.red,
    agendaDayTextColor: theme.colors.gray3,
    todayTextColor: theme.colors.red,
    dotColor: theme.colors.red,
  }}
  // Agenda container style
  style={{}}
/>
      </View>
      <View style={styles.items}>
      <ScrollView>
        {itemList}
      </ScrollView>
      </View>
        </View>
        </View>
        
    
  );
}

