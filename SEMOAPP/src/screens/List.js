import React, { memo, useReducer, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import AdvElement from '../components/AdvElement';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/ListStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ComplexListItem from '../components/ComplexListItem';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import Details from './Details';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ConfettiCannon from 'react-native-confetti-cannon';
import GraphBar from '../components/GraphBar';




const List = ({ navigation, user, load }) => {

  const [sList, setSList] = React.useState(0);

  const [advTasks, setAdvTasks] = React.useState(null);

  const [formattedAdvTasks, setFormattedAdvTasks] = React.useState(null);

  const [heading, setHeading] = React.useState(null);

  const [showAdv, setADV] = React.useState(false); //Announcement Box trigger

  const [formattedComplexTasks, setFormattedComplexTasks] = React.useState(null)

  const [data, setData] = useState([]);

  const [Ccomplete, setCComplete] = React.useState(false); 

  const [percent, setPercent] = React.useState(0);

  const confettiTime = () => {
    setCComplete(!Ccomplete);
    setTimeout(() => {
      setCComplete(false);
      console.log("Removing Confetti");
      
    }, 20000);
  }

//FUNCTION IS INCOMPLETE.  SEE LINE 112 FOR MORE DETAILS
  function checkItem(checkedItem, checked, pos) {
    console.log(checkedItem + " is " + (checked ? "checked." : "unchecked."));
  //  console.log(advTasks.toString());
    if(advTasks==null)
    {
      setAdvTasks(data.find(el => el.SID === pos).tempTasks.split("& "));
      console.log(advTasks);
      console.log(data.find(el => el.SID === pos).tempTasks.split("& "));
    }
    if(checked)
    {
      console.log("CheckedItem: " + checkedItem);
      console.log("advTasks: " + advTasks);
      console.log("indexOf: " + advTasks.indexOf(checkedItem));
    var index = advTasks.indexOf(checkedItem);
    if (index > -1) {
      setAdvTasks(advTasks.splice(index, 1));
    }
  }
  else
  {
    setAdvTasks(advTasks.push(checkedItem));
  }
  console.log(advTasks);
    console.log(advTasks.toString());
    console.log("http://outpostorganizer.com/SITE/api.php/records/Spots/" + pos + "?camp=" + user.Home);
    var stringTasks = advTasks.toString();
    //a.split(":").join("hi")
    var formattedStringTasks = stringTasks.split(",").join("& ");
  
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + pos + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        tempTasks: formattedStringTasks,
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log(responseJson);       
      })
      
      .catch((error) => {
         console.error(error);
      });
      
  }


  if(load)
  {
    load = false;
  }
  
  useEffect(() => {
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("called");
    setData(responseJson.records);
    var total = 0;
    var totalTemp = 0;
    for (let spot of responseJson.records) {
      total = total + spot.tasks.split("& ").length;
      totalTemp = totalTemp + spot.tempTasks.split("& ").length;
    }
    console.log("Total: " + total);
    console.log("Total Temp: " + totalTemp);
    setPercent(((total-totalTemp)/total) * 100)
    setFormattedComplexTasks(responseJson.records.map(function(item, index) {
      if(item.status==sList)
      {
      return (<ComplexListItem logs={item.logs} claim={claimSite} denied={item.denied} siteNum={item.SID} adv={advanced2} progress={(((item.tasks.split("& ").length - item.tempTasks.split("& ").length)*100)/item.tasks.split("& ").length).toString() + "%"} title={item.site_Name} people={item.usersWorking.split("&").length-1} siteOwner={item.siteOwner==null ? null : item.siteOwner.slice(0, -2)} tasks={item.tempTasks.split("& ")}/>);}
      }))
    //console.log(data);
  }
    //console.log(data);
   )
  }, [load]);

  useEffect(() => {
    setFormattedComplexTasks(data.map(function(item, index) {
      if(item.status==sList)
      {
      return (<ComplexListItem logs={item.logs} claim={claimSite} denied={item.denied} siteNum={item.SID} adv={advanced2} progress={(((item.tasks.split("& ").length - item.tempTasks.split("& ").length)*100)/item.tasks.split("& ").length).toString() + "%"} title={item.site_Name} people={item.usersWorking.split("&").length-1} siteOwner={item.siteOwner==null ? null : item.siteOwner.slice(0, -2)} tasks={item.tempTasks.split("& ")}/>);}
      }))
      
  }, [data])

  //Nova helped me figure it out :)
  function onReturn() {
    
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("called");
    setData(responseJson.records);
    var total = 0;
    var totalTemp = 0;
    for (let spot of responseJson.records) {
      total = total + spot.tasks.split("& ").length;
      totalTemp = totalTemp + spot.tempTasks.split("& ").length;
    }
    console.log("Total: " + total);
    console.log("Total Temp: " + totalTemp);
    setPercent(((total-totalTemp)/total) * 100)
    if((((total-totalTemp)/total) * 100 )== 100)
    {
      confettiTime()
    }
    setFormattedComplexTasks(responseJson.records.map(function(item, index) {
      if(item.status==sList)
      {
      return (<ComplexListItem claim={claimSite} denied={item.denied} siteNum={item.SID} adv={advanced2} progress={(((item.tasks.split("& ").length - item.tempTasks.split("& ").length)*100)/item.tasks.split("& ").length).toString() + "%"} title={item.site_Name} people={item.usersWorking.split("&").length-1} siteOwner={item.siteOwner==null ? null : item.siteOwner.slice(0, -2)} tasks={item.tempTasks.split("& ")}/>);}
      }))
    //console.log(data);
  } )
  
  }

  var complete = false;


  function advanced3(title, siteNumb)
  {

    navigation.navigate('AdminList', {user: {user}, load: true,  onGoBack: () => onReturn(), });
  }

  function advanced2(title, siteNumb)
  {

    navigation.navigate('Details', {siteNum: siteNumb, siteName: title, user: {user}, load: true,  confetti: () => confettiTime(), onGoBack: () => onReturn(), });
  }

  function claimSite(title, siteNumb)
  {
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNumb + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        siteOwner: user.screenName + ", ",
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log(responseJson);       
      })
      
      .catch((error) => {
         console.error(error);
      });

      onReturn();

  //  navigation.navigate('Details', {siteNum: siteNumb, siteName: title, user: {user}, load: true,  onGoBack: () => onReturn(), });
  }


  function advanced(title)
  {
    console.log("advanced")
    //From Title, get list data.
   // setADV(!showAdv);
    var tasks = data.find(el => el.site_Name === title);
   // setHeading(title);
    //setAdvTasks(tasks.tempTasks.split("& "));
    console.log("Title Before Nav: " + title);
    navigation.navigate('Details', {siteName: title, user: {user}    })

    console.log("Called on launch: " + advTasks);
    /*The line above this uses a react hook which function asyncronously from the rest of the code.
    This is causing errors where it is being referenced before it is instantiated.
    To fix this, we need to use the React UseEffect on the change of this variable to access it.  
    I'm not entirely sure what that will look like, but my head hurts so I'm taking a break.
    Good luck future Zach.

    Link: https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    Another link with maybe solution?: https://medium.com/ableneo/react-setstate-does-not-immediately-update-the-state-84dbd26f67d5
    

    */

    
    console.log(advTasks);  
    setFormattedAdvTasks(tasks.tempTasks.split("& ").map((task, index) => { 
      console.log(task);
      return( 
      <AdvElement index={tasks.SID} startChecked={false} onclick={checkItem} title={task}/> )  }));
  }

  
  

    
//This is what pulls the data from the api to the app.  It runs every tick, which really bogs down the speed.
//To-Do: Find a way to create a sql listener.



  function close() {
    setADV(false);
  }

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    
  return (
    
    
    <View style={styles.container}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

    <Text style={styles.welcome}>{user.screenName}</Text>
    
    
    <View borderwidth={1} style={styles.ListBox}>
    <View style={[showAdv ? styles.advBoxShow : styles.advBoxHide]}>
    <View style={styles.buttonHolder}>
    <Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Leave</Text>
  </Button> 
  <Button style={complete? styles.showCompleteButton : styles.hideCompleteButton} mode="outlined"><Text style={styles.showCompleteButton} >Submit</Text>
</Button>
</View>
      <Text style={styles.ListHeading}>{heading}
      </Text>
      <ScrollView contentContainerStyle={styles.advScrollView}>
        {formattedAdvTasks}
      </ScrollView>
    </View>


 
  <View style={styles.buttonHolder}>
    <Text style={styles.ListHeading}>Your Wines</Text>


{/*<Button onPress={confettiTime} style={user.isAdmin==1 ? styles.nextB : styles.hideCompleteButton} mode="outlined"><Icon name="pizza-slice" size={25} color={theme.colors.lightGreen} /></Button>
  */}
</View>
    <ScrollView keyboardShouldPersistTaps='always' style={{width: '100%', paddingLeft: 20,paddingRight: 20,}} contentContainerStyle={{width: '100%'}}>
    <View style={styles.scrollViewContainer}>
      {/*Todo: Find way to show selected checkable list */}
      {formattedComplexTasks}
   {/* <ComplexListItem adv={advanced} progress="42%" title="Dining Hall" people="3" tasks={task1()}/>    */}
    </View>
    </ScrollView></View>{Ccomplete ? 
    <View pointerEvents="none" style={{position: "absolute", zIndex: 1000, bottom: 0, top: 0, left: 0, width: "100%" }}><ConfettiCannon
      count={400}
      origin={{x: 200, y: 0}} 
      explosionSpeed={1000}
      fallSpeed={3500}
      fadeOut={false}
    /></View>  
    : null
  }
    </View>
   ) };
};

export default memo(List);
