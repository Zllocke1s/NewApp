import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start'
      },
      container2: {
        flex: 1,
        width: "90%",
        margin: 10, 
        marginTop: 50,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray2,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start'
      },
    headerContainer: {
        marginTop: 10,
        width: "95%",
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
        backgroundColor: theme.colors.gray,
        padding: 10,
        borderRadius: 5
    },
    title:{
        fontSize: 30,
        fontWeight: "bold"
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35
    },
    tabContainer: {
        paddingTop: 10,
        marginTop: 10,
        marginBottom: -3,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    redActive: {
        padding: 10,
        backgroundColor: theme.colors.red,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    greenActive: {
        padding: 10,
        backgroundColor: theme.colors.green,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    blueActive: {
        padding: 10,
        backgroundColor: theme.colors.blue,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    inactive: {
        padding: 10,
        backgroundColor: theme.colors.gray3,
        width: 100,
        justifyContent: "center",
        alignItems: "center"
    },
    tabTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.gray,
        marginTop: 0
    },
    infoContainer: {
        width: "100%",
        backgroundColor: theme.colors.gray,
        borderTopWidth: 15,
        borderWidth: 5,
        flex: 1
    },
    routeContainer: {
        margin: 10,
        marginLeft: 20,
        flex: 0.4,

    },
    routeTitle: {
        fontSize: 22
    },
    routeText: {
        fontSize: 16,
    },
    mapContainer: {
        flex: 1,
        margin: 10,
        marginTop: 10,
    },
    map: {
        flex: 1
    }
  });
  