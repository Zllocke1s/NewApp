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
  Schedule,
  RecHours,
  Facilities,
  FitnessClasses,
  IMSchedule,
  AboutUs
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
  IMSchedule,
  StuGov,
  Secret,
  Athletics,
  SubDining,
  Settings,
  Alerts,
  Schedule,
  RecHours,
  Facilities,
  FitnessClasses,
  AboutUs
  },
  {
    initialRouteName: 'AboutUs',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
