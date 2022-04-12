import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GradesStyle.js';
import { ClassTile, GradePercentTile } from '../components/Tile';
import { Feather } from '@expo/vector-icons'; 
import { theme } from '../core/theme.js';
import React, { useEffect } from 'react';
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Portal() {

  const [credentials, setCredentials] = React.useState(null)
  const [terms, setTerms] = React.useState(null)
  const [formattedTerms, setFormattedTerms] =React.useState(null)


  useEffect(() => {
    if(terms!=null)
    {
      
    setFormattedTerms(terms.find((obj) => obj.name=="Spring 2022").sections.map((item) => {
      console.log(JSON.stringify(item))
      return(
        <View key={item.sectionId} style={styles.columns}>
        <ClassTile color={'#99e06a'} classname={item.sectionTitle} professor={item.courseName + " - " + item.courseSectionNumber}></ClassTile>
        <GradePercentTile color={'#99e06a'} percentage={item.grades[item.grades.length-1].value} percentageType={item.grades[item.grades.length-1].name}></GradePercentTile>
        <TouchableOpacity style={styles.editButton}>
        <Feather name="edit" size={24} color={theme.colors.gray3} />
        </TouchableOpacity>
      </View>
      )
    }))
    
  }
  }, [terms])

  useEffect(() => {
    if(credentials!=null)
    {
    fetch('http://mportal.semo.edu:8080/banner-mobileserver/api/2.0/grades/' + credentials.so,
    {
      headers: {
        Authorization: 'Basic '+base64.encode(credentials.username + ":" + credentials.password), 
    }, 
    })
    .then((response) => {
      console.log(JSON.stringify(response))
      if(!response.ok)
      {
       // throw new Error("invalid_credentials")
        setInvalid(true)
        return;
      }
      response.json().then((json) => {
      setTerms(json.terms)})})
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

  useEffect(() => {
    getData("credentials")

  }, [])

  var classes = [{
    name: "CS155-01: Computer Science I",
    professor: "Suhair Amer",
    percentage: "85.5%",
    id: 1,
    color: "#00d600"
  },{
    name: "CS265-01: Computer Science II",
    professor: "Ziping Liu",
    percentage: "92.8%",
    id: 2,
    color: "#008000"
  },{
    name: "CS351-01: C & Posix Environment",
    professor: "David Dai",
    percentage: "97.9%",
    id: 3,
    color: "#66cdaa"
  },{
    name: "CY201-01: Introduction to Cybersecurity",
    professor: "Wee Wee Sim",
    percentage: "89.8%",
    id: 4,
    color: "#00b7eb"
  },{
    name: "IS245: Web Development and Security",
    professor: "Carole Pfeiffer",
    percentage: "72.4%",
    id: 5,
    color: "#041690"
  }]


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.gradeTitle, {color:'black'}]}>Grades</Text>
        </View>
      </View>
      
      <View style={styles.tileContainer}>
        <View style={styles.rows}>
            {formattedTerms}
            </View>
        </View>
    </View>
    
  );
}

