import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';

//Todo: Tiling News through the tile


export const Lab = (({auth, item}) => {


    const [stats, setStats] = React.useState({
        online: 0,
        offline: 0,
        total: 0,
        inUse: 0
    })
    
    React.useEffect(() => {
        fetch('https://portal.labstats.com/api/public/GetPublicApiData/' + item.id, {headers: {
            'Authorization': auth
        }})
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          setStats({
              online: json.Groups[0].TurnedOn,
              offline: json.Groups[0].Offline,
              inUse: json.Groups[0].InUse,
              total: json.Groups[0].Total
          })
        }
          )
        .catch((error) => {
          console.error(error);
        });
        
    
      }, [])
    
      React.useEffect(() => {
        const interval = setInterval(() => {
          console.log("Refreshing Hours")
          fetch('https://portal.labstats.com/api/public/GetPublicApiData/' + item.id, {headers: {
            'Authorization': auth
        }})
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
        }
          )
        .catch((error) => {
          console.error(error);
        });
        }, 15000);
        return () => clearInterval(interval);
      })

    const [isOpen, toggleDet] = React.useState(false)

        return(
            <TouchableOpacity onPress={() => {
                toggleDet(!isOpen)
            }}
             style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                    <View style={styles.barContainer}>
                        <Text style={styles.barLabel}>Status</Text>
                    <View style={styles.barHolder}>
                        <View style={[styles.bar, {width: (((stats.online-stats.inUse)*100/stats.online).toFixed().toString() + "%")}]}>
                        </View>
                        <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.label}>{(stats.total!=0) ? ((stats.online-stats.inUse)*100/stats.online).toFixed() + "% Open" : ""}</Text>
                    </View>
                    </View>
                </View>
                </View>
                <View style={!isOpen ? styles.hidden : styles.detailsContainer}>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Online: </Text>
                    <Text style={styles.detail}>{stats.online}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Offline: </Text>
                    <Text style={styles.detail}>{stats.offline}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>Total: </Text>
                    <Text style={styles.detail}>{stats.total}</Text>
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.detailLabel}>In Use: </Text>
                    <Text style={styles.detail}>{stats.inUse}</Text>
                </View>
                </View>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    barContainer: {
        flex: 0.4,
        
    },
    barLabel: {
        justifyContent: "center",
        alignSelf: "center"
    },
    barHolder: {
        backgroundColor: theme.colors.gray2,
        borderRadius: 10,
        width: "100%",
        flex: 1
    },
    bar: {
        width: "100%",
        backgroundColor: theme.colors.red,
        flex: 1,
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        flex: .05,
        fontSize: 48,
        paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        margin: 0,
        backgroundColor: theme.colors.gray,
        marginTop: 10,
        padding: 10,
        borderRadius: 4,
        width: "90%"
  
      },
    textContainer: {
        padding: 0,
        alignSelf: "flex-start",  
        display: "flex",
        flexDirection: "row"      
    },
    text: {
        fontSize: 26,
        flex: 0.6,
        fontWeight: "bold"
        //text formatting here
    },
    hidden: {
        width: 0,
        display: "none"
    },
    detailsContainer: {
            marginLeft: 10,
    },
    detailContainer: {
        display: "flex",
        flexDirection: "row"
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: "bold"
    },
    detail: {
        fontSize: 16
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
  });