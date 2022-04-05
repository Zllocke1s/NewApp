import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import { AntDesign } from '@expo/vector-icons'; 

//Todo: Tiling News through the tile


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

export const NewsTile = (({name, item}) => {
        if(item==null)
        {
            item = {
                title: "",
                image: "",
                intro: "",
                link: "http://semo.edu/news"
            }
        }

        return(
            <TouchableOpacity onPress={ () => Linking.openURL(item.link)} 
            style={styles.newsContainer}>
                <View style={styles.newsTitleContainer}>
                    <Text style={styles.text}>{name}</Text>                    
                </View>
                <View style={styles.newsBodyContainer}>
                <Image style={styles.newsLogo}
                   source={{uri: item.image}} />
                <View style={styles.newsBodyTextContainer}>
                    <Text style={styles.newsTitle}>{decode(item.title)}</Text>
                    <Text style={styles.newsText}>{decode(item.intro.length) > 80 ? decode(item.intro.substring(0, 80)) + "..." : decode(item.intro)}</Text>
                </View>
                </View>
            </TouchableOpacity>
        );
});

export const DiningChoiceTile = (({name, id, status, onP, location, src}) => {

        return(
            <TouchableOpacity onPress={() => onP(id, name, status)}
             style={styles.diningContainer}>
                <View style={styles.columns}>
                    <View style={styles.rows}>
                    <Text style={styles.diningTitle}>{name}</Text>
                    <Text style={styles.diningText}>{location}</Text>
                    <Text style={[styles.diningHours, {color: status.color}]}><AntDesign name="clockcircleo" size={18} color={status.color} />  {status.message}</Text>
                    </View>
                    <Image style={styles.menuLogo}
                   source={require("../assets/tiles/plate.png")}
           />
                </View>
            </TouchableOpacity>
        );
});

export const SecretTile = (({onP}) => {
    return(
        <TouchableOpacity onPress={() => onP()}
         style={styles.secretContainer}
         ><Text></Text>
        </TouchableOpacity>
    );

});

const styles = StyleSheet.create({
    secretContainer: {
        backgroundColor: theme.colors.gray,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 100,
        height: 100
    },
    container: {
        flex: .45,
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
        flex: .45,
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
        height: 130,
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'flex-start',
        justifyContent: 'center',
  
      },
      diningContainer: {
        flex: .3,
        height: 100,
        width: "100%",
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 50,
        padding: 5
      },
      logo:
      {
        width: 60,
        height: 60,
        alignSelf:"center",
      },
      newsLogo:
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
        textAlign: "center"
        
    },
    newsTitleContainer: {
        padding: 0,
        alignSelf: "flex-start",
        textAlign: 'left',
        marginLeft: 10
        
    },
    newsBodyContainer: {
        padding: 0,
        display: "flex",
        flexDirection: "row",
        alignSelf: "flex-start",
        textAlign: 'left',
        marginLeft: 10,
        
    },
    newsBodyTextContainer: {
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-start",
        textAlign: 'left',
        marginLeft: 10,
        flex: 1
        
    },
    fullLogo: {
        width: "100%",
        height: 100
    },
    
    headerLogo: {
        width: 65,
        height: 65,
    },
    text: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
        //text formatting here
    },
    newsTitle: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold'
        //text formatting here
    },
    newsText: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        textAlign: 'left'
        //text formatting here
    },
    menuLogo: {
        alignSelf: "flex-start",
        width: 50,
        height: 50,
        margin: 10,
        display: "flex",
        
    },
    diningTitle: {
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 30,
        //text formatting here
    },
    diningText: {
        paddingLeft: 10,
        fontSize: 18,
        //text formatting here
    },
    diningHours: {
        paddingLeft: 10,
        fontSize: 14,
        //text formatting here
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: "100%",
        textAlign: "left",
        justifyContent: "space-between"
    },
    rows:
    {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        
    }
  });