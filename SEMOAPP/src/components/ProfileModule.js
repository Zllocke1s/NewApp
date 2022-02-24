import { memo } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import CheckedBox from '../assets/checkedBox.svg';
import UncheckedBox from '../assets/uncheckedBox.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Task from './Task';
import { ScrollView } from 'react-native-gesture-handler';
import TodayItem from './TodayItem';
import Button from './Button';
import Icon from 'react-native-vector-icons/AntDesign';


const ProfileModule = ({ additionalFunc, isAdmin, requireAdmin, adv, title, body, ...props }) => {

const openWindow = () => {
  console.log("OpenWindow");
  
  adv(title, body);
  if(additionalFunc!=null)
  {additionalFunc();
  }  
}


const [checked, setChecked] = React.useState(false);
const [showSite, setSite] = React.useState(false);

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    lineHeight: 26,
    color: theme.colors.darkBlue,
    textAlign: 'right',
    fontFamily: "SulphurPoint-Bold",
    flex: 1,
    textAlignVertical: "bottom"
    
  },
  containerHidden: {
    display: "none"
  },
  header: {
    fontSize: 30,
    color: theme.colors.darkBlue,
    textAlign: 'left',
    fontFamily: "SulphurPoint-Bold",    
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    textAlignVertical: "bottom"
  },
  adminHeader: {
    flex: 0.2,
    justifyContent: "center"  },
  adminHeaderHide: {
    display: "none",
    flex: 0
  },
  container:
  {
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 20,
    width: '100%',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.darkBlue,
  },
  textBox:
  {
    display: 'flex',
    flexDirection: "row"
  },
  containerAdmin:
  {
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 20,
    width: '100%',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.colors.darkBlue,
  },
  
});


return (
 
  <TouchableOpacity activeOpacity={1.0} style={requireAdmin ? ((isAdmin==0) ? styles.containerHidden : styles.containerAdmin) : styles.container} onPress={openWindow} >
       <View style={styles.textBox}><Text style={styles.header}>{title}</Text><View style={requireAdmin==1 ? styles.adminHeader : styles.adminHeaderHide}><Icon name="star" size={30} color={theme.colors.darkBlue} /></View></View>
   </TouchableOpacity>
   );
};
export default memo(ProfileModule);
