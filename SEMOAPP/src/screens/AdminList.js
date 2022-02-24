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
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import Details from './Details';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AdminListItem from '../components/AdminListItem';





const AdminList = ({ navigation }) => {

  var load = true;
  const { user } = navigation.state.params.user;


  const [advTasks, setAdvTasks] = React.useState(null);

  const [formattedAdvTasks, setFormattedAdvTasks] = React.useState(null);

  const [heading, setHeading] = React.useState(null);

  const [showAdv, setADV] = React.useState(false); //Announcement Box trigger




  const [data, setData] = useState([]);


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
    //console.log(data);
  } )
  }, [load]);

  function onReturn() {
    
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots?camp=' + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("called");
    setData(responseJson.records);
    //console.log(data);
  } );
  
  }

  var complete = false;


  function advanced2(title, siteNumb, statusCode, tasks, awardPoints, comment)
  {
    console.log(tasks);
    fetch('http://outpostorganizer.com/SITE/api.php/records/Spots/' + siteNumb + '?camp=' + user.Home, {
      method: 'PUT',
      body: JSON.stringify({
        status: statusCode,
        denied: (statusCode==0 ? 1 : 0),
        tempTasks: (statusCode==0 ? tasks : ""),
        awardPoints: "",
        logs: comment,
        approvedBy: user.screenName
      })
      })
     .then((response) => response.json())
     .then((responseJson) => {
        console.log(responseJson);       
      })
      
      .catch((error) => {
         console.error(error);
      });

      console.log("awardPoints: " + JSON.stringify(awardPoints));
      var usersToRecievePoints = {};
      for(var i=0; i<awardPoints.split("&").length; i++)
      {
        if(usersToRecievePoints[awardPoints.split("&")[i]]==null)
        {
          usersToRecievePoints[awardPoints.split("&")[i]]=1;
        }
        else
        {
          usersToRecievePoints[awardPoints.split("&")[i]]= usersToRecievePoints[awardPoints.split("&")[i]] +1;
        }
//        usersToRecievePoints.push(awardPoints.split("&")[i]);
      }
      delete usersToRecievePoints[""];
      console.log("Users to receive points: " + JSON.stringify(usersToRecievePoints));
      console.log("Users to receive points: " + Object.keys(usersToRecievePoints).length);
     // console.log('http://outpostorganizer.com/SITE/api.php/records/Users/' + user.UID + '?camp=' + user.Home);
      
      for(var j=0; j<Object.keys(usersToRecievePoints).length; j++)
      {
        var currentUserID = Object.keys(usersToRecievePoints)[j];
        console.log("Handling: " + 'http://outpostorganizer.com/SITE/api.php/records/Users/' + currentUserID + "?camp=" + user.Home);
        fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + currentUserID + "?camp=" + user.Home, {
    method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
  //  console.log(responseJson);
  console.log("pulledUserData");
  var currentPoints = responseJson.points;
  var smallGroupToAddTo = responseJson.smallGroup;
  console.log("User ID: " + JSON.stringify(usersToRecievePoints));
  console.log("Total Calculated Points: " + (parseInt(currentPoints) + parseInt(usersToRecievePoints[currentUserID])));
    fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + currentUserID + '?camp=' + user.Home, {
        method: 'PUT',
        body: JSON.stringify({
          points: (parseInt(currentPoints) + parseInt(usersToRecievePoints[currentUserID]))

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

      fetch('http://outpostorganizer.com/SITE/api.php/records/SmallGroups/' + smallGroupToAddTo + '?camp=' + user.Home, {
        method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
      //  console.log(responseJson);
      console.log("called");
        var currentGroupPoints = responseJson.tempPoints;
        console.log("SMALL GROUP LINK: " + 'http://outpostorganizer.com/SITE/api.php/records/SmallGroups/' + smallGroupToAddTo + '?camp=' + user.Home);
      fetch('http://outpostorganizer.com/SITE/api.php/records/SmallGroups/' + smallGroupToAddTo + '?camp=' + user.Home, {
        method: 'PUT',
        body: JSON.stringify({
          tempPoints: (parseInt(currentGroupPoints) + parseInt(usersToRecievePoints[currentUserID]))

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
      //console.log(data);
      } );




      

      console.log("End of list");
  //console.log(data);
  } );


        

      }
      
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
    
    
    <View style={styles.container}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

    <Text style={styles.welcome}>{user.screenName}</Text>
    
    
    <View borderwidth={1} style={styles.ListBox}><Text style={styles.ListHeading}>Approval Page</Text><Button style={styles.leave} mode="outlined" onPress={close}>
      <Text style={styles.leave} >Leave</Text>
  </Button> 
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


 

    <ScrollView style={{width: '100%', paddingLeft: 20,paddingRight: 20,}} contentContainerStyle={{width: '100%'}}>
    <View style={styles.scrollViewContainer}>
      {/*Todo: Find way to show selected checkable list */}
      {data.map(function(item, index) {
if(item.status==1)
{
return (<AdminListItem aPoints={item.awardPoints} siteNum={item.SID} adv={advanced2} progress={(((item.tasks.split("& ").length+1 - item.tempTasks.split("& ").length)*100)/item.tasks.split("& ").length).toString() + "%"} title={item.site_Name} people={item.usersWorking.split("&").length-1} tasks={item.tasks.split("& ")}/>);}
})}
   {/* <ComplexListItem adv={advanced} progress="42%" title="Dining Hall" people="3" tasks={task1()}/>    */}
    </View>
    </ScrollView></View>
    </View>
   ) };
};

export default memo(AdminList);
