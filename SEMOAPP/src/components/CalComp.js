import { memo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckCircle from './CheckCircle';
import CalDay from './CalDay';
import { ThemeConsumer } from 'react-native-elements';

const CalComp = ({ calendarInfo, selectedDate, selectDate, lastDay, date, events, ...props }) => {
  
var monthLens = [31, (new Date(date).getFullYear % 4 == 0 && (new Date(date).getFullYear % 100 != 0 || new Date(date).getFullYear % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var events1 = [{"name": "Morning Devo", "time": "07:45:00", "workersRequired": 1, "workers": "Plank&", "details": ""}, {"name": "Meal Host", "time": "07:45:00", "workersRequired": 1, "workers": "", "details": ""}];

var events2 = [{"name": "Morning Devo", "time": "07:45:00", "workersRequired": 1, "workers": "Plank&", "details": ""}, {"name": "Meal Host", "time": "07:45:00", "workersRequired": 1, "workers": "", "details": ""}];

var year = new Date().getFullYear() % 1000;

var doW = (year + Math.floor(year / 4)) % 7;
console.log(doW);

console.log("Today: " + new Date().getDay());




const setDays = (month, start, end, thisYear) => 
{
   var listOfDays = [];
   for(var i=start; i<=end; i++)
   {
       listOfDays.push(i);
     //  console.log(i);
   }


   return(listOfDays.map(day => {
  //   console.log(month);
    // console.log(monthLens[month]);
  //   console.log(month + "-" + (day%monthLens[(eval(month-1)+12)%12]).toString() );
       return(<CalDay calendarInfo={calendarInfo} weekDay={day-start} selected={selectedDate} events={events1} onPress={selectDate} date={day>monthLens[(eval(month-1)+12)%12] ? month+1 + "-" + (day%monthLens[(eval(month-1)+12)%12]).toString() : month + "-" + (day).toString() + "-" + thisYear.toString()}></CalDay>)
   }));
};

const buildCalendar = (month, start, end) => 
{
  console.log("SelectedDate: " + selectedDate);
  console.log("Date1: " + date);
  var selectedYear = new Date(date).getFullYear();
  console.log("SelYear: " + selectedYear);
  console.log("Date: " + eval((new Date(date).getDay())  % 7));
  console.log("Date2: " + eval(new Date(date).getMonth()));
  var previousMonthLen = monthLens[(eval(new Date(date).getMonth()-1)+12)%12];
  console.log("Previous Month: " + previousMonthLen);
  var startDay = eval((new Date(date).getDay() -1) % 7);
  console.log("startDay: " + startDay);
  console.log("First Day on Cal: " + eval(previousMonthLen - startDay-1));
  console.log("SEcond day on cal: " + eval(7 - startDay));
   return(
     <View style={styles.subContainer}>
    <Text style={styles.header}>{setDays(new Date(date).getMonth(), previousMonthLen - startDay, previousMonthLen - startDay+6, selectedYear)}
    </Text><Text style={styles.header}>{setDays(new Date(date).getMonth()+1, 7 - startDay, 13 - startDay, selectedYear)}
    </Text><Text style={styles.header}>{setDays(new Date(date).getMonth()+1, 14 - startDay, 20 - startDay, selectedYear)}
    </Text><Text style={styles.header}>{setDays(new Date(date).getMonth()+1, 21 - startDay, 27 - startDay, selectedYear)}
    </Text><Text style={styles.header}>{setDays(new Date(date).getMonth()+1, 28 - startDay, 34 - startDay, selectedYear)}
    </Text></View>
   );
};


const setDays2 = () => {

  var year = new Date().getFullYear() % 1000;

  var yearCode = (year + (year / 4)) % 7;

  
 // (YY + (YY div 4)) mod 7
/*January = 0
February = 3
March = 3
April = 6
May = 1
June = 4
July = 6
August = 2
September = 5
October = 0
November = 3
December = 5*/

  return(listOfDays.map(day => {
    return(<CalDay selected={selectedDate} calendarInfo={calendarInfo} events={events1} onPress={selectDate} date={day>30 ? month+1 + "-" + (day%31+1).toString() : month + "-" + (day).toString()}></CalDay>)
}));
};


const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 26,
    color: theme.colors.darkBlue,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",
    marginLeft: 40,
    textAlignVertical: "center"

  },
  header: {
    fontSize: 20,
    color: theme.colors.black,
    fontFamily: "SulphurPoint-Regular",    
    backgroundColor: theme.colors.medBlue,
    alignSelf: "center",
    
  },
  headerChecked: {

  },
  container:
  {
    textAlignVertical: "center",
    alignItems: "stretch",
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
  },
  subContainer:
  {
    textAlignVertical: "center",
    alignItems: "stretch",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    alignSelf: 'stretch',
    justifyContent: "center",
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    alignSelf: "flex-end",
  },
  checkboxContainerHidden: // I don't actually hide it but don't tell anyone.
  {
    overflow: 'visible',
    borderWidth: 10, 
    borderColor: theme.colors.darkBlue
  }

  
});


return (
  <View style={styles.container}>
    {buildCalendar()}
  </View>
  );
};
export default memo(CalComp);
