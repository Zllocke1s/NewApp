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
    color: "#ff0000"
  },{
    name: "CS245-01: Discrete Structures I",
    professor: "Charles McAllister",
    percentage: "95.5%",
    id: 2,
    color: "#ff00ff"
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

