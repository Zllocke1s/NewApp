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
        padding: 10,
        width: "100%",
        justifyContent: "center"
    },
    headerSubContainer: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 36,
        color: theme.colors.gray
    },
    mapContainer: {
        flex: .95,
        width: "100%",
    },
    map: {
        width: "100%",
        flex: 1
    },
    legend: {
        position: "absolute",
        top: 5,
        left: 5,
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(235, 235, 235, 0.9)',
        borderRadius: 10,

    },
    legendOption: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingRight: 5,
        paddingLeft: 5,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10
    },
    input: {
        backgroundColor: "rgba(255,255,255,0.9)",
        color: theme.colors.red,
        borderRadius: 0
    },
    searchContainer: {
        flex: 0.05,
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: "50%"
    }
  });
  