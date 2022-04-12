import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/GradesStyle.js';
import { ClassTile, GradePercentTile } from '../components/Tile';
import { Feather } from '@expo/vector-icons'; 
import { theme } from '../core/theme.js';

export default function Portal() {

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
            {classes.map((item) => {
              return(
                <View key={item.id} style={styles.columns}>
                <ClassTile color={item.color} classname={item.name} professor={item.professor}></ClassTile>
                <GradePercentTile color={item.color} percentage={item.percentage}></GradePercentTile>
                <TouchableOpacity style={styles.editButton}>
                <Feather name="edit" size={24} color={theme.colors.gray3} />
                </TouchableOpacity>
              </View>
              )
            })}
            </View>
        </View>
    </View>
    
  );
}

