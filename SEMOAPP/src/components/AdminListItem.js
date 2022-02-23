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
import Icon from 'react-native-vector-icons/FontAwesome5';
import TextInput from '../components/TextInput';


const AdminListItem = ({ aPoints, siteNum, adv, progress, title, people, style, tasks, children, ...props }) => {
var advList;

const [actionTaken, setAction] = React.useState(false);
const [comment, setComment] = React.useState(null)

  const taskList = tasks.map((task) => { return( 
  <Task title={task}/> )  });

const open = () => {
  setChecked(!checked);
}

const list = () => {
  setSite(!showSite);
}

const deny = () => {
  console.log("Denied");
  console.log("SiteNum from CLI: " + siteNum);
  setAction(true);
  adv(title, siteNum, 0, tasks.join("& "), aPoints, comment);
  }
  const approve = () => {
    console.log("Approved");
    setAction(true);
    console.log("SiteNum from CLI: " + siteNum);
    adv(title, siteNum, 2, tasks.join("& "), aPoints, comment);
    }


const [checked, setChecked] = React.useState(false);
const [showSite, setSite] = React.useState(false);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: theme.colors.darkBlue,
    textAlign: 'right',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    textAlignVertical: "bottom"
    
  },
  header: {
    width: "100%",
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.secondary,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 1,
    textAlign: "center",
    textAlignVertical: "bottom"
  },
  container:
  {
    lineHeight: 26,
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 14,
    width: '100%',
    flex: 2,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hide:
  {
    display: "none"
  },
  subContainer:
  {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    marginTop: 20,
    marginBottom: 15,
    flex: 2,
    width: "100%",
  },
  expandedContainer:
  {
    flexDirection: 'column',
    justifyContent: "center",
    padding: 0,
    marginTop: 5,
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
  bar:
  {
    width: progress,
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barBackground:
  {
    width: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  people:
  {
    flex: 0.5,
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
  arrow:
  {
    position: "absolute",
    bottom: 0,
    right: -20,
  },
  taskList:
  {
    textAlign: "left",
    marginLeft: -20,
    width: "100%",
  },
  approve: {
    height: 'auto',
    borderRadius: 20,
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.black,
    fontFamily: 'SulphurPoint-Bold',   
    width: '20%',
  },
  deny: {
    height: 'auto',
    borderRadius: 20,
    backgroundColor: theme.colors.lightRed,
    color: theme.colors.black,
    fontFamily: 'SulphurPoint-Bold',   
    width: '20%',
  },
  buttonHolder: {
      display: "flex",
      flexDirection: "row",
      width: "70%",
    //  backgroundColor: "#00FF00",
      justifyContent: "space-evenly",
      
    },
    
  
});


return (
  <View style={actionTaken ? styles.hide: styles.container}>
 
  <TouchableOpacity activeOpacity={1.0} style={styles.container} onPress={open} >
    <View style={styles.subContainer}>
      <Text style={styles.header}>{title}</Text>
</View><View style={styles.expandedContainer}><View style={styles.buttonHolder} >
  <Button style={styles.deny} mode="outlined" onPress={deny}>
<Icon name="times" size={25} color={theme.colors.darkBlue} />
  </Button><Button style={styles.approve} mode="outlined" onPress={approve}>
<Icon name="check" size={25} color={theme.colors.darkBlue} />
  </Button><Icon name={checked ? "chevron-up" : "chevron-down"}  size={25} style={styles.arrow} color={theme.colors.medBlue} />
  
  </View>
  <TextInput
        label="Comments"
        returnKeyType="next"
        value={comment}
        onChangeText={text => setComment(text)}
        autoCapitalize="none"
      />

        <View style={checked ? styles.taskList : styles.expandedContainerHide}>
        {taskList}</View>
        
      </View>
  </TouchableOpacity>
  </View>
   );
};
export default memo(AdminListItem);
