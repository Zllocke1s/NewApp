import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from '../styles/CalendarStyle';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import CalendarPicker from 'react-native-calendar-picker';
import { theme } from '../core/theme';
import Moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {CalendarItem} from '../components/CalendarItem';

export default function CalendarPage() {

  const [data, setData] = React.useState(null)
  const [date, setDate] = React.useState(null)
  const [dataMapped, setDataMap] = React.useState(null)
  const [dotsMapped, setDots] = React.useState(null)
  //var cds = {}
  var cdhs = {}
  const onDateChange = (date, type) => {
    setDate(date)
  };

  let cds = [];
  let today = Moment();
  let day = today.clone().startOf('month');
while(day.add(1, 'day').isSame(today, 'month')) {
  cds.push({
    date: day.clone(),
    // Random colors
    containerStyle: {
      width: "100%",
      flex: 1,
      padding: 0,
      margin: 0
    },
    style: {
      margin: 0,
      padding: 0,
      borderWidth: 1,
      borderColor: "#000",
      flex: 1,
    },
    textStyle: {
      color: 'black',
      position: 'absolute',
      right: 0,
      top: 0}, // sets the font color
    containerStyle: [], // extra styling for day container
    allowDisabled: true, // allow custom style to apply to disabled dates
  });
}

//"Campus","Academics","River Campus",
//"Faculty and Staff","Students","River Campus - Art Gallery",
//"Arts & Media","English","Art & Design","Humanities & Social Sciences"

const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};

function newDot(name) {
  return {tag: name, color: generateColor()}
}


var currentTags = [{"tag":"River Campus","color":"#3d2fa3"},
{"tag":"Athletics","color":"#02f7e6"},
{"tag":"Engage in 8","color":"#6a6499"},
{"tag":"Student Life","color":"#0b5c83"},
{"tag":"University","color":"#d77770"},
{"tag":"Academic Calendar","color":"#47c88a"},
{"tag":"Academic Events","color":"#ec3303"},
{"tag":"Alumni & Foundation","color":"#3a87df"},
{"tag":"Greek Life","color":"#3f8527"}]

useEffect(() => {
  fetch('https://semo.edu/_data/event-data.json')
  .then((response) => response.json())
  .then((json) => {
    var calList = {}
    var dotList = {}
    json.forEach(element => {
      var m = Moment(new Date(element.start)).format('YYYY-MM-DD')
      var tag = element.tags[0]
        if(undefined==currentTags.find((t) => t.tag==tag))
        {
          var newTag = newDot(tag)
          currentTags.push(newTag)
         // console.log(JSON.stringify(newTag))
        }
        if(!dotList.hasOwnProperty(m))
        {
          dotList[m] = {dots: []}
        }
        dotList[m].dots.push(currentTags.find(item => item.tag==tag))
        if(!calList.hasOwnProperty(m))
        {
          calList[m] = []
        }
        element.color = currentTags.find(item => item.tag==tag).color
        //console.log(element.color)
        calList[m].push(element)
     // console.log(JSON.stringify(currentTags))

     // console.log("CalList:")
      //console.log(calList)
    })
    //console.log(calList)
   // console.log(dotList)
    setData(calList)
    setDots(dotList)
  }
    )
  .catch((error) => {
    console.error(error);
  });
  

}, [])

useEffect(() => {
  if(data!=null)
  {
   // console.log((data))
  }
}, [data])

useEffect(() => {
  if(dotsMapped!=null)
  {
  // console.log((dotsMapped))
  }
}, [dotsMapped])

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

const [loaded] = useFonts({
  Times: require('../assets/fonts/times.ttf'),
});
if(!loaded)
{
  return <AppLoading/>

}
else {
  return (
    <View style={styles.container}>
    <View style={styles.container2}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.title, {fontFamily: "Times"}]}>Academic Calendar</Text>
         </View>
      </View>
      <View style={styles.calContainer}>
        <Image source={require("../assets/semo.png")} style={{width: 300, height: 120}}></Image>
     <Agenda
     //Right now, each item in the datamapped object has a .dots property
     //I need the property to be the only thing, and in the actual object, not the sub object
  items={data}
  selected={Moment(Date().toString()).format("YYYY-MM-DD")}
  markingType={'multi-dot'}
  markedDates={dotsMapped}
  // Callback that fires when the calendar is opened or closed
  onCalendarToggled={calendarOpened => {
//    console.log(calendarOpened);
  }}
  // Callback that gets called on day press
  onDayPress={day => {
    console.log('day pressed');
  }}
  // Initially selected day
  // Specify how each item should be rendered in agenda
  renderItem={(item, firstItemInDay) => {
    return <CalendarItem key={item.id} item={item} />;
  }}
  onDayChange={day => {
    console.log("Scrolled")
  }}
  
  rowHasChanged={(r1, r2) => {
    console.log(JSON.stringify(r1.id !== r2.id))
    return r1.id !== r2.id;
  }}

  showOnlySelectedDayItems={false}
  // Specify how each date should be rendered. day can be undefined if the item is not first in that day

  // Agenda theme
  theme={{
    selectedDayBackgroundColor: theme.colors.red,
    agendaDayTextColor: theme.colors.gray3,
    todayTextColor: theme.colors.red,
    dotColor: theme.colors.red,
    agendaDayNumColor: theme.colors.gray3,
    agendaTodayColor: theme.colors.red,
    agendaKnobColor: theme.colors.redPastel
  }}
  // Agenda container style
  style={{}}
/>
        </View>
        </View>
    
        </View>
  );
}
}

