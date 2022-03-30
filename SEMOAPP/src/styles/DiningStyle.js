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
        width: '50%',
        marginRight: 200
    },
    diningTileSub: {
        flexDirection: "column",
        width: 375,
        height: 600,
        padding: 10
    },
    headerContainer: {
        flex: .50,
        backgroundColor: theme.colors.red,
        padding: 35
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
    },
    choiceTitle: {
        fontSize: 35,
        flex: 1,
        marginTop: 25,
        paddingLeft: 5,
    },
  });