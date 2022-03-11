import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing,
  Calendar
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
    Calendar
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
