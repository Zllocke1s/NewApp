import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Wrapper,
  Details,
  Cubimals,
  AdminList,
  EventSignup,
  Messenger,
  SendMessenger
} from './screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Wrapper,
    Details,
    Cubimals,
    AdminList,
    EventSignup,
    Messenger,
    SendMessenger
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
