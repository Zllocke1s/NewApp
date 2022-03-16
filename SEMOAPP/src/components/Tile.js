import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';



export const Tile = (({name, onP, src, fullscreen}) => {
    if(fullscreen)
    {
        return(
            <TouchableOpacity onPress={() => onP({name})}
            style={styles.fullscreenContainer}>
            <Image style={styles.fullLogo}
                   source={src}
           ></Image>
            </TouchableOpacity>
        );
    }
    else
    {
        return(
            <TouchableOpacity onPress={() => onP({name})}
             style={styles.container}>
                <View style={styles.textContainer}>
            <Image style={styles.logo}
                   source={src}
           ></Image>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    
    }
});



export const HeaderTile = (({name, src, fullscreen, onP}) => {
    if(fullscreen)
    {
        return(<View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => onP({name})}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }
    else
    {
        return(
            <TouchableOpacity onPress={() => onP()}
            style={styles.headerContainer}>
                <View style={styles.textContainer}>
                <Image style={styles.headerLogo}
                   source={src}
           ></Image>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    
    }
});

export const NewsTile = (({name}) => {
        return(
            <TouchableOpacity onPress={ () => Linking.openURL("https://semo.edu/news")} 
            style={styles.newsContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
});



const styles = StyleSheet.create({
    container: {
        flex: .3,
        height: 100,
        width: 500,
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0
  
      },
      fullscreenContainer: {
        flex: .3,
        height: 100,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0
  
      },
      headerContainer: {
        flex: .35,
        height: 100,
        fontSize: 48,
        marginTop: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0
  
      },
      newsContainer: {
        flex: .85,
        height: 80,
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'center',
        justifyContent: 'flex-end',
  
      },
      logo:
      {
        width: 50,
        height: 50,
        alignSelf:"center",
      },
    max: {
        width: "100%"
    },
    textContainer: {
        padding: 0,
        alignSelf: "center",
        
    },
    fullLogo: {
        width: 110,
        height: 100,
    },
    
    headerLogo: {
        width: 65,
        height: 65,
    },
    text: {
        justifyContent: 'center',
        alignSelf: 'center'
        //text formatting here
    }
  });