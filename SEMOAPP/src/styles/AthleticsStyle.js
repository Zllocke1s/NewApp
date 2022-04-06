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
        justifyContent: 'flex-start',
        
      },container2: {
        flex: 1,
        width: "90%",
        marginTop: 20,
        marginBottom: 50,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray2,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start'
      },
      tileContainer: {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 10
      },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    headerContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: theme.colors.red,
        margin: 10,
        justifyContent: "space-evenly",
        paddingTop: 35
    },
    row1: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    
    row2: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundColor: theme.colors.gray2,
        justifyContent: "space-around",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 10
    },
    quote: {
        marginLeft: 20,
        marginRight: 10,
        fontSize: 16,
        flex: 1
    },
    hoursButton: {
        backgroundColor: theme.colors.gray,
        justifyContent: "flex-end",
        paddingBottom: 6,
        alignItems: "center",
        fontWeight: "bold",
        width: 75,
        paddingTop: 6,
    },
    upcomingContainer: {
        backgroundColor: theme.colors.gray,
        width: "100%",
        marginTop: 10,
    },

    title: {
        fontSize: 25,
        marginLeft: 9,
        color: theme.colors.black
    },
    hidden:
    {
        display: 'none'
    },
    scheduleContainer: {
        width: "100%",
        flex: 0.5
    },
    
    classContainer: {
        width: "90%",
        flex: 0.95,
        backgroundColor: theme.colors.gray
    },
    
    titleActive: {
        fontSize: 25,
        marginLeft: 9,
        color: theme.colors.red,
        textDecorationLine: 'underline'
    },
    fullSchedule: {
        backgroundColor: theme.colors.gray3,
        justifyContent: "flex-end",
        alignSelf: "flex-end",
        margin: 8,
        padding: 5,
        borderRadius: 2,
    },
    fullScheduleText: {
        color: theme.colors.gray
    },
    items:
    {
        width: "100%",
        backgroundColor: theme.colors.gray,
        flex: 1
    },



    
    infoContainer: {
        backgroundColor: theme.colors.gray,
        width: "100%",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    individualContainer: {
        marginTop: 15
    },
    
    textTitle: {
        fontSize: 25,
        marginTop: 9,
        marginBottom: 10,
        textAlign: "center"
    },
    address: {
        marginTop: 5,
        fontSize: 12,
        marginBottom: 20,
    },
    hours: {
        fontWeight: "bold"
    },
    hoursContainer: {
        display: "flex",
        flexDirection: "row",

        justifyContent: "center"
    },
    dates: {
        display: "flex",
        flexDirection: "column",
        flex: 0.4,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 10,
        borderRightWidth: 2,
        borderRightColor: theme.colors.gray4
    },
    hoursListed: {
        flex: 0.6,
        marginLeft: 10,
    },
    facilityContainer: {
        marginTop: 20,
        textAlign: 'center',
        alignItems: "center",
    },
    scrollable: {
        width: "100%"
    },
    facility: {

    }
    

  });
  