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


const ComplexListItem = ({ aroma, wineNum, adv, sugarRating, acidRating, bodyRating, tanninRating, alcoholRating, title, people, style, tasks, children, ...props }) => {
var advList;
  
const open = () => {
  setChecked(!checked);
}

const list = () => {
  setSite(!showSite);
}

const openWindow = () => {
  console.log("OpenWindow");
  console.log("wineNum from CLI: " + wineNum);
  adv(title, wineNum);
  }

  const findSite = () => {
    
    find(title, wineNum);
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
    fontSize: 22,
    color: theme.colors.darkBlue,
    textAlign: 'right',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    textAlignVertical: "bottom",
    overflow: "visible"
    
  },
  findedText: {
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
    paddingTop: 20,
    color: theme.colors.primary,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 0.8,
    textAlignVertical: "bottom"
  },
  aroma: {
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 1,
  },
  header2: {
    fontSize: 34,
    lineHeight: 24,
    paddingTop: 20,
    color: theme.colors.primary,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 0.1,
    textAlignVertical: "bottom"
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
    paddingTop: 3,
    paddingLeft: 4,
    paddingRight: 4,
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
    paddingTop: 15,
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
    marginTop: 20,
    marginBottom: 15,
    flex: 1,
    width: "100%"
  },
  textContainer:
  {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 0,
    marginBottom: 35,
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
  
  barA:
  {
    width: Math.round(sugarRating) + "%",
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barB:
  {
    width: Math.round(acidRating) + "%",
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barC:
  {
    width: Math.round(bodyRating) + "%",
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barD:
  {
    width: Math.round(tanninRating) + "%",
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barE:
  {
    width: Math.round(alcoholRating) + "%",
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  
  barBackground:
  {
    width: "80%",
    marginLeft: 5,
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  barContainer:
  {
    width: "100%",
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexDirection: "row",
    
  },
  
  deniedCommentsContainer:
  {
    width: "100%",
    backgroundColor: theme.colors.white,
    borderRadius: 4,
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  deniedText:
  {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Regular",    
    flex: 0.5,
    textAlignVertical: "bottom"
  },
  deniedTextHeader:
  {
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 0.5,
    textAlignVertical: "bottom"
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
find: {
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
}
  
});


return (
  <View style={styles.container}>
 
  <TouchableOpacity activeOpacity={1.0} style={styles.container} onPress={open}>
  
  <View style={styles.textContainer}>
      <Text style={styles.header}>{title}</Text><Text style={styles.header2}>{checked ? "-" : "+"}</Text></View>
  <View style={[checked ? styles.expandedContainer : styles.expandedContainerHide ]}>
  <View style={styles.barContainer}>
  <MaterialCommunityIcons name="spoon-sugar" color={theme.colors.darkBlue} size={30}/>
    <View style={styles.barBackground}>
      <View style={styles.barA}>
        <Text></Text>
        </View>
      </View>
    </View>
    <View style={styles.barContainer}>
  <MaterialCommunityIcons name="flask" color={theme.colors.darkBlue} size={30}/>
    <View style={styles.barBackground}>
      <View style={styles.barB}>
        <Text></Text>
        </View>
      </View>
    </View>
    <View style={styles.barContainer}>
  <MaterialCommunityIcons name="human" color={theme.colors.darkBlue} size={30}/>
    <View style={styles.barBackground}>
      <View style={styles.barC}>
        <Text></Text>
        </View>
      </View>
    </View>
    <View style={styles.barContainer}>
  <MaterialCommunityIcons name="cactus" color={theme.colors.darkBlue} size={30}/>
    <View style={styles.barBackground}>
      <View style={styles.barD}>
        <Text></Text>
        </View>
      </View>
    </View>
    <View style={styles.barContainer}>
  <MaterialCommunityIcons name="bottle-wine" color={theme.colors.darkBlue} size={30}/>
    <View style={styles.barBackground}>
      <View style={styles.barE}>
        <Text></Text>
        </View>
      </View>
    </View>
    <View style={styles.textContainer}>
    <Text style={styles.aroma}>Aroma: {aroma}</Text>
    </View>
    <View style={styles.buttonContainer}><Button style={styles.join} mode="outlined" onPress={openWindow}>
      <Text style={styles.join} >Catalog</Text>
  </Button><Button style={styles.find} mode="outlined" onPress={findSite}>
      <Text style={styles.find} >Find</Text>
  </Button></View>
        <View style={[checked ? styles.line : styles.lineHidden ]}>
        </View>
        
      </View>
  </TouchableOpacity>
  </View>
   );
};
export default memo(ComplexListItem);
