import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import { theme } from '../core/theme';



export const HoverButton = ((pass) => {


        return(
            <TouchableOpacity onPress={ () => (pass.pass())} style={styles.container}>
            <Image style={styles.logo}
                   source={require("../assets/tiles/bell.png")}
           ></Image>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 30,
        right: 0,
        height: 60,
        width: 60,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: 'rgba(35, 35, 35, 0.7)',
        borderBottomLeftRadius: 5, 
        borderTopLeftRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0
  
      },
      logo:
      {
        width: 40,
        height: 40,
        alignSelf:"center",
      },
    max: {
        width: "100%"
    },
    textContainer: {
        padding: 0,
        alignSelf: "center",
        
    },
    text: {
        //text formatting here
    }
  });