import { TouchableOpacity, Image, StyleSheet, Text, View, Touchable } from 'react-native';



export const Tile = (({name, src, fullscreen}) => {
    if(fullscreen)
    {
        return(<View style={styles.container}>
            <TouchableOpacity>
            <Image style={styles.fullLogo}
                   source={src}
           ></Image>
            </TouchableOpacity>
        </View>);
    }
    else
    {
        return(
            <TouchableOpacity style={styles.container}>
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

export const HeaderTile = (({name, src, fullscreen}) => {
    if(fullscreen)
    {
        return(<View style={styles.headerContainer}>
            <TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }
    else
    {
        return(
            <TouchableOpacity style={styles.headerContainer}>
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

const styles = StyleSheet.create({
    container: {
        flex: .3,
        height: 100,
        width: 500,
        fontSize: 48,
        paddingBottom: 10,
        fontWeight: 'bold',
        backgroundColor: '#fff',
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: 0
  
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
        width: 100,
        height: 85,
    },
    
    headerLogo: {
        width: 65,
        height: 65,
    },
    text: {
        //text formatting here
    }
  });