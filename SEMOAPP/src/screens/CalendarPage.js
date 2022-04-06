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


export default function CalendarPage() {

  const [date, setDate] = React.useState(null)

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
       {/* <CalendarPicker
          startFromMonday={true}
          dayLabelsWrapper={{}}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          dayShape="square"
          previousTitle="Previous"
          nextTitle="Next"
          todayBackgroundColor={theme.colors.redPastel}
          customDatesStyles={cds}
          customDayHeaderStyles={cdhs}
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          width={Dimensions.get('window').width*0.8}
          textStyle={{
            color: '#000000',
          }}
          onDateChange={onDateChange}
        />*/}
        <Calendar
  // Initially visible month. Default = now
  current={'2012-04-01'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  // Handler which gets executed on day press. Default = undefined

  onDayPress={day => {
    console.log('selected day', day);
  }}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'MMMM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={month => {
    console.log('month changed', month);
  }}
  // Hide month navigation arrows. Default = false
  hideArrows={false}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  firstDay={1}
  // Hide day names. Default = false
  // Show week numbers to the left. Default = false
  showWeekNumbers={false}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  // Disable right arrow. Default = false
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  // Replace default month and year title with custom one. the function receive a date as parameter
   renderHeader={date => {
     return(<Text>{date.toString("MMMM")}</Text>)
   }}
  // Enable the option to swipe between months. Default = false
  enableSwipeMonths={true}
  markingType={'multi-dot'}

  markedDates={{
    '2022-04-20': {textColor: 'green'},
    '2022-04-22': {startingDay: true, color: 'green'},
    '2022-04-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    '2022-04-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
  }}
/>
        </View>
        </View>
    
        </View>
  );
}
}

