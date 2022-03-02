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

  const questions = [
    {id: 0, question: "If you drink coffee, which statement would best describe how you prefer it:",
    answers: ["Add sugar (or sweetener) and cream", 
              "Add cream only", 
              "Add lemon only", 
              "Take it straight", 
              "Don't drink coffee"],
    tp: [ [10,5,5,5,5], 
          [7,5,0,0,-1], 
          [5,10,5,5,5], 
          [0,7,5,7,1], 
          [5,5,5,5,5]]
  },
  {id: 1, question: "If you drink coffee or tea, do you like it:",
    answers: ["Fairly Strong", 
              "Average Strength", 
              "Mostly on the lighter/weaker side", 
              "Any strength, but cut with sugar"],
    tp: [ [0,0,10,10,1], 
          [5,5,5,7,5], 
          [5,5,0,0,-1], 
          [10,5,5,5,5]]
  },
  {id: 2, question: "When out at a fancy restaurant, what beverage would you ask the waiter for on a special occasion?",
    answers: ["Water or non-alcoholic beverage only", 
              "A good beer", 
              "A good (still) wine", 
              "A sparkling wine, Champagne", 
              "A mixed or straight spirit drink",
              "A cocktail with slight sweetness"],
    tp: [ [5,5,0,0,-10], 
          [0,5,10,10,1], 
          [5,0,7,7,1],
          [2,10,4,0,0],
          [2,5,5,5,10], 
          [7,7,5,5,1]]
  },
  {id: 3, question: "If you occasionally drink cocktails or distilled spirits, which would you be more likely to choose:",
    answers: ["Martini", 
              "Bourbon or Scotch", 
              "Margarita", 
              "Sparkling Wine",
              "Rarely or never drink cocktails"],
    tp: [ [0,5,5,7,1], 
          [0,5,7,7,10], 
          [7,7,5,7,1], 
          [7,10,0,5,5], 
          [5,5,5,5,-10]]
  },
  {id: 4, question: "How do you like your lemonade:",
    answers: ["Strong, lemony, and sweet", 
              "Lemony tart and not too sweet", 
              "Light lemon and light sweetness", 
              "Crystal Light low calorie lemonade",
              "Do not care for lemonade"],
    tp: [ [10,7,10,7,1], 
          [0,10,7,7,5], 
          [7,7,0,5,5], 
          [7,10,0,0,5], 
          [0,0,5,5,5]]
  },  
  ];

  function addToScores(score)
  {
      global.quizS+= score[0];
      global.quizA+= score[1];
      global.quizT+= score[2];
      global.quizB+= score[3];
      global.quizAl+= score[4];
      console.log("Current Sweetness: " + global.quizS);
      console.log("Current Acidity: " + global.quizA);
      console.log("Current Body: " + global.quizB);
      console.log("Current Tannins: " + global.quizT);
      console.log("Current Alcohol: " + global.quizAl);
  }

  const formattedQuestions = questions.map((q) => {
    return (<View><Text style={styles.question}>{q.question}</Text>
    {q.answers.map((a, i) => {
      return <Button style={styles.quiz} mode="outlined" onPress={ () => {
        addToScores(q.tp[i]);
      }}
        ><Text style={styles.quiz}>{a}</Text></Button>
    })
  }
    </View>
    );
  }
  );

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

  function advancedQuiz(title, body)
  {
    setADV(!showAdv);
    setHeading(title);
    global.quizS = 0;
    global.quizA = 0;
    global.quizB = 0;
    global.quizT = 0;
    global.quizAl = 0;
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

  }

  function updatePreferences(s, a, b, t, al) {

    fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=bottleshock', {
      method: 'PUT',
      body: JSON.stringify({
        sweetness: s,
        acidity: a,
        body: b,
        tannins: t,
        alcohol: al,
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
    <ProfileModule isAdmin={user.isAdmin} requireAdmin={false} adv={advancedQuiz} title={"Take Quiz"} body={
    <View style={styles.subContainer}>
       {formattedQuestions}<View style={styles.buttonHolder2}><Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed: ");
      var totalQuiz = global.quizS + global.quizA + global.quizB + global.quizT + global.quizAl;
      console.log("Current Sweetness: " + global.quizS/totalQuiz);
      console.log("Current Acidity: " + global.quizA/totalQuiz);
      console.log("Current Body: " + global.quizB/totalQuiz);
      console.log("Current Tannins: " + global.quizT/totalQuiz);
      console.log("Current Alcohol: " + global.quizAl/totalQuiz);
      if(user.sweetness!=0)
      {
        user.sweetness = (eval(user.sweetness) + eval(global.quizS*100/totalQuiz))/2;
      }
      user.acidity = (eval(user.acidity) + (global.quizA*100/totalQuiz))/2;
      user.body = (eval(user.body) + (global.quizB*100/totalQuiz))/2;
      user.tannins = (eval(user.tannins) + (global.quizT*100/totalQuiz))/2;
      user.alcohol = (1.5*eval(user.alcohol) + 1*(global.quizAl*100/totalQuiz))/2.5;
      console.log("New Users Scores");
      console.log("Sweetness: " + user.sweetness);
      console.log("Acidity: " + user.acidity);
      console.log("Body: " + user.body);
      console.log("Tannins: " + user.tannins);
      console.log("Alcohol: " + user.alcohol);
      updatePreferences(user.sweetness, user.acidity, user.body, user.tannins, user.alcohol);
      setADV(false);
    }}
      ><Text style={styles.submit} >Add to Profile</Text>
      </Button>
      <Button style={styles.submit} mode="outlined" onPress={ () => {
      console.log("Button Pressed: ");
      var totalQuiz = global.quizS + global.quizA + global.quizB + global.quizT + global.quizAl;
      console.log("Current Sweetness: " + global.quizS/totalQuiz);
      console.log("Current Acidity: " + global.quizA/totalQuiz);
      console.log("Current Body: " + global.quizB/totalQuiz);
      console.log("Current Tannins: " + global.quizT/totalQuiz);
      console.log("Current Alcohol: " + global.quizAl/totalQuiz);
      user.sweetness = (eval(user.sweetness) + eval(global.quizS*100/totalQuiz))/2;
      user.acidity = ((global.quizA*100/totalQuiz));
      user.body = ((global.quizB*100/totalQuiz));
      user.tannins = ((global.quizT*100/totalQuiz));
      user.alcohol = ((global.quizAl*100/totalQuiz));
      updatePreferences(user.sweetness, user.acidity, user.body, user.tannins, user.alcohol);
      setADV(false);
    }}
      ><Text style={styles.submit} >Replace Profile</Text>
      </Button></View>
  </View>} />
  <ProfileModule isAdmin={user.isAdmin} requireAdmin={false} adv={advanced} title={"Add New Wine"} body={
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
        keyboardType='numeric'
        onChangeText={text => setSweetness(text)}
        defaultValue={''} />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Acidity:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Acidity"
        onChangeText={text => setAcidity(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Body:</Text>
      <TextInput
        style={styles.input}
        placeholder="Body"
        keyboardType='numeric'
        onChangeText={text => setWBody(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Tannins:</Text>
      <TextInput
        style={styles.input}
        placeholder="Tannins"
        keyboardType='numeric'
        onChangeText={text => setTannins(text)}
        defaultValue={''}
      />
    </View><View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Alcohol:</Text>
      <TextInput
        style={styles.input}
        placeholder="Alcohol"
        keyboardType='numeric'
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
