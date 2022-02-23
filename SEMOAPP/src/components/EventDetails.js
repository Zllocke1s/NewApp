import { memo, useEffect } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckCircle from './CheckCircle';
import Avatar from '../components/Avatar';
import AvatarPlaceholder from '../components/AvatarPlaceholder';

const EventDetails = ({ onPress, user, event, onclick, ...props }) => {
  
  var load=true;
console.log(JSON.stringify(event));

function pressedButton()
{
  onPress(event, user, data);
}

global.bubbleColor = theme.colors.gray;

const [checked, setChecked] = React.useState(false);

const [data, setData] = React.useState([]);

function marked() {
  setChecked(!checked);
  console.log("KEY: " + key);
  //onclick();

}


const fetchData = () => {
  return fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + user.Home, {
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

if(load)
  {
    load = false;
  }

if(event.Workers.split("&").length==1)
    {
      
       global.bubbleColor = theme.colors.lightRed;
    }
    else if(eval(event.amountOfWorkers) + 1 - event.Workers.split("&").length <= 0)
    {
      global.bubbleColor = theme.colors.lightGreen;
    }
    else
    { 
      global.bubbleColor = theme.colors.yellow;
    }

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
    fontSize: 30,
    color: theme.colors.black,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Regular",    
    alignSelf: "flex-start",
    flex: 0.5,

  },subHeader: {
    fontSize: 16,
    color: theme.colors.black,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Regular",    
    alignSelf: "flex-start",
    flex: 0.5

  },
  peopleContainer: {
   color: theme.colors.black,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Regular",    
    alignSelf: "flex-start",
    flex: 0.3,
    display: "flex",
    flexDirection: "column"

  },
  headerChecked: {
    fontSize: 35,
    color: theme.colors.black,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",    
    textAlignVertical: "center",
    marginLeft: 10,
    alignSelf: "flex-start",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    flex: 0.8

  },
  countText: {
    fontFamily: "SulphurPoint-Regular",    
    fontSize: 24,

  },
  bubbleCont:
  {
    flexDirection: "row", display: "flex",
    width: 100,
  },
  container:
  {
    textAlignVertical: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.darkBlue,
    borderWidth: 1,
    alignSelf: 'stretch',
    marginTop: 5,
    justifyContent: "space-between",
    paddingRight: 10,
    borderRadius: 10,
    padding: 5, 
    paddingTop: 20,
    paddingLeft: 20,
    textAlignVertical: "center"

  },
  containerHidden:
  {
    display: 'none'
  },
  checkbox:
  {
    
  },
  countCont:
  {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: -10,
    marginBottom: 10,
  }
  ,
  items:
  {width: 40, height: 40, borderRadius: 500, borderColor: theme.colors.black,
    display: "flex",
    flexDirection: "row",
    flex: 0.2,
    marginBottom: 0,
    backgroundColor: theme.colors.medGreen,

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
  textContainer:
  {
    fontSize: 30,
    color: theme.colors.black,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Regular",    
    alignSelf: "flex-start",
    flex: 0.5
  }

  
});



//<Avatar url={"https://solidstarts.com/wp-content/uploads/when-can-babies-eat-eggs-480x320.jpg"} user={"Frank"} size={30}/>

const avatarList = () => {
  console.log("Workers: " + event.Workers.split("&"));
  return(event.Workers.split("&").map((worker) => {
    var curUser = data.find(el => el.screenName === worker);
    
    if(curUser!=null)
    {
        return(<Avatar url={curUser.profilePicURL} user={"This is an unnecessary Username I think"} size={35}/>)
      
      //console.log("CURUSER: " + JSON.stringify(curUser.profilePicURL));
    }
    else if(worker!="")
    {
      return(<AvatarPlaceholder user={worker} size={35} /> )
    }
  }))
  

}
return (
  <TouchableOpacity onPress={pressedButton} style={styles.container}>
    <View style={{width: 40, height: 40, borderRadius: 500, borderColor: theme.colors.black,
    display: "flex",
    flexDirection: "row",
    flex: 0.1,
    marginBottom: 0,
    backgroundColor: theme.colors.medGreen, backgroundColor: global.bubbleColor}}></View>
    <View style={styles.textContainer}>
    <Text style={styles.header}>
      {event.Title}
    </Text>
    <Text style={styles.subHeader}>
      {event.Time=="00:00:00" ? "" : event.Time}
    </Text>
    </View>
    <View style={styles.peopleContainer}>
    <View style={styles.countCont}><Text style={styles.countText}>{event.Workers.split("&").length-1}/{event.amountOfWorkers}</Text></View>
    <View style={styles.bubbleCont}>{avatarList()}</View></View>

  </TouchableOpacity>
  );
};
export default memo(EventDetails);
