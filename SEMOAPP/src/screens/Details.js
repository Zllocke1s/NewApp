import React, { memo, useReducer, useRef, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import AdvElement from '../components/AdvElement';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/DetailStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ComplexListItem from '../components/ComplexListItem';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import axios from 'axios';
import { render } from 'react-dom';




const Details = ({ navigation }) => {

  const { user } = navigation.state.params.user;
  var site = navigation.state.params.siteName;
  var siteNum = navigation.state.params.siteNum;
  
  console.log("Site: " + site);
  const [advTasks, setAdvTasks] = React.useState(null);


  var specialTasks;
  const [show, setShow] = React.useState(false);

  const [formattedAdvTasks, setFormattedAdvTasks] = React.useState(null);


  const [submit_button, setSubmit_button] = React.useState(null);

  const [heading, setHeading] = React.useState(null);




  const fetchData = async () => {
    const response = await axios.get(
      'http://outpostorganizer.com/SITE/api.php/records/Spots?camp=' + user.Home
    );


    setData(response.data.records);
    setHeading(site);
  //  console.log("RESPONSE.data: " + JSON.stringify(response.data));
    var tasks = response.data.records.find(el => el.site_Name === site);
  //  console.log("Async Tasks" + tasks);
    setAdvTasks(advTasks => tasks.tempTasks) ;
    global.itemCounter = (tasks.tempTasks.split("&").length);
    global.specialTasks = tasks.tempTasks;
    global.awardPoints = tasks.awardPoints;
    global.siteInfo = tasks;
    global.siteOwner = tasks.siteOwner;
    console.log(global.siteInfo.usersWorking.split("&"));
    console.log(user);
    console.log(global.siteInfo.usersWorking.split("&").indexOf(user.screenName));
    if(global.siteInfo.usersWorking.split("&")==1 || global.siteInfo.usersWorking.split("&").indexOf(user.screenName)==-1) //user is appended to site
    {
      console.log("You are the " + (global.siteInfo.usersWorking.split("&").length) + " person to join.");
      var formattedUsersW = global.siteInfo.usersWorking + user.screenName + "&";
      console.log('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNum + '?camp=' + user.Home);
      fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNum + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        usersWorking: formattedUsersW,
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Response: " + responseJson);  
         
      })
      
      .catch((error) => {
         console.error(error);
      });
    }
    else //user is in site
    {
      console.log("You are the " + (global.siteInfo.usersWorking.split("&").indexOf(user.screenName)+1) + " person to join.");
    }
    setFormattedAdvTasks(tasks.tempTasks.split("& ").map((task, index) => { 
 //   console.log(task);
//    console.log("INDEX: " + index);

    return( 
    <AdvElement tasks={tasks.tempTasks} status={tasks.status} site={tasks.SID} key={index} startChecked={false} onclick={checkItem} title={task}/> )  }));
 //   console.log("Successfully pulled: " + response.data);
  };

  const [data, setData] = React.useState([]);
  var complete = false;


  function submit() {
    console.log(siteNum);
    var tasks = data.find(el => el.site_Name === site);
    var usersw = global.siteInfo.usersWorking;
    var formattedUsersW = usersw.split("&").splice(usersw.split("&").indexOf(user.screenName)).join("&");
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNum + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        status: 1,
        usersWorking: formattedUsersW,
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Response: " + responseJson);  
     
        navigation.state.params.onGoBack();
//        navigation.state.params.confetti();
        navigation.goBack();     
      })
      
      .catch((error) => {
         console.error(error);
      });
  }

//FUNCTION IS INCOMPLETE.  SEE LINE 112 FOR MORE DETAILS
  function checkItem(index, checkedItem, checked, site, allTasks) {
    

    console.log(checkedItem + " is " + (checked ? "checked." : "unchecked."));
  //  console.log(advTasks.toString());
 // console.log("passedAdvTasks: " + allTasks);
  //console.log("data: " +JSON.stringify(data));


 
    if(checked)
    {
      console.log("RESPONSE.RECORDS");
      console.log("CheckedItem: " + checkedItem);
      console.log("advTasks: " + JSON.stringify(global.specialTasks));
      console.log("Index: " + global.specialTasks.split("& ").indexOf(checkedItem));
      var formattedStringTasks = global.specialTasks.split("& ");
      formattedStringTasks.splice(global.specialTasks.split("& ").indexOf(checkedItem), 1);
      formattedStringTasks = formattedStringTasks.join("& ");
      console.log("Updated ADVTasks: \"", formattedStringTasks, "\"")
      console.log("advTasksSIze" + global.specialTasks.length);
      global.itemCounter = global.itemCounter - 1;
      console.log("Items Remaining: " + global.itemCounter);
      if(global.itemCounter==0)
    {
      console.log("SetSubmit Called");
      setSubmit_button(() => {
        return(<Button onPress={submit} style={styles.showCompleteButton} mode="outlined"><Text style={styles.showCompleteButton} >Submit</Text>
        </Button>);
      })
    }
    else
    {
      console.log("Global itemcounter: " + global.itemCounter);
    }

      //      console.log("advTasks index: " + JSON.stringify(allTasks).split(',').indexOf(JSON.stringify(checkedItem)));
//      console.log("indexOf: " + index);
//      console.log("Pos: " + site);
  }
  else
  {
    setAdvTasks(global.specialTasks.push(checkedItem));
  }     
 // console.log(allTasks);
 //   console.log(allTasks.toString());
 //   console.log("http://outpostorganizer.com/SITE/api.php/records/Spots/" + site + "?camp=" + user.Home);
    //a.split(":").join("hi")
  
    global.specialTasks = formattedStringTasks;
    //console.log('http://outpostorganizer.com/SITE/api.php/records/Spots/' + site + '?camp=' + user.Home);
  //  console.log(formattedStringTasks);
  console.log("Global awardpoints: " + (global.awardPoints));
  console.log("screenName: " + (user.screenName + "&"));
  global.awardPoints = global.awardPoints + user.UID + "&";
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + site + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        tempTasks: formattedStringTasks,
        awardPoints: (global.awardPoints)
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Award and temp task update Response: " + responseJson);       
      })
      
      .catch((error) => {
         console.error(error);
      });
      
  }


  useEffect(() => {

    console.log("UseEffect Start Call");
    fetchData();
    
    /*fetch('http://outpostorganizer.com/SITE/api.php/records/Spots?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    setData(responseJson.records);
    console.log(data);
    console.log("UseEffect Called");
  })  
*/

  }, [] ); 



  useEffect(() => {
   // console.log("Use Effect Data: " + data);
    setShow(show ? false: true);
  }, [data])
 
  function advanced(title)
  {
    console.log("advanced")
    //From Title, get list data.
    console.log((data));
    var tasks = data.find(el => el.site_Name === title);
    setHeading(title);
    console.log("Data: " + data);
    console.log("Heading set as " + title);
    //setAdvTasks(tasks.tempTasks.split("& "));
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
    
  }

  
  

    
//This is what pulls the data from the api to the app.  It runs every tick, which really bogs down the speed.
//To-Do: Find a way to create a sql listener.


  function send() {
    console.log(global.specialTasks);
  }

  function close() {
    var tasks = data.find(el => el.site_Name === site);
    var usersw = global.siteInfo.usersWorking;
    console.log(usersw);
    console.log(usersw.split("&").indexOf(user.screenName));
    var formattedUsersW = usersw.split("&").splice(usersw.split("&").indexOf(user.screenName) + 1).join("&");
    console.log("you are leaving " + JSON.stringify({
      usersWorking: formattedUsersW,
    }));
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNum + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        usersWorking: formattedUsersW,
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Response: " + responseJson);  
     
        navigation.state.params.onGoBack();
        navigation.goBack();     
      })
      
      .catch((error) => {
         console.error(error);
      });
    navigation.state.params.onGoBack();
    navigation.goBack();
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
    
    
    <View style={show ? styles.container : styles.containerShow}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

<Text style={styles.welcomeDetail}>{heading}</Text>
<Text style={styles.welcomeSubDetail}>{global.siteOwner == null ? "Unclaimed" : global.siteOwner}</Text>
    
    
    <View borderwidth={1} style={styles.ListBox}>
    <View style={[styles.advBoxShow]}>
    <View style={styles.buttonHolder}>
    <Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Leave</Text>
  </Button> 
  {submit_button}
</View>
      <ScrollView contentContainerStyle={styles.advScrollView}>
        {formattedAdvTasks}
      </ScrollView>
    </View>


  </View>
    </View>
   ) };
};

export default memo(Details);
