import { memo } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import CheckedBox from '../assets/checkedBox.svg';
import UncheckedBox from '../assets/uncheckedBox.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from './Task';
import { ScrollView } from 'react-native-gesture-handler';
import TodayItem from './TodayItem';
import Button from './Button';


const MessageItem = ({ camp, message, loadList, replyCall, ...props }) => {

function open() {
  setChecked(!checked)
}

function replyUp(sender) {
  replyCall(sender)
}

function del()  {
  fetch('http://outpostorganizer.com/SITE/api.php/records/Messages/' + message.MID + '?camp=' + camp, {
      method: 'DELETE',
    })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log("Feedback Response: " + JSON.stringify(responseJson));   
      loadList()
    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });
}

const [checked, setChecked] = React.useState(false);
const [showSite, setSite] = React.useState(false);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    textAlignVertical: "bottom",
    overflow: "visible"
    
  },
  peopleText: {
    fontSize: 16,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    overflow: "visible",
    marginBottom: 10
    
  },
  claimedText: {
    fontSize: 16,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    textAlignVertical: 'top',
    overflow: "visible"
    
  },
  header: {
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 0.5,
    textAlignVertical: "bottom"
  },
  denied: {
    fontSize: 20,
    color: theme.colors.secondary,
    textAlign: 'center',
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    fontFamily: "SulphurPoint-Bold",    
    flex: 0.5,
    backgroundColor: theme.colors.lightRed,
    padding: 8,
    textAlignVertical: 'top',
    borderRadius: 10,
  },
  container:
  {
    lineHeight: 26,
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 14,
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerDenied:
  {
    lineHeight: 26,
    backgroundColor: theme.colors.lightRed,
    marginBottom: 14,
    width: '100%',
    flex: 2,
    flexDirection: 'column',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginBottom: 15,
    flex: 1,
    width: "100%"
  },
  textContainer:
  {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    marginTop: 20,
    backgroundColor: theme.colors.lightBlue,
    flex: 1,
  },
  subContainerDenied:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: 20,
    marginBottom: 15,
    flex: 4,
    backgroundColor: theme.colors.lightRed
  },
  buttonholder:
  {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 4,
    width: "100%"
  },
  expandedContainer:
  {
    flexDirection: 'column',
    justifyContent: "center",
    padding: 0,
    marginBottom: 10,
    flex: 4,
    width: "100%",
    alignItems: "center"
  },
  expandedContainerHide:
  {
    flexDirection: 'column',
    justifyContent: "center",
    width: 0,
    display: "none",
    
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    position: 'absolute',
    left: 20,
    top: '22%',
    overflow: 'visible',
  },
  people:
  {
    flex: 0.3,
    textAlign: 'right',
    flexDirection: 'row',

  },
  line:
  {
    height: 2,
    flex: 10,
    width: "100%",
    backgroundColor: theme.colors.darkBlue,
    marginBottom: 5
  },
  lineHidden:
  {
    backgroundColor: theme.colors.medBlue,
    display: "none"
  },
  taskListHidden:
  {
    backgroundColor: theme.colors.medBlue,
    display: "none"
  },
  taskList:
  {
    textAlign: "left",
    marginLeft: -20,
    width: "100%",
    backgroundColor: theme.colors.lightBlue
  },
  taskListDenied:
  {
    textAlign: "left",
    marginLeft: -20,
    width: "100%",
    color: theme.colors.black
  },
  join: {
    height: 'auto',
    borderRadius: 20,
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.black,
    fontFamily: 'SulphurPoint-Bold',   
    width: 'auto',
},
claim: {
  height: 'auto',
  borderRadius: 20,
  backgroundColor: theme.colors.lightPink,
  color: theme.colors.black,
  fontFamily: 'SulphurPoint-Bold',   
  width: 'auto',
},
hidden: {
  display: "none"
},
buttonContainer: {
  display: 'flex',
  flexDirection: "row",
  justifyContent: "space-evenly",
  width: "100%"
},
button: {
  height: 'auto',
  borderRadius: 15,
  backgroundColor: theme.colors.lightRed,
  color: theme.colors.black,
  fontFamily: 'SulphurPoint-Regular',   
  width: '40%',
  borderColor: theme.colors.black,
  fontSize: 18,
  borderWidth: 2
},

buttonGreen: {
  height: 'auto',
  borderRadius: 15,
  backgroundColor: theme.colors.lightGreen,
  color: theme.colors.black,
  fontFamily: 'SulphurPoint-Regular',   
  width: '40%',
  borderColor: theme.colors.black,
  fontSize: 18,
  borderWidth: 2
},
buttonHidden:{
  display: "none"
}
  
});


return(<View style={styles.container}><TouchableOpacity activeOpacity={1.0} style={styles.container} onPress={open}><View style={styles.subContainer}><View style={styles.textContainer}>
  <Text style={styles.header}>{"From: " + message.sender}</Text>
  <Text style={styles.header}>{message.date + " - " + message.time}</Text></View></View>
  <View style={[checked ? styles.expandedContainer : styles.expandedContainerHide ]}>
    <View style={[checked ? styles.line : styles.lineHidden ]}><Text></Text></View>
    <View style={styles.buttonholder}><Button style={!checked ? styles.buttonHidden : styles.button} onPress={() => {
      del(message.MID)
    }}><Text style={styles.button}>Delete</Text></Button><Button style={!checked ? styles.buttonHidden : styles.buttonGreen} onPress={() => {
      replyUp(message.sender)
    }}><Text style={styles.buttonGreen}>Reply</Text></Button></View><ScrollView style={styles.taskList}><Text style={styles.peopleText}>{message.message}</Text></ScrollView></View></TouchableOpacity></View>);
};
export default memo(MessageItem);
