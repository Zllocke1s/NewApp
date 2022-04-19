import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import { AntDesign } from '@expo/vector-icons'; 

//Todo: Tiling News through the tile


export const Tile = (({name, onP, onPD, src, fullscreen, disabled}) => {
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
            <TouchableOpacity onPress={() => disabled ? onPD({name}) : onP({name})}
             style={styles.container}>
                <View style={styles.textContainer}>
            <Image style={[styles.logo, disabled ? {tintColor: "#ccc"} : {tintColor: "#000"}]}
                   source={src}
           ></Image>
                    <Text style={disabled ? styles.textDisabled : styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    
    }
});

export const SportsTile = (({name, onP, src}) => {
        return(
            <TouchableOpacity onPress={() => onP({name})}
             style={styles.sportsContainer}>
                <View style={styles.textContainer}>
            <Image style={styles.logoSports}
                   source={src}
           ></Image>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    
    
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
                    <Text style={styles.newsText2}>{name}</Text>   
                    <Text numberOfLines={1} style={styles.newsTitle}>{decode(item.title)}</Text>
                                  
                </View>
                <View style={styles.newsBodyContainer}>
                {item.image!="" ? <Image resizeMode='stretch' style={styles.newsLogo} source={{uri: item.image}} /> : <View />}
                <View style={styles.newsBodyTextContainer}>
                    <Text numberOfLines={4} style={styles.newsText}>{decode(item.intro)}</Text>
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

export const ClassTile = (({color, classname, professor}) => {
    return(<View style={[styles.classContainer, {backgroundColor: color}]}>
            <View style={styles.classTextContainer}>
                <Text style={styles.classText}>{classname}</Text>
                <Text style={styles.professorText}>{professor}</Text>
            </View>
    </View>);
});

export const GradePercentTile = (({percentageType, color, percentage}) => {
    return(<View style={[styles.gradesContainer, {borderColor: color}]}>
            <View style={styles.gradesTextContainer}>
            <Text style={styles.percentTypeText}>{percentageType}</Text>
            <Text style={styles.gradeText}>{percentage}</Text>
             </View>
    </View>);
});

const styles = StyleSheet.create({
    classText: {
        justifyContent: 'flex-start',
        textAlign: 'left',
        paddingLeft:15,
        paddingTop: 15,
        color: theme.colors.white,
        fontSize: 16
        //text formatting here
    },
    professorText: {
        position: "absolute",
        bottom: 10,
        right: 0,
        color: theme.colors.white,
        fontSize: 14
        //text formatting here
    },
    gradeText: {
        fontSize: 26,
        marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        //text formatting here
    },
    percentTypeText: {
        fontSize: 11,
        textAlign: 'center',
        fontStyle: "italic"
        //text formatting here
    },
    gradesContainer: {
        fontSize: 48,
        marginTop: 10,
        display: 'flex',
        height: 100,
        flex: 0.2,
        fontWeight: 'bold',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: theme.colors.white,
        borderWidth: 3,
        borderRadius: 2.5

    },
    classContainer: {
        fontSize: 48,
        marginTop: 10,
        display: 'flex',
        height: 100,
        flex: .7,
        fontWeight: 'bold',
        alignItems: "flex-start",
        justifyContent: 'center',
        borderRadius: 2.5,
    },
    gradesTextContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "space-around",
        textAlignVertical: 'top'
        
    },classTextContainer: {
        flex: 1,
        width: "90%",
        
    },
    secretContainer: {
        backgroundColor: theme.colors.gray,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 100,
        height: 30
    },
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
      sportsContainer: {
        flex: .3,
        height: 100,
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
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: theme.colors.white,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 100
  
      },
      diningContainer: {
        flex: .3,
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
      logoSports:
      {
        width: 50,
        height: 50,
        alignSelf:"center",
      },
      newsLogo:
      {
        width: 50,
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
        justifyContent: "flex-start",
        textAlign: 'left',
        marginLeft: 10,
        flex: 1

        
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
        textAlign: 'center',
        color: "#000"
        //text formatting here
    },
    textDisabled: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        color: "#888"
        //text formatting here
    },
    newsLabel: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        textAlign: 'left'
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
        textAlign: 'left',
        height: 'auto',
        fontSize: 10
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
        paddingTop: 10,
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
        justifyContent: "space-between",
        
    }
  });