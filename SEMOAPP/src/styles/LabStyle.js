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
    labContainer:
    {
        flex: 0.85,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
        width: "95%",
        margin: 10,
        backgroundColor: theme.colors.gray2,
        marginLeft: 20,
        marginRight: 20
    },
    scrollView: {
        width: "100%"
    }

  });
  