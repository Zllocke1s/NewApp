import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/AthleticsStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; 
import React, { useState, useEffect } from 'react';
import {Game}  from '../components/Game';
import {SportsTile} from '../components/Tile';
import Moment from 'moment';
import {Calendar, CalendarList, AgendaList} from 'react-native-calendars';
import {IMItem} from '../components/IMItem';
import { Entypo } from '@expo/vector-icons'; 
import { theme } from '../core/theme';

export default function FitnessClasses({navigation}) {

  var classes = [
    {
      name: "Drum to the Beat",
      desc: "Grab a pair of drumsticks and drum to the beat of the music in this pre-choreographed, fun fitness routine! This class involves dance, cardio moves, and strengthening exercises. "
    },
    {
      name: "RedhawkSHRED",
      desc: "Get ready to push yourself to the limit for short bursts of time and learn creative total body movements during your recovery between intervals. This class is done using your body, movement, and occasionally a variety of fitness equipment."
    },{
      name: "Kick and HIIT:",
      desc: "This class incorporates basic self-defense movements with high-intensity, cardio exercises including the use of weights, steps, and other equipment. This intense full-body workout burns calories while teaching core concepts of self-defense, set to short-intervals measured by upbeat music."
    },{
      name: "Barre",
      desc: "The Barre system is designed to use small isometric movements in order to help re-shape your body. This workout draws from the three disciplines of ballet: barre work, yoga, and Pilates. This workout offers fast body-shaping results and long-term postural benefits utilizing the ballet barre to perform small movements set to fun music."
    },{
      name: "RedhawkPUMP",
      desc: "Take it back to basic core strengthening moves such as squats, lunges, chest presses, rows, shoulder presses, dead lifts, etc., in this fun strength-building weight training class. You’ll use barbells, dumbbells, bands, and other weight equipment during this class."
    },{
      name: "Aerial Yoga",
      desc: "Using a yoga hammock or silks, participants will work with gravity to explore, refine, and advance yoga postures both in the air and on the ground. You’ll relax and realign your body, center your mind, and uplift your spirit during this class. Only eight participants are allowed per class. Sign up on IMLeagues."
    },{
      name: "Aerial Yoga",
      desc: "This is a more dynamic version of traditional yoga. It’s faster and more intense with a focus on building strength and flexibility, with less emphasis on meditation or deep breathing."
    },{
      name: "Yoga",
      desc: "In this traditional yoga class, the disciplines of mindful breathing and proper alignment of the body in asana will be incorporated. Practicing yoga improves overall health and well-being by increasing flexibility, strength, and calmness of mind. You are encouraged to bring a yoga mat, but we do have some extras available."
    },{
      name: "Candlelit Yoga",
      desc: "Relax in a dark, candlelit room as your body flows through a variety of yoga poses and postures."
    },
    
  ]


  const [games, setGames] = useState(null)
  const [itemList, setItemList] = React.useState(null)

  const [showSchedule, toggleSchedule] = useState(false)

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
        <View style={styles.row2}>
      <TouchableOpacity onPress={() => {
        toggleSchedule(true)
      }}><Text style={[showSchedule ? styles.titleActive: styles.title, {fontFamily: 'Times'}]}>Schedule</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        toggleSchedule(false)
      }}><Text style={[!showSchedule ? styles.titleActive: styles.title, {fontFamily: 'Times'}]}>Classes</Text></TouchableOpacity>
      </View>
        </View>
      <View style={ showSchedule ? styles.scheduleContainer : styles.hidden}>
      <Calendar
     //Right now, each item in the datamapped object has a .dots property
     //I need the property to be the only thing, and in the actual object, not the sub object
  selected={Moment(Date().toString()).format("YYYY-MM-DD")}
  markingType={'multi-dot'}
  //markedDates={}
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
   /* if(dummyGames[day.dateString]!=null)
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
    }*/
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
      
      <View style={!showSchedule ? styles.classContainer : styles.hidden}>
      <ScrollView>
        {classes.map((item) => {
          return(
            <View style={styles.individualContainer}>
            <Text style={{
              fontFamily: "Times",
              color: theme.colors.black,
              fontSize: 17,
              fontWeight: '400',
              marginLeft: 5
          }}>{item.name}</Text>
            <Text style={{
              fontFamily: "Times",
              color: theme.colors.black,
              fontSize: 15,
              marginLeft: 20
          }}>{item.desc}</Text>
            </View>
          )
        })}
      </ScrollView>
      </View>
        </View>
        </View>
        
    
  );
}

