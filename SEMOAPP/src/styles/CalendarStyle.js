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
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
            flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.medBlue,
    },
    inputLabel: {
      fontSize: 20,
      
    },
    subContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: "80%",
      fontSize: 18,

      
    },
    input: {
      fontSize: 20,
      marginLeft: 5,
      height: 50,
      flex: 1,
      marginTop: 10,
      backgroundColor: theme.colors.gray,
      borderRadius: 8,
      padding: 5


    },
    largeInput: {
      fontSize: 20,
      marginLeft: 5,
      height: 200,
      textAlignVertical: 'top',
      flex: 1,
      marginTop: 10,
      backgroundColor: theme.colors.gray,
      borderRadius: 8,
      padding: 5


    },
    inputContainer: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: 18,
      flex: 1,

    },
    advScrollView: {
      width: Dimensions.get("window").width,
      display: "flex",
      flexDirection: "column",
     // backgroundColor: "#ff0000",
      alignItems: "center",
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
    calendarHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      width: "70%",
      paddingBottom: 15,
      paddingTop: 10,
      height: "auto",
      margin: 0,
      textAlign: "center",
      
    },map: {
      width: Dimensions.get('window').width,
      flex: 1,
      
    },
    welcome: {
      marginTop: 30,
      color: theme.colors.black,
      flex: 0.1,
      fontSize: 25,
      fontFamily: 'SulphurPoint-Bold',
    },
    calendarDateHeader: {
      fontFamily: 'SulphurPoint-Bold',
      fontSize: 36,
      color: theme.colors.white,
      textAlign: "center",
      justifyContent: "center",
      alignSelf: "center",
      alignItems: "center",
      alignContent: "center",
      marginBottom: 20,
      
    },nextB: {
      borderRadius: 50,
        backgroundColor: theme.colors.darkBlue,
        color: theme.colors.black,
        fontFamily: 'SulphurPoint-Bold',   
        width: 50,
        justifyContent: "center",
        height: 40,

        padding: 0,
        marginLeft: 20,
  },
  prevB: {
    borderRadius: 50,
      backgroundColor: theme.colors.darkBlue,
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Bold',   
      width: 50,
      height: 40,
      justifyContent: "center",
      margin: 0,
      padding: 0,
      marginRight: 20,
},
    CalBox: {
      flex: 2,
      width: '100%',
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: theme.colors.darkBlue,
      borderBottomWidth: 0,
      fontFamily: 'SulphurPoint-Regular',
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    ListBox: {
      flex: 0.8,
      width: '100%',
      backgroundColor: theme.colors.lightBlue,
      
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
      width: "100%",
      
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
        color: "#ff0000",
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
      backgroundColor: "#FF9999",
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Regular',   
      width: '40%',
      borderColor: theme.colors.black,
      fontSize: 18,
      borderWidth: 2
      
      
  },submit: {
    height: 'auto',
    borderRadius: 30,
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.black,
    marginTop: 60,
    fontFamily: 'SulphurPoint-Regular',   
    width: '60%',
    borderColor: theme.colors.black,
    fontSize: 18,
    borderWidth: 2
    
    
},
  showCompleteButton: {
    height: 'auto',
    borderRadius: 30,
    backgroundColor: theme.colors.lightGreen,
    color: theme.colors.black,
    fontFamily: 'SulphurPoint-Regular',   
    width: '50%',
    borderColor: theme.colors.black,
    fontSize: 15,
    borderWidth: 2,
    marginLeft: 40,
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
  noSucc: {
    display: "none"
  },
  succ: {
    display: "flex"
  }
  });