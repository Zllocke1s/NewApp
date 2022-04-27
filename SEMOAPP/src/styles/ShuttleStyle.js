import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray,
        width: "100%",
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start'
      },
      headerContainer: {
        flex: .15,
        backgroundColor: theme.colors.red,
        padding: 10
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35,
        marginTop: 20
    },
    title: {
        fontSize: 36,
        color: theme.colors.gray
    },
    
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35
    },
    tabContainer: {
        marginBottom: -3,
        paddingBottom: 0,
        paddingTop: 10,
        width: "100%",
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
    wingsActive: {
        padding: 10,
        backgroundColor: theme.colors.black,
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
        width: "100%",
        flex: 1
    },
    routeContainer: {
        margin: 10,
        width: "100%",
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
    },
    hidden: {
        display: "none"
    },
    error: {
        backgroundColor: "#ffffff",
        padding: 5,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    snapButton: {
        backgroundColor: theme.colors.red
    }
    
  });
  