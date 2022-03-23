import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: theme.colors.gray1,
      alignItems: 'center',
      alignContent: "center",
      justifyContent: 'flex-start'
    },
    container2: {
        flex: 1,
        width: "90%",
        margin: 25,
        marginTop: 50,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray2,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start',
        borderRadius: 5
      },
      infoContainer: {
          flex: 1,
          borderWidth: 5,
          borderTopWidth: 20,
          width: "100%",
          fontSize: 48,
          fontWeight: 'bold',
          backgroundColor: theme.colors.gray,
          alignItems: 'center',
          alignContent: "center",
          justifyContent: 'flex-start',
        },
      title: {
        fontSize: 32,
        alignSelf: "center",
        fontWeight: "bold"
      },
    headerContainer: {
        width: "95%",
        margin: 10,
        backgroundColor: theme.colors.gray,
        padding: 10,

    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35
    },
    tabContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    tabTitle: {
        fontSize: 22,
        color: theme.colors.gray,
        fontWeight: "bold"
    },
    redActive: {
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.colors.red,
        justifyContent: "center",
        alignItems: "center",
    },
    greenActive: {
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.colors.green,
        justifyContent: "center",
        alignItems: "center"
    },
    blueActive: {
        width: 100,
        
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.colors.blue,
        justifyContent: "center",
        alignItems: "center"
    },
    inactive: {
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: theme.colors.gray3,
        justifyContent: "center",
        alignItems: "center"
    },
    routeContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20,
        margin: 10,
    },
    routeText: {
        fontFamily: "Times",
        fontSize: 22
    },
    mapContainer: {
        justifyContent: "flex-end",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        display: "flex",
        flex: 1
     },
    map: {
        width: "95%",
        height: 250,
        margin: 10,
        flex: 1
        
    }
  });
  