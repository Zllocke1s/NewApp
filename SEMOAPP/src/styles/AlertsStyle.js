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
    tileContainer: {
        padding: 10,
        marginTop: 20,
        width: '95%',
        flex: 1,
    },
    headerContainer: {
        flex: .10,
        backgroundColor: theme.colors.red,
        width: "100%",
        padding: 35,
        paddingBottom: 10
    },
    headerSubContainer: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    alertsTitle: {
        fontSize: 35,
        paddingTop: 10
    }
  });