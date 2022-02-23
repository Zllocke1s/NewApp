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
import { styles } from '../styles/SendMessengerStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ComplexListItem from '../components/ComplexListItem';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import axios from 'axios';
import { render } from 'react-dom';
import MessageItem from '../components/MessageItem';
import { TouchableOpacity } from 'react-native';
import MessageUserSelect from '../components/MessageUserSelect';
import TextInput from '../components/TextInput';



const SendMessenger = ({ navigation }) => {

  const { user } = navigation.state.params.user;
  const { reply } = navigation.state.params.reply;


  const [messages, setMessages] = React.useState(null);
  const [formattedMessages, setFormattedMessaages] = React.useState(null)
  const [users, setUsers] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [formattedUsers, setFormattedUsers] = React.useState(null);
  const [selectedUsers, setSelectedUsers] = React.useState([])


  var replyVar = reply

  useEffect(() => {
    console.log(selectedUsers)
  }, [selectedUsers])

  function selectUser(isIn, cUser) {
    if(isIn)
    {
      setSelectedUsers(oldArray => [...oldArray, cUser.UID])
    }
    else
    {
      setSelectedUsers(selectedUsers.splice(selectedUsers.indexOf(cUser.UID), 1))
    }
  }
 
  useEffect(() => {
    fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
    setUsers(responseJson.records);
    setFormattedUsers(responseJson.records.map(function(item, index) {
     console.log("item.screenName==navigation.state.params.reply.replier : " + item.screenName==navigation.state.params.reply)
     console.log(item.screenName + " == " + navigation.state.params.reply)
      if((item.screenName==navigation.state.params.reply))
      {
        setSelectedUsers(oldArray => [...oldArray, item.UID])
      }
     return (<MessageUserSelect startChecked={item.screenName==navigation.state.params.reply ? "true" : "false"} select={selectUser} user={item} />)
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
  navigation.state.params.onGoBack();
  navigation.goBack();
}

function send() {
  console.log(JSON.stringify(selectedUsers))
  var jsonBody={sender: user.screenName, recipient: selectedUsers.join("&"), message: message, date: (new Date()).toDateString(), time: ((new Date()).getHours() + ":" + (new Date()).getMinutes()) + ":" + (new Date()).getSeconds()}
  console.log(JSON.stringify(jsonBody))
  fetch('http://outpostorganizer.com/SITE/api.php/records/Messages/?camp=' + user.Home, {
        method: 'POST',
        body: JSON.stringify(jsonBody)
      })
     .then((response) => response.json())
     .then((responseJson) => {
      fetch('http://outpostorganizer.com/SITE/api.php/records/Users?camp=' + user.Home, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
      selectedUsers.map((userIDToMsg, index) => {
        console.log(responseJson)
        var thisUser = responseJson.records.find(el => el.UID === userIDToMsg);
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            host: "exp.host",
            accept: "application/json",
            "accept-encoding": ["gzip", "deflate"],
            "content-type": "application/json"
          },
          body: JSON.stringify({
            to: thisUser.pushToken,
            title: "New Message From " + user.screenName,
            message: "New Message From " + user.screenName
        })
        })
       .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson.records == []);
          console.log("Token Response: " + JSON.stringify(responseJson));   
      })     
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
      console.log(responseJson.records == []);
       console.log("Feedback Response: " + JSON.stringify(responseJson));     
      })
    })
     })
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
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

<Text style={styles.welcomeDetail}>Send Message</Text>    
    
    <View borderwidth={1} style={styles.ListBox}>
    <Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Cancel</Text>
  </Button> 
<View style={styles.messageContainer}>
  <View style={styles.scrollViewContainer}>
      <ScrollView contentContainerStyle={styles.nameScrollView}>
        {formattedUsers}
      </ScrollView></View><View style={styles.inputContainer}><TextInput
        style={styles.input}
        placeholder="Message"
        multiline={true}
        onChangeText={text => setMessage(text)}
        defaultValue={message}
      /></View></View>
          <Button style={styles.submit} mode="outlined" onPress={send}>
      <Text style={styles.submit} >Send</Text>
  </Button> 


  </View>
    </View>
   ) };
};

export default memo(SendMessenger);
