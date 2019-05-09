/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
//import AppNavigator from './js/navigator/AppNavigator';
//import AppReactComponent from './js/navigator/ReactComponentNavigator'
import AppRedux from './js/pageRedux/App';

import {name as appName} from './app.json';


AppRegistry.registerComponent(appName, () => AppRedux);
