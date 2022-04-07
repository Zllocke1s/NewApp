import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export const Game = (({sport, home, away, location, date, time}) => {

    const [loaded] = useFonts({
        Times: require('../assets/fonts/times.ttf'),
      });
      if(!loaded)
      {
        return <AppLoading/>
    
      }
        return(
            <View><View
            style={{
                borderBottomColor: theme.colors.gray2,
                borderBottomWidth: 1,
                margin: 15,
                marginBottom: 0
            }}/>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={[styles.text, {fontFamily: "Times"}]}>{sport}</Text>
                    <Text style={[styles.text, {fontFamily: "Times"}]}>{'\t\t\u2022\t'}{home}</Text>
                    <Text style={[styles.text, {fontFamily: "Times"}]}>{'\t\t\u2022\t'}{away}</Text>
                    <Text style={[styles.text, {fontFamily: "Times"}]}>Location: {location}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={[styles.dateText, {fontFamily: "Times"}]}>{date} @ {time}</Text>
                </View>
            </View>
            
            </View>
            
        );    
});


const styles = StyleSheet.create({
    container: {
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        display: "flex",
        flexDirection: "row",
        margin: 0
      },
    subContainer: {
        flex: 0.65,
        width: "100%"
    },
    dateContainer: {
        flex: 0.3,
    },
    text: {
        color: theme.colors.gray4,
        fontSize: 14,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
    
  });