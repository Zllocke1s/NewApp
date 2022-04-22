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
        flex: 1
    },
    diningTileSub: {
        flexDirection: "column",
        width: "100%",
    },
    headerContainer: {
        backgroundColor: theme.colors.red,
        width: "100%",
        marginTop: 30,
        paddingTop: 20
     },
    choiceTitle: {
        fontSize: 35,
        paddingLeft: 5,
        flexShrink: 1
    },
    mealsRemaining: {
        fontSize: 18,
        paddingLeft: 5,
        flexShrink: 1
    },
  });