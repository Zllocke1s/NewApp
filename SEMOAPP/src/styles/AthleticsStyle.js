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
    }

  });
  