/**
 * SimpleReminder
 * https://github.com/leemorrowdev/SimpleReminder
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

const colors = {
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000',
};

const MILLISECONDS_IN_MINUTE = 60000;

const App: () => Node = () => {
  const [minutesInput, setMinutesInput] = useState('');
  const [minutesReminder, setMinutesReminder] = useState('0');
  const [messageInput, setMessageInput] = useState('');
  const [messageReminder, setMessageReminder] = useState('');

  const isDarkMode = useColorScheme() === 'dark';

  const onSetReminderPressed = () => {
    PushNotification.cancelLocalNotifications({id: '0'});

    if (minutesInput) {
      const minutes = parseInt(minutesInput, 10);
      setMinutesReminder(minutes);

      setMessageReminder(messageInput);

      if (!minutes) {
        Alert.alert('Invalid input', '', [
          {
            text: 'OK',
          },
        ]);

        return;
      }

      PushNotification.localNotificationSchedule({
        id: '0', // Must be string integer
        channelId: 'simple-reminder',
        date: new Date(Date.now() + minutes * MILLISECONDS_IN_MINUTE), // Initial notification
        repeatType: 'time',
        repeatTime: minutes * MILLISECONDS_IN_MINUTE,
        title: 'Simple Reminder',
        message: messageInput, // Required
        allowWhileIdle: true,
      });
    }
  };

  const onDisableReminderPressed = () => {
    PushNotification.cancelLocalNotifications({id: '0'});
    setMinutesReminder('0');
    setMessageReminder('');
  };

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.darkerBackground : styles.lighterBackground,
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <View style={styles.reminder}>
          <Text style={styles.minutes}>
            <Text style={styles.highlightText}>{minutesReminder}</Text>
            <Text style={isDarkMode ? styles.lightText : styles.darkText}>
              {' '}
              {minutesReminder === 1 ? 'minute' : 'minutes'}
            </Text>
          </Text>
          <Text style={[styles.message, styles.highlightText]}>
            {messageReminder}
          </Text>
        </View>
        <Text style={styles.label}>Minutes</Text>
        <TextInput
          style={[
            styles.input,
            isDarkMode ? styles.darkBackground : styles.lightBackground,
            isDarkMode ? styles.lightText : styles.darkText,
          ]}
          keyboardType={'numeric'}
          onChangeText={_minutesInput => setMinutesInput(_minutesInput)}
          value={minutesInput}
          maxLength={4}
          selectionColor={colors.primary}
          disableFullscreenUI={true}
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[
            styles.input,
            isDarkMode ? styles.darkBackground : styles.lightBackground,
            isDarkMode ? styles.lightText : styles.darkText,
          ]}
          onChangeText={_messageInput => setMessageInput(_messageInput)}
          value={messageInput}
          maxLength={32}
          selectionColor={colors.primary}
          disableFullscreenUI={true}
        />
        <TouchableOpacity
          onPress={onSetReminderPressed}
          style={[styles.button, styles.contained]}>
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            SET REMINDER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDisableReminderPressed}
          style={[styles.button, styles.outlined]}>
          <Text style={styles.highlightText}>DISABLE REMINDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lightBackground: {
    backgroundColor: colors.light,
  },
  lighterBackground: {
    backgroundColor: colors.lighter,
  },
  darkBackground: {
    backgroundColor: colors.dark,
  },
  darkerBackground: {
    backgroundColor: colors.darker,
  },
  lightText: {
    color: colors.lighter,
  },
  darkText: {
    color: colors.darker,
  },
  highlightText: {
    color: colors.primary,
  },
  content: {
    margin: 48,
  },
  label: {
    color: colors.primary,
  },
  input: {
    borderRadius: 2,
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
    marginVertical: 16,
    paddingVertical: 8,
    borderRadius: 2,
  },
  contained: {
    backgroundColor: colors.primary,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  reminder: {
    marginVertical: 40,
  },
  minutes: {
    fontSize: 56,
  },
  message: {
    fontSize: 21,
  },
});

export default App;
