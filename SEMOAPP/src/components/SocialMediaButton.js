import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import { theme } from '../core/theme';



export const SocialMediaButton = (({onP, name, type, link}) => {

    var src;
    switch(type) {
        case "Instagram":
            src=require("./../assets/tiles/instagram.png");
            break;
        case "Facebook":
            src=require("./../assets/tiles/facebook.png");
            break;
        case "Twitter":
            src=require("./../assets/tiles/twitter.png");
            break;
        case "Youtube":
            src=require("./../assets/tiles/youtube.png");
            break;
        default:
    }


        return(
            <TouchableOpacity onLongPress={onP} onPress={ () => Linking.openURL(link)} style={styles.container}>
            <Image style={styles.logo}
                   source={src}
           ></Image>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 40,
        fontSize: 48,
        paddingBottom: 5,
        fontWeight: 'bold',
        backgroundColor: theme.colors.black,
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0
  
      },
      logo:
      {
        width: 30,
        height: 30,
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