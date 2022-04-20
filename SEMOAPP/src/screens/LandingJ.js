import React, { useRef, useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  
  var convert = {
    "red": 1,
    "blue": 2,
    "green": 3,
    "wings": 4,
    "default": 5,
  }
  const[tracker, setTracker] = React.useState(false)
  const [route, setRoute] = React.useState("green");
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
    if(nextAppState.match(/inactive|background/))
    {
      var codes = Object.keys(convert);
      var loc = codes.includes(route) ? convert[route] : convert["default"]
      console.log("H")
      const interval = setInterval(() => {
        if(tracker){
          fetch('http://outpostorganizer.com/SITE/api.php/records/Users/' + loc + '?camp=wartburg', {
            method: 'PUT',
            body: JSON.stringify({
              profilePicURL: location.coords.latitude + ":" + location.coords.longitude + ":" + route
              
          })
          })
         .then((response) => response.json())
         .then((responseJson) => {
            console.log("ProfileUpdate Response: " + JSON.stringify(responseJson));     
          })
          
          .catch((error) => {
             console.error(error);
             console.log("ERROR");
          });
          }  
            }, 3800);
      return () => clearInterval(interval);
     
    
    }
  };

  return (
    <View style={styles.container}>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStateExample;