import { memo } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import CheckedBox from '../assets/checkedBox.svg';
import UncheckedBox from '../assets/uncheckedBox.svg';


const TodayItem = ({ onPress, title, time, style, children, ...props }) => {
  const mark = () => {
    setChecked(!checked);
    console.log("Marked: " + !checked);
    onPress(!checked);
  }

  React.useEffect(() =>
  {
    console.log("Checked UE");
    if(checked)
    {
    }
    else
    {
      console.log("unchecked");
    }
  }, [checked])

const [checked, setChecked] = React.useState(false);

const styles = StyleSheet.create({
  text: {
    fontSize: 20, 
    lineHeight: 26,
    color: theme.colors.black,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",
    marginLeft: 40,
  },
  header: {
    fontSize: 24,
    lineHeight: 24,
    color: theme.colors.black,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Bold",    
    marginLeft: 40,
  },
  container:
  {
    lineHeight: 26,
    backgroundColor: theme.colors.lightBlue,
    marginBottom: 14,
    width: '90%',
    zIndex: 100
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    position: 'absolute',
    left: 20,
    top: '22%',
    overflow: 'visible',
  }

  
});


return (
  <TouchableOpacity onPress={mark} activeOpacity={1.0} style={styles.container} ><View style={styles.checkboxContainer}><CheckBox checkboxStyle={styles.checkbox} unCheckedImage={<UncheckedBox />} checkedImage={<CheckedBox />} isChecked={checked ? true : false} onClick={() => mark()  } /></View><Text style={styles.header}>{title}</Text><Text {...props} style={styles, styles.text}>{time}</Text></TouchableOpacity>
   );
};
export default memo(TodayItem);
