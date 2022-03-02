import { TouchableOpacity, Image, StyleSheet, Text, View, Touchable } from 'react-native';


export const Tile = (({name, icon, fullscreen}) => {
    if(fullscreen)
    {
        return(<View style={styles.container}>
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
            <TouchableOpacity style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        );
    
    }
});

export const HeaderTile = (({name, icon, fullscreen}) => {
    if(fullscreen)
    {
        return(<View style={styles.headerContainer}>
            <TouchableOpacity>
                <View style={styles.headerSubContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </TouchableOpacity>
        </View>);
    }
    else
    {
        return(
            <TouchableOpacity style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
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
      fontSize: 48,
      paddingBottom: 10,
      fontWeight: 'bold',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
      margin: 0

    },
    max: {
        width: "100%"
    },
    headerContainer: {
        flex: .5,
        flexDirection: "row",
        display: "flex",
        width: '100%',
        backgroundColor: "#C8102E",
        padding: 10,
        justifyContent: "center"
    },
    headerSubContainer:{
        backgroundColor: "#fff",
        flex: .8,
        flexDirection: "row",
        width: 100,
        height: 80,
        padding: 0,
        alignItems: "center",
        justifyContent: "center"
    },  
    textContainer: {
        padding: 0,
        alignSelf: "center"
    },
    text: {
        //text formatting here
    }
  });