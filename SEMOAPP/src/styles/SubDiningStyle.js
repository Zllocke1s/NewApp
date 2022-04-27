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
        backgroundColor: theme.colors.gray,
        padding: 10,
        borderRadius: 5,
    },
    title:{
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.red,
        textAlignVertical: "center",
    },
    headerSubContainer: {
        flexDirection: "column",
        display: "flex",
        width: "100%",
        textAlignVertical: "center",
        alignItems: "center",
        justifyContent: "center",

        paddingTop: 20,
        paddingBottom: 20,
    },
    headerTileContainerContainer: {
        flexDirection: "column",
        marginTop: 10,
        width: "95%",
        backgroundColor: theme.colors.gray,
        padding: 10,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    headerTileContainer: {
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    hTLogo: {
        width: 40,
        height: 41,
    },
    mealContainer: {
        width: "95%",
        marginTop: 10,
        backgroundColor: theme.colors.gray,
        flex: 1,
        borderRadius: 5,
        marginBottom: 5,
    },
    categoryTitle: {
        fontSize: 26,
        marginLeft: 15,
        marginTop: 5,
    },
    item: {
        fontSize: 14,
        marginLeft: 35,
        paddingTop: 15
    },
    itemContainer: {
        marginLeft: 30,
    },
    hours: {
        
    }
  });
  