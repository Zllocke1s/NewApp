import React, { memo, useReducer, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import AdvElement from '../components/AdvElement';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/ProfileStyle';
import { Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ProfileModule from '../components/ProfileModule';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import Avatar from '../components/Avatar';
import { TextInput } from "react-native";
import * as Crypto from 'expo-crypto';
import { sha256 } from 'react-native-sha256';
import * as SecureStore from 'expo-secure-store';


const Profile = ({ navigation, user }) => {




  const [screenName, setScreenName] = React.useState(user.screenName);

  function setWineName(name) {
    global.wineName = name;
  }

  function setSweetness(name) {
    global.sweetness = name;
  }

  function setAcidity(name) {
    global.acidity = name;
  }

  function setWBody(name) {
    global.Wbody = name;
  }

  function setTannins(name) {
    global.tannins = name;
  }

  function setAlcohol(name) {
    global.alcohol = name;
  }

  function setAroma(name) {
    global.aroma = name;
  }

  const [email, setEmail] = React.useState(user.recoveryEmail);
  const [pic, setPic] = React.useState(user.profilePicURL);

  const [listChoices, setListChoices] = React.useState(null)

  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');



  function navToCubimals()
  {
    console.log("Cubimals")
    navigation.navigate('Cubimals', {user: {user}, });

  }

  function setFeedback(feedback)
  {
    global.feedback = feedback;
    console.log("global value: " + global.feedback);
  }

  function setNotificationText(text)
  {
    global.notificationText = text;
    console.log("global value: " + global.notificationText);

  }

  var complete = false;

  function advanced(title, body)
  {
    setADV(!showAdv);
    setHeading(title);
    console.log("Body: " + (body))
    setBody(body);
  }

  function advanced20(title, body)
  {
    setADV(showAdv);
  }

  const [heading, setHeading] = React.useState(null);

  const [modBody, setBody] = React.useState(null);

  const [feedbackBody, setFeedbackBody] = React.useState(null);

  const [showAdv, setADV] = React.useState(false); //Announcement Box trigger

  //const [toSendNotificationTo, setToSendNotificationTo] = React.useState(null)

  const [notificationTextbox, setNotificationTextbox] = React.useState(null)


  function close() {
    setADV(false);
  }



  async function validate(oldPassword) {
    
}

function setToSendNotificationTo(recipient)
{
  global.toSendNotificationTo = recipient
  console.log("Person set as: " + global.toSendNotificationTo)
}


  

  function fetchFeedback()  {
    fetch('http://outpostorganizer.com/SITE/api.php/records/Feedback/?camp=' + user.Home, {
        method: 'GET',
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Feedback Response: " + JSON.stringify(responseJson));   
        setFeedbackBody(responseJson);
  
      })
      
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
  }

  function sendFeedback(feedback) {
    console.log("Sending " + global.feedback);
    fetch('http://outpostorganizer.com/SITE/api.php/records/Feedback/?camp=' + user.Home, {
      method: 'POST',
      body: JSON.stringify({
        staffSubmitted: user.screenName,
        date: "2021-05-24",
        details: global.feedback
        
    })
    })
   .then((response) => response.json())
   .then((responseJson) => {
     console.log(responseJson.records == []);
      console.log("Feedback Response: " + JSON.stringify(responseJson));     

    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });
    
    //http://outpostorganizer.com/SITE/api.php/records/Feedback?camp=wartburg
  }

  function addNewWine(name, s, a, b, t, al, ar)  {
    console.log("Adding Wine");
    console.log(JSON.stringify({
      Name: name,
      Sweetness: (s),
      Acidity: (a),
      Body: (b),
      Tannins: (t),
      Alcohol: (al),
      AromaDesc: ar
  }));
    fetch('http://outpostorganizer.com/SITE/api.php/records/Wines?camp=bottleshock', {
        method: 'POST',
        body: JSON.stringify({
          Name: name,
          Sweetness: (s),
          Acidity: (a),
          Body: (b),
          Tannins: (t),
          Alcohol: (al),
          AromaDesc: ar
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Wine Response: " + JSON.stringify(responseJson));     
  
      })
      
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      }).finally(() => {
      })
      
  }

  function resetCamp() {
    console.log('http://outpostorganizer.com/SITE/api.php/records/Spots/?camp=' + user.Home);

    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/?camp=' + user.Home, {
      method: 'GET',
    })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log("Feedback Response: " + JSON.stringify(responseJson));  
      var sids = "" 
      var jsonBody = []
      for(var i=0; i<responseJson.records.length; i++)
      {
        sids = sids + (responseJson.records[i].SID + ",")
        jsonBody.push({usersWorking: "", awardPoints: "", logs: "", denied: 0, status: 0, siteOwner: null, tempTasks: responseJson.records[i].tasks})
      }
      console.log(sids)
      console.log('http://outpostorganizer.com/SITE/api.php/records/Spots/' + sids.slice(0, -1) + '?camp=' + user.Home);
      fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + sids.slice(0, -1) + '?camp=' + user.Home, {
        method: 'PUT',
        body: JSON.stringify(jsonBody)
      })
     .then((response) => response.json())
     .then((responseJson) => {
     //  console.log(responseJson.records == []);
       // console.log("Feedback Response: " + JSON.stringify(responseJson));     
  
      })
      
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
      //http://outpostorganizer.com/SITE/api.php/records/Feedback?camp=wartburg
    



    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });

  }
/*
      fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/?camp=' + user.Home, {
      method: 'POST',
      body: JSON.stringify({        
    })
    })
   .then((response) => response.json())
   .then((responseJson) => {
     console.log(responseJson.records == []);
      console.log("Feedback Response: " + JSON.stringify(responseJson));     

    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });
    //http://outpostorganizer.com/SITE/api.php/records/Feedback?camp=wartburg
  }

*/



  async function updatePassword(oldPassword, newPassword) {
    console.log("Pass Function");
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      oldPassword 
    );
    console.log('hash: ', hash);
    
    console.log(user.password + " : " + hash)
    if(user.password == (hash))
  {

      var newPass = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        newPassword 
      );;
      console.log("Newpass: " + newPass);
      console.log('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=' + user.Home);
      fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=' + user.Home, {
        method: 'PUT',
        body: JSON.stringify({
          password: newPass
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Point Response: " + JSON.stringify(responseJson));     
  
      })
      
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
      fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=global', {
        method: 'PUT',
        body: JSON.stringify({
          password: newPass
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log("Point Response: " + JSON.stringify(responseJson));     
  
      })
      
      .catch((error) => {
         console.error(error);
         console.log("ERROR");
      });
    }
    else
    {
      console.log("Passwords do not match!");
    }
  }

  async function turnOnDarkMode() {
    var key = "DMToggle"

    let result = await SecureStore.getItemAsync(key);
    if(result==null || result == "false")
    {
      save(key, "true")
    }
    else
    {
      save(key, "false")
    }
  }



  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  function sendNotification(t) {

    
    fetch('http://outpostorganizer.com/SITE/api.php/records/Users/?camp=' + user.Home, {
      method: 'GET',
    })
   .then((response) => response.json())
   .then((responseJson) => {
     

    responseJson.records.map((curUser) => {
      if(curUser.pushToken!=null && curUser.pushToken!="")
      {
        console.log("Sending body: " + JSON.stringify({
          to: curUser.pushToken,
          title: t,
          message: global.notificationText         
      }))
        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          body: JSON.stringify({
            to: curUser.pushToken,
            title: global.notificationText,
            message: t         
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
    
      }
    })


    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });
  }

  function advanced3(title, siteNumb)
  {
    setADV(false);
    navigation.navigate('Messenger', {user: {user}});
  }


  function updateProfile(sName, email, pic) {

    fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        screenName: sName,
        recoveryEmail: email,
        profilePicURL: pic
        
    })
    })
   .then((response) => response.json())
   .then((responseJson) => {
      console.log("ProfileUpdate Response: " + JSON.stringify(responseJson));     
      return <Text>responseJson</Text>;
    })
    
    .catch((error) => {
       console.error(error);
       console.log("ERROR");
    });

    user.screenName = sName;
    user.recoveryEmail = email;
    user.profilePicURL = pic;

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

{//user.screenName
}
    <Text style={styles.welcome}>Profile</Text>    
    <View style={styles.profileHeader}><Avatar url={user.profilePicURL} user={user.screenName} size={70}/>
      <View style={styles.profileSubHeader}>
        <Text style={styles.profileUsername}>
          {user.screenName}
        </Text>
        <Text style={styles.profilePoints}>
          {user.points} pts
        </Text>
      </View>

    </View>
    <View borderwidth={1} style={styles.ListBox}>
    <View style={[showAdv ? styles.advBoxShow : styles.advBoxHide]}>
    <View style={styles.buttonHolder}>
    <Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Return</Text>
  </Button>
</View>
      <Text style={styles.ListHeading}>{heading}
      </Text>
      <ScrollView contentContainerStyle={styles.advScrollView}>
        {modBody}
      </ScrollView>
    </View>




    <ScrollView style={{width: '100%', paddingLeft: 20,paddingRight: 20,}} contentContainerStyle={{width: '100%'}}>
    <View style={styles.scrollViewContainer}>
      {/*Todo: Find way to show selected checkable list */}
    <ProfileModule isAdmin={user.isAdmin} requireAdmin={false} adv={advanced} title="Edit Profile" body={
    <View style={styles.subContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Screen Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Screen Name"
        onChangeText={text => setScreenName(text)}
        defaultValue={screenName}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        defaultValue={email}
      />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Profile Picture:</Text>
      <TextInput
        style={styles.input}
        placeholder="Profile Picture"
        onChangeText={text => setPic(text)}
        defaultValue={pic}
      />
    </View><View style={styles.buttonHolder}>
    <Button style={styles.submit} mode="outlined" onPress={ () => {
      updateProfile(screenName, email, pic);
      setADV(false);
    }}
      >
      <Text style={styles.submit} >Submit</Text>
  </Button></View>
    </View>} />
    <ProfileModule isAdmin={user.isAdmin} requireAdmin={false} adv={advanced} title="Change Password" body={
    <View style={styles.subContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Old Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        onChangeText={text => setOldPassword(text)}
        defaultValue={oldPassword}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>New Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        onChangeText={text => setNewPassword(text)}
        defaultValue={newPassword}
      />
    </View><View style={styles.buttonHolder}>
    <Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed");
      updatePassword(oldPassword, newPassword);
      setADV(false);
    }}
      >
      <Text style={styles.submit} >Submit</Text>
  </Button></View>
    </View>} />
    
    <ProfileModule isAdmin={user.isAdmin} requireAdmin={false} adv={advanced} title="Provide Feedback" body={
    <View style={styles.subContainer}>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Feedback:</Text></View>
  <View style={styles.inputContainer}>
      <TextInput
        style={styles.largeInput}
        placeholder="Feedback"
        multiline={true}
        onChangeText={text => setFeedback(text)}
        defaultValue={''}
      />
    </View><View style={styles.buttonHolder}>
    <Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed");
      sendFeedback(feedback);
      setADV(false);
    }}
      >
      <Text style={styles.submit} >Submit</Text>
  </Button></View>
    </View>} />
    <ProfileModule isAdmin={user.isAdmin} requireAdmin={true} adv={advanced} title={"Retake Quiz" + (global.toSendNotificationTo==null ? "" : " to: " + global.toSendNotificationTo)} body={
    <View style={styles.subContainer}>
       <TextInput
        style={styles.largeInput}
        placeholder="Notification Text"
        multiline={true}
        onChangeText={text => setNotificationText(text)}
        defaultValue={''}
      />
    <View style={styles.inputContainer}><Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed: " + notificationTextbox);
      sendNotification("From " + user.screenName);
      setToSendNotificationTo(null);
      setADV(false);
    }}
      ><Text style={styles.submit} >Submit</Text>
      </Button></View><View style={styles.buttonHolder}>
    </View>
  </View>} />
  <ProfileModule isAdmin={user.isAdmin} requireAdmin={true} adv={advanced} title={"Add New Wine"} body={
    <View style={styles.subContainer}>
       <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Wine Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Wine Name"
        onChangeText={text => setWineName(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Sweetness:</Text>
      <TextInput
        style={styles.input}
        placeholder="Sweetness"
        onChangeText={text => setSweetness(text)}
        defaultValue={''} />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Acidity:</Text>
      <TextInput
        style={styles.input}
        placeholder="Acidity"
        onChangeText={text => setAcidity(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Body:</Text>
      <TextInput
        style={styles.input}
        placeholder="Body"
        onChangeText={text => setWBody(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tannins:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tannins"
        onChangeText={text => setTannins(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Alcohol:</Text>
      <TextInput
        style={styles.input}
        placeholder="Alcohol"
        onChangeText={text => setAlcohol(text)}
        defaultValue={''}
      />
    </View>
    <TextInput
        style={styles.largeInput}
        placeholder="Aroma"
        multiline={true}
        onChangeText={text => setAroma(text)}
        defaultValue={''}
      />
    <View style={styles.inputContainer}><Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed: ");
      addNewWine(global.wineName, global.sweetness, global.acidity, global.Wbody, global.tannins, global.alcohol, global.aroma);
      setSweetness(null);
      setAcidity(null);
      setWBody(null);
      setTannins(null);
      setAlcohol(null);
      setAroma(null);
      setWineName(null);
      setADV(false);
    }}
      ><Text style={styles.submit} >Submit</Text>
      </Button></View><View style={styles.buttonHolder}>
    </View>
  </View>} />

    {/*<ProfileModule isAdmin={user.isAdmin} requireAdmin={true} adv={advanced} title={"Send Announcement" + (global.toSendNotificationTo==null ? "" : " to: " + global.toSendNotificationTo)} body={
    <View style={styles.subContainer}>
       <TextInput
        style={styles.largeInput}
        placeholder="Notification Text"
        multiline={true}
        onChangeText={text => setNotificationText(text)}
        defaultValue={''}
      />

  <View style={styles.inputContainer}><Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed: " + notificationTextbox);
      sendNotification("From " + user.screenName);
      setToSendNotificationTo(null);
      setADV(false);
    }}
      ><Text style={styles.submit} >Submit</Text>
      </Button></View><View style={styles.buttonHolder}>
    </View>
  </View>} />*/}  
          </View>
    </ScrollView></View>
    </View>
   ) };
};

export default memo(Profile);
