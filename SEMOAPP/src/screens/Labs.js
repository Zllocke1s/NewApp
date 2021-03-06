import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/LabStyle';
import { Lab } from '../components/Lab';
import { BackButton } from '../components/BackButton';
import { Heading } from '../components/Heading';

export default function Labs({navigation}) {

  var auth = "17eeeb3f-f44b-460f-95e9-1b798138dc87"
  var labs = [
    {name: "Dempster", id: "1002"},
    {name: "Kent", id: "1003"},
    {name: "Magill", id: "1004"}, 
    {name: "Merick", id: "1005"},
    {name: "Towers", id: "1006"},
    {name: "River Campus", id: "1007"}]




  return (
    <View style={styles.container}>
      <Heading navigation={navigation} title={"Lab Avalibility"}></Heading>
      <View style={styles.labContainer}>
        <ScrollView style={styles.scrollView}>
      {labs.map((l) => {
          return(
            <Lab auth={auth} key={l.id} item={l}></Lab>
          )
        })}</ScrollView>
        </View>
        </View>
    
  );
}

