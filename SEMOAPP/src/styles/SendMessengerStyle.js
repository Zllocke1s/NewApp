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
    submit: {
      height: 'auto',
      borderRadius: 30,
      backgroundColor: theme.colors.lightGreen,
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Regular',   
      width: '40%',
      borderColor: theme.colors.black,
      fontSize: 18,
      borderWidth: 2
      
      
  },deny: {
    height: 'auto',
    borderRadius: 30,
    backgroundColor: theme.colors.lightRed,
    color: theme.colors.black,
    marginTop: 60,
    marginRight: 10,
    fontFamily: 'SulphurPoint-Regular',   
    width: '60%',
    borderColor: theme.colors.black,
    fontSize: 18,
    borderWidth: 2
    
    
},
  headCont: {
    display: "flex",
    flexDirection: "column",
    flex: 0.4,
    overflow: "visible"
  },
    input: {
      fontSize: 20,
      marginLeft: 5,
      textAlignVertical: 'top',
      backgroundColor: theme.colors.gray,
      height: "100%",


    },
    inputContainer: {
      fontSize: 20,
      marginLeft: 5,
      height: "100%",
      textAlignVertical: 'top',
      flex: 1,
      backgroundColor: theme.colors.gray,


    },
    inputContainerHidden: {
      justifyContent: 'center',
      flexDirection: 'column',
      width: "80%",
      alignItems: 'center',
      fontSize: 18,
      flex: 1,
    },
    containerShow: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
            flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.medBlue,
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
  messageContainer: {
    height: "70%",
    width: '100%',
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-around",
    
  },
  nameScrollView: {
    backgroundColor: theme.colors.lightBlue,
    
  },
  scrollViewContainer: {
    backgroundColor: theme.colors.lightBlue,
    width: "50%",
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
    welcome: {
      overflow: "visible",
      fontSize: 30,
      fontFamily: 'SulphurPoint-Bold',
      marginTop: 60,
      zIndex: 500,
      color: theme.colors.black,
      flex: 1
    },
    welcomeDetail: {
      overflow: "visible",
      fontSize: 30,
      fontFamily: 'SulphurPoint-Bold',
      marginTop: 60,
      zIndex: 500,
      color: theme.colors.black,
      flex: 0.15
    },
    welcomeSub: {
      overflow: "visible",
      fontSize: 20,
      fontFamily: 'SulphurPoint-Regular',
      marginTop: 0,
      color: theme.colors.black,
      flex: 0.2
    },
    welcomeSubDetail: {
      overflow: "visible",
      fontSize: 20,
      fontFamily: 'SulphurPoint-Regular',
      marginTop: 0,
      color: theme.colors.black,
      flex: 0.1
    },
    ListBox: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.white,
      paddingTop: 20,
      borderWidth: 1,
      alignItems: "center",
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: theme.colors.darkBlue,
      borderBottomWidth: 0,
      fontFamily: 'SulphurPoint-Regular',
      textAlignVertical: 'top'
      
      
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
      backgroundColor: "#ff0000",
      flexDirection: "row",
      width: "70%",
    //  backgroundColor: "#00FF00",
      justifyContent: "space-evenly"
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
      borderWidth: 2,
      
      
      
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
   
    backgroundColor: theme.colors.white,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 1000,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  advBoxHide: {
    display: "none"
  },
  });