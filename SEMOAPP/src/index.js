import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing,
  CalendarPage,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  StuGov,
  Secret,
  Athletics,
  SubDining,
  Settings,
  Alerts,
  Schedule
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
  CalendarPage,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  StuGov,
  Secret,
  Athletics,
  SubDining,
  Settings,
  Alerts,
  Schedule
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
