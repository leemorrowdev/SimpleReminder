/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: notification => {},
  requestPermissions: Platform.OS === 'ios', // If firebase is not installed: https://github.com/zo0r/react-native-push-notification#usage
});

PushNotification.createChannel({
  channelId: 'simple-reminder',
  channelName: 'Simple Reminder',
});

AppRegistry.registerComponent(appName, () => App);
