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
        marginBottom: 20,
        fontSize: 48,
        fontWeight: 'bold',
        backgroundColor: theme.colors.gray2,
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'flex-start'
      },
      headerContainer: {
        flexDirection: "row",
        width: "90%",
        backgroundColor: theme.colors.red,
        margin: 10,
        justifyContent: "space-evenly",
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 20,
        paddingBottom: 20
    },
    title: {
        fontSize: 36,
        color: theme.colors.gray
    },
    calContainer:
    {
        width: "90%",
        margin: 20,
        backgroundColor: theme.colors.gray,
        flex: 1,
        marginBottom: 20
    }
  });
  