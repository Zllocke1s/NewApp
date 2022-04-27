import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Modal, Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/ClassesStyle';
import { ClassTile, GradePercentTile } from '../components/Tile';
import { Feather } from '@expo/vector-icons'; 
import { theme } from '../core/theme.js';
import React, { useEffect } from 'react';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Button } from 'react-native-paper';
import { TriangleColorPicker } from 'react-native-color-picker'
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { Heading } from '../components/Heading';

export default function Schedule({navigation}) {


  const [credentials, setCredentials] = React.useState(null)
  const [classes, setClasses] = React.useState(null)
  const [classesAdv, setClassesAdv] = React.useState(null);
  const [formattedclasses, setFormattedclasses] =React.useState(null)
  const [colors, setColors] = React.useState(null)
  const [attemptColors, setAttemptGrab] = React.useState(false)
  const [modal, setModal] = React.useState(null)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [modalPicker, setModalPicker] = React.useState(null)
  const [inPerson, setInPerson] = React.useState(null)
  const [online, setOnline] = React.useState(null)
  const [fOnline, setFOnline] = React.useState(null)

  useEffect(() => {
    if(credentials!=null)
    {
    fetch('http://mportal.semo.edu:8080/banner-mobileserver/api/2.0/courses/calendarview/' + credentials.so,
    {
      headers: {
        Authorization: 'Basic '+base64.encode(credentials.username + ":" + credentials.password), 
    }, 
    })
    .then((response) => {
      response.json().then((json) => {
      setClasses(json.coursesDays)
    }
    )})
    }
  }, [credentials])

  useEffect(() => {
    if(credentials!=null)
    {
      console.log(Moment().format("YYYY"))
    fetch('http://mportal.semo.edu:8080/banner-mobileserver/api/2.0/courses/overview/' + credentials.so,
    {
      headers: {
        Authorization: 'Basic '+base64.encode(credentials.username + ":" + credentials.password), 
    }, 
    })
    .then((response) => {
      response.json().then((json) => {
      console.log("JSON")
      setClassesAdv(json.terms[0])
    }
    )})
    }
  }, [credentials])

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      setCredentials( jsonValue != null ? (JSON.parse(jsonValue)) : null);
      console.log("Pulled: " + jsonValue)
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }

  const getColors = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("gradeColors")
      setColors( jsonValue != null ? (JSON.parse(jsonValue)) : []);
      console.log("Colors: " + jsonValue)
    } catch(e) {
      console.log(e)
      // error reading value
    }
  }
  const storeColors = async () => {
    try {
      const jsonValue = JSON.stringify(colors)
      await AsyncStorage.setItem("gradeColors", jsonValue)
    } catch (e) {
      // saving error
    }
    console.log("Stored")
    
  }

  useEffect(() => {
    if(online!=null)
    {
      var formattedOnline = <View style={styles.day}>
          <Text style={styles.doW}>Online</Text>
          {online.map((cm) => {
            return(
            <View key={cm.sectionId} style={styles.course}>
              <Text style={styles.className}>{cm.courseName} - {cm.courseSectionNumber}</Text>
              <Text style={styles.classCode}>{cm.sectionTitle}</Text>
              <View style={styles.columns}>
              </View>
            </View>
            )
          })}
        </View>
      setFOnline(formattedOnline)
    }
  }, [online])

  useEffect(() => {
    if(colors==[] || colors==null)
    {
      console.log("No Colors set")
      setColors([
        "#abd67d",
        "#a7ddda",
        "#ff876b",
        "#ffbfb0",
        "#c7a1d1",
        "#e2aedd",
        "#ff876b"]
      )
    }
    else if(colors!=[])
    {
      storeColors()
    }
  }, [colors])

  useEffect(() => {
    getData("credentials")
    getColors()
  }, [])

  useEffect(() => {
    if(classesAdv!=null && inPerson!=null)
    {
      var online = classesAdv.sections;
      online = online.filter(x => !inPerson.has(x.sectionId));
      setOnline(online)
    }
      

  }, [classesAdv, inPerson])


  useEffect(() => {
    if(classes!=null)
    {
      console.log("not null")
      classes.sort((a, b) => a.date > b.date ? 1 : -1)
      var online = new Set()
    setFormattedclasses(classes.map((item, index) => {
      if(item.coursesMeetings.length > 0)
      {
      return(
        <View key={item.date} style={styles.day}>
          <Text style={styles.doW}>{Moment(item.date).format('dddd')}</Text>
          {item.coursesMeetings.map((cm) => {
            online.add(cm.sectionId)
            return(
            <View key={cm.sectionId} style={styles.course}>
              <Text style={styles.className}>{cm.courseName} - {cm.courseSectionNumber}</Text>
              <Text style={styles.classCode}>{cm.sectionTitle}</Text>
              <View style={styles.columns}>
              <Text>{cm.building} {cm.room}</Text>
              <Text>{Moment(cm.start).format('h:mm a')} - {Moment(cm.end).format('h:mm a')}</Text>
              </View>
            </View>
            )
          })}
        </View>
      )}
    }))
    console.log("Online: ")
    console.log(online)
    setInPerson(online);

    
  }
  else
  {
    
  }
  }, [classes, classesAdv, colors])


  return (
    <View style={styles.container}>
      <Heading navigation={navigation} title={"Schedule"}></Heading>
      <View style={styles.tileContainer}>
        <ScrollView>
        <View style={styles.rows}>
            {formattedclasses != null ? formattedclasses : <ActivityIndicator size="large" color={theme.colors.red}></ActivityIndicator>}
            {fOnline}
            </View>
            </ScrollView>
        </View>
    </View>
    
  );
}

