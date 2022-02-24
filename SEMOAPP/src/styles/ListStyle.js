import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../core/theme'

export const styles = StyleSheet.create({
    
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0   
    },
    bar:
  {
    backgroundColor: theme.colors.darkBlue,
    borderRadius: 4,
    flex: 50

  },
  barBackground:
  {
    width: "100%",
    backgroundColor: theme.colors.lightBlue,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20
  },
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
            flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.medBlue,
    },
    advScrollView: {
      width: Dimensions.get("window").width,
      display: "flex",
      flexDirection: "column",
     // backgroundColor: "#ff0000",
      alignItems: "stretch",
      paddingBottom: 100,
    },
    advScrollViewHeight: {
      height: 10
    },
    ListHeading: {
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'SulphurPoint-Bold',
      fontSize: 30,
      textDecorationLine: 'underline',
      marginBottom: 20,
      paddingLeft: 10,
      paddingRight: 10,
      
      color: theme.colors.darkBlue
    },
    ListPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
      fontFamily: 'SulphurPoint-Regular',
      flexDirection: 'row-reverse',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
      fontFamily: 'SulphurPoint-Regular',
    },
    label: {
      color: theme.colors.secondary,
      fontFamily: 'SulphurPoint-Regular',
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily: 'SulphurPoint-Regular',
    },
    welcome: {
      fontSize: 30,
      fontFamily: 'SulphurPoint-Bold',
      marginTop: 70,
      marginBottom: 30,
      color: theme.colors.black,
      flex: 0.1
    },
    barHolder: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    //  backgroundColor: "#00FF00",
      justifyContent: "center"
    },
    ListBox: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.white,
      padding: 10,
      borderWidth: 1,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: theme.colors.darkBlue,
      borderBottomWidth: 0,
      fontFamily: 'SulphurPoint-Regular',
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    scrollViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: "100%"
      
    },
    registerSubmissions: {

    },
    logoutButton: {
        height: 'auto',
        borderRadius: 20,
        backgroundColor: theme.colors.lightGreen,
        color: theme.colors.black,
        fontFamily: 'SulphurPoint-Bold',   
        width: 'auto',
        position: 'absolute',
        right: 10,
        top: 30,
        
    },
    registerField: {
        borderRadius: 20,
        color: theme.colors.lightRed,
        fontFamily: 'SulphurPoint-Regular',
        
    },
    buttonHolder: {
      display: "flex",
      flexDirection: "row",
      width: "70%",
    //  backgroundColor: "#00FF00",
      justifyContent: "center"
    },
    leave: {
      height: 'auto',
      borderRadius: 30,
      backgroundColor: theme.colors.lightGreen,
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Regular',   
      width: '40%',
      borderColor: theme.colors.black,
      fontSize: 18,
      borderWidth: 2
      
      
  },
  nextB: {
    borderRadius: 50,
      backgroundColor: theme.colors.darkBlue,
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Bold',   
      width: 50,
      justifyContent: "center",
      margin: 0,
      padding: 0,
},
hideCompleteButton: {
  display: "none",
  
  
  
},
  advBoxShow: {
    display: "flex",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height-200,
    zIndex: 1000,
    borderRadius: 0,
    alignItems: "center",
    elevation: 25,
    justifyContent: "center",
  },
  advBoxHide: {
    display: "none"
  },
  });