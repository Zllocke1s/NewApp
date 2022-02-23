import { memo } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckCircle from './CheckCircle';

const CalDay = ({ weekDay, calendarInfo, selected, onPress, date, events, ...props }) => {
  
  //console.log("CalendarInfo Passed: " + JSON.stringify(calendarInfo));


  var weekDays = ["S", "M", "T", "W", "H", "F", "A"];


const itemBubbles = () => 
{
  if(calendarInfo!=null)
  {
   return(calendarInfo.map(event => {
    var bubbleColor;

    if(event.Workers.split("&").length==1)
    {
      
       bubbleColor = theme.colors.lightRed;
    }
    else if(eval(event.amountOfWorkers) + 1 - event.Workers.split("&").length <=  0)
    {
      bubbleColor = theme.colors.lightGreen;
    }
    else
    { 
        bubbleColor = theme.colors.yellow;
    }
   // console.log(event.Date.toString())
  //  console.log("--------------------------------CalDay Date: " + event.Date); //2021-08-10
   // console.log("--------------------------------CalDay Date: " + date); //11-27-2022
  //console.log("Date Check: " + (eval(date.split("-")[0])==parseInt(event.Date.split("-")[1], 10)));
    if(event.Date!=null && ((eval(date.split("-")[0])==parseInt(event.Date.split("-")[1], 10) && date.split("-")[1]==parseInt(event.Date.split("-")[2], 10) && date.split("-")[2]==parseInt(event.Date.split("-")[0], 10))))
    {
    return(<View>
        <View /><Text style={{width: 10, height: 10, backgroundColor: bubbleColor, borderRadius: 500, borderColor: theme.colors.black}}></Text>
      </View>)
    }
    else
    {
     }

   }));}
   else
   {
     console.log("calendar null");
   }
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
    fontSize: 26,
    color: theme.colors.black,
    textAlignVertical: "center",
    fontFamily: "SulphurPoint-Regular",    
    marginTop: 8,
    marginBottom: 7,

  },
  headerChecked: {
    fontSize: 35,
    color: theme.colors.black,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",    
    textAlignVertical: "center",
    marginLeft: 10,
    alignSelf: "center",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    flex: 0.8

  },
  container:
  {
    textAlignVertical: "center",
    width: 45,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.black,
    borderWidth: 1,
    alignSelf: 'stretch',
    height: 60,
    justifyContent: "flex-start",
    paddingRight: 7,
    padding: 2, 
    overflow: "hidden"
  },
  selectedCont:
  {
    textAlignVertical: "center",
    width: 45,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.medBlue,
    borderColor: theme.colors.black,
    borderWidth: 1,
    alignSelf: 'stretch',
    height: 60,
    justifyContent: "flex-start",
    paddingRight: 7,
    padding: 2, 
    overflow: "hidden"
  },


  containerOnDay:
  {
    textAlignVertical: "center",
    width: 45,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.lightRed,
    borderColor: theme.colors.black,
    borderWidth: 1,
    alignSelf: 'stretch',
    height: 60,
    justifyContent: "flex-start",
    paddingRight: 7,
    padding: 2, 
    overflow: "hidden"
  },
  containerHidden:
  {
    display: 'none'
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
  },
  items:
  {
    display: "flex",
    flexDirection: "row",
    flex: 0.1,
    marginBottom: 0
  }

  
});


return (
  <TouchableOpacity onPress={()=> {
 //   console.log("New: " + date);
 //   console.log((new Date().getMonth()+1==(date.split("-")[0])));
 //   console.log((new Date().getDate()==date.split("-")[1]));
    onPress(date);
    }
  } style={((new Date().getMonth()+1==(date.split("-")[0])) && (new Date().getDate()==date.split("-")[1]) && (new Date().getFullYear().toString()==date.split("-")[2])) ?  (selected==date ? styles.selectedCont : styles.containerOnDay) : (selected==date ? styles.selectedCont : styles.container)}>
    <Text style={styles.header}>{date.split("-")[1]}
    </Text>
    <View style={styles.items}>
    {itemBubbles()}<Text style={{fontSize: 10}}></Text>
    </View>
  </TouchableOpacity>
  );
};
export default memo(CalDay);
