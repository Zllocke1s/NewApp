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
import { styles } from '../styles/MessengerStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ComplexListItem from '../components/ComplexListItem';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import axios from 'axios';
import { render } from 'react-dom';
import MessageItem from '../components/MessageItem';




const Messenger = ({ navigation }) => {

  const { user } = navigation.state.params.user;

  const [messages, setMessages] = React.useState(null);
  const [formattedMessages, setFormattedMessaages] = React.useState(null)

  function newMessage() {
    navigation.navigate('SendMessenger', {user: {user}, reply: "", onGoBack: () => itemGoBack()});
  }

  function replySend(replier) {
    console.log("replier : " + replier)
    navigation.navigate('SendMessenger', {user: {user}, reply: replier, onGoBack: () => itemGoBack()});
  }

  function itemGoBack() 
  {
    console.log("GoBack")
      fetch('http://outpostorganizer.com/SITE/api.php/records/Messages?camp=' + user.Home, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
    //  console.log(responseJson);
    console.log("called");
      setMessages(responseJson.records);
      setFormattedMessaages(responseJson.records.map(function(item, index) {
        if(item.recipient.split('&').includes(user.UID))
        {
        return (<MessageItem replyCall={replySend} camp={user.Home} loadList={itemGoBack} message={item} />)
        }
      }))
    })
  }


  useEffect(() => {
    fetch('http://outpostorganizer.com/SITE/api.php/records/Messages?camp=' + user.Home + "&order=date,ascd, time", {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("called");
    setMessages(responseJson.records);
    setFormattedMessaages(responseJson.records.map(function(item, index) {
      if(item.recipient.split('&').includes(user.UID))
      {
      return (<MessageItem replyCall={replySend} camp={user.Home} loadList={itemGoBack} message={item} />)
      }
    }))
  })
    //console.log(data);
    
    //console.log(data);

  }, []);

//const [heading, setHeading] = React.useState(null);




 
// function submit() {
//     console.log(siteNum);
//     var tasks = data.find(el => el.site_Name === site);
//     var usersw = global.siteInfo.usersWorking;
//     var formattedUsersW = usersw.split("&").splice(usersw.split("&").indexOf(user.screenName)).join("&");
//     fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNum + '?camp=' + user.Home, {
//       method: 'PUT',
//       body: JSON.stringify({
//         status: 1,
//         usersWorking: formattedUsersW,
//       })
//       })
//      .then((response) => response.json())
//      .then((responseJson) => {
//         console.log("Response: " + responseJson);  
     
//         navigation.state.params.onGoBack();
//         navigation.goBack();     
//       })
      
//       .catch((error) => {
//          console.error(error);
//       });
//   }

//FUNCTION IS INCOMPLETE.  SEE LINE 112 FOR MORE DETAILS
 
  useEffect(() => {

    console.log("UseEffect Start Call");
    
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


  

  function close() {
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
    
    
    <View style={styles.container}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

<Text style={styles.welcomeDetail}>Messenger</Text>    
    
    <View borderwidth={1} style={styles.ListBox}>
    <View style={styles.buttonHolder}>
    <Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Leave</Text>
  </Button> 
  <Button style={styles.leave} mode="outlined" onPress={newMessage}>
      <Text style={styles.leave} >New</Text>
  </Button> 
</View>
<View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.advScrollView}>
        {formattedMessages}
      </ScrollView></View>
  </View>
    </View>
   ) };
};

export default memo(Messenger);
