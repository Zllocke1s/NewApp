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
    feedbackFooter: {
      backgroundColor: theme.colors.white,
      borderRadius: 10,
      fontSize: 16,
      fontFamily: "SulphurPoint-Regular",
      
    },
    feedback: {
      backgroundColor: theme.colors.gray,
      borderRadius: 10,
      fontSize: 24,
      fontFamily: "SulphurPoint-Regular",
      marginTop: 10,
      marginBottom: 15
      
    },feedbackCont: {
      backgroundColor: theme.colors.gray,
      borderRadius: 10,
      marginBottom: 30,
      margin: 0,
      padding: 10,
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center"
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
      padding: 5,
      width: "80%"

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
    question: {
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'SulphurPoint-Regular',
      fontSize: 16,
      textDecorationLine: 'none',
      marginBottom: 20,
      color: theme.colors.black
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
    profileHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "70%",
      paddingBottom: 5,
    },
    welcome: {
      marginTop: 30,
      color: theme.colors.black,
      flex: 0.1,
      fontSize: 25,
      fontFamily: 'SulphurPoint-Bold',
    },
    profileSubHeader: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "25%"
    },
    profileUsername: {
      fontFamily: 'SulphurPoint-Bold',
      fontSize: 36,
      color: theme.colors.white
    },
    profilePoints: {
      fontFamily: 'SulphurPoint-Regular',
      fontSize: 20,
      color: theme.colors.white
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
    buttonHolder2: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    //  backgroundColor: "#00FF00",
      justifyContent: "center"
    },
    leave: {
      height: 'auto',
      borderRadius: 30,
      backgroundColor: theme.colors.lightRed,
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
    width: '100%',
    borderColor: theme.colors.black,
    fontSize: 18,
    borderWidth: 2
    
    
},quiz: {
  height: 'auto',
  borderRadius: 30,
  backgroundColor: theme.colors.lightBlue,
  color: theme.colors.black,
  fontFamily: 'SulphurPoint-Regular',   
  width: 'auto',
  borderColor: theme.colors.black,
  fontSize: 12,
  alignSelf:'baseline',
  flexWrap: "wrap",
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