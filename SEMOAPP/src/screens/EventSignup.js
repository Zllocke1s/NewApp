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
import { TextInput } from "react-native";
import Avatar from '../components/Avatar';



const EventSignup = ({ navigation }) => {

  const { user } = navigation.state.params.user;
  const { event } = navigation.state.params.event;
  const { data } = navigation.state.params.data;

  console.log("DATA: " + JSON.stringify(data));
  console.log("HERE");
  const [advTasks, setAdvTasks] = React.useState(null);


  var specialTasks;
  const [show, setShow] = React.useState(false);

  const [formattedAdvTasks, setFormattedAdvTasks] = React.useState(null);

  const [details, setDetails] = React.useState(event.Details);

  const [workers, setWorkers] = React.useState(event.Workers.split("&").join(", "));


  const [submit_button, setSubmit_button] = React.useState(null);

  const [heading, setHeading] = React.useState(null);


  var complete = false;


  const avatarList = () => {
    console.log("Workers: " + event.Workers.split("&"));
    return(event.Workers.split("&").map((worker) => {
      console.log(worker);
      var curUser = data.find(el => el.screenName === worker);
      console.log(JSON.stringify(curUser));
      if(curUser!=null)
      {
        return(<Avatar url={curUser.profilePicURL} user={"This is an unnecessary Username I think"} size={60}/>)
        //console.log("CURUSER: " + JSON.stringify(curUser.profilePicURL));
      }
    }))
    
  
  }

  function submit() {
    console.log(event.EID);
    var workersList;
    if(event.Workers.split("&").indexOf(user.screenName)==-1)
    {
      workersList = event.Workers + user.screenName + "&";
    }
    else
    {
      workersList = event.Workers;
    }
    console.log(workersList);
    console.log('http://outpostorganizer.com/SITE/api.php/records/Calendar/' + event.EID + '?camp=' + user.Home);
    fetch('http://outpostorganizer.com/SITE/api.php/records/Calendar/' + event.EID + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        Details: details,
        Workers: workersList
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
  }


  
  function submitAsAdmin() {
    var workerList = "";

    if(workers.split(" ").join("")!="")
    {
      
    console.log('http://outpostorganizer.com/SITE/api.php/records/Calendar/' + event.EID + '?camp=' + user.Home);
    
    if(workers.slice(-1)==" ")
    {
      workerList = workers.slice(0, -1).split(", ").join("&").split(",").join("&")
    }
    else
    {
      workerList = workers.split(", ").join("&").split(",").join("&");
    }
    if(workerList.slice(-1)!="&")
    {
      console.log("Workerlist slice: " + workerList.slice(-1))
      workerList = workerList + "&"
    }
    
  }
    fetch('http://outpostorganizer.com/SITE/api.php/records/Calendar/' + event.EID + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        Details: details,
        Workers: workerList
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
      
      <View style={styles.headCont}>
    <Text style={styles.welcome}>{event.Title}</Text><View style={{alignSelf: "center", margin: 10, flex: 1, justifyContent: "space-evenly", flexDirection: "row", display: "flex", width: 130}}>{avatarList()}</View>
    </View>
    <View style={styles.ListBox}>
      <View style={styles.inputContainer}><View style={user.isAdmin==1 ? styles.inputContainer : styles.inputContainerHidden}><View>
      <Text style={styles.inputLabel}>Signed Up:</Text></View>
      <TextInput multiline={false}
        style={styles.input}
        placeholder="Matthew, Mark, John"
        value={workers}
        returnKeyType="done"
        onChangeText={text => setWorkers(text)
      }
      /></View>
      <View>
      <Text style={styles.inputLabel}>Details:</Text></View>
      <TextInput multiline={false}
        style={styles.input}
        placeholder="Insert Details Here"
        value={details}
        returnKeyType="done"
        onChangeText={text => setDetails(text)
      }
      /></View><View style={styles.buttonHolder}>
        <Button style={styles.deny} mode="outlined" onPress={ () => {
        navigation.state.params.onGoBack();
        navigation.goBack(); 
      }}><Text style={{color: "#000000"}}>Cancel</Text></Button>
    <Button style={styles.submit} mode="outlined" onPress={ () => {
      if(user.isAdmin==1)
      {
        submitAsAdmin();
      }
      else
      {
        submit();
      }
      
    }}><Text style={{color: "#000000"}}>Submit</Text></Button>
    </View></View></View>
   ) };
};

export default memo(EventSignup);
