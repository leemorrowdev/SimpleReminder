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
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
  useColorScheme,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

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
  const [minutesText, setMinutesText] = useState();
  const [minutesReminder, setMinutesReminder] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const onSetReminderPressed = () => {
    BackgroundTimer.stopBackgroundTimer();
    if (minutesText) {
      setMinutesReminder(minutesText);
      BackgroundTimer.runBackgroundTimer(() => {
        Vibration.vibrate();
      }, minutesText * MILLISECONDS_IN_MINUTE);
    }
  };

  const onDisableReminderPressed = () => {
    BackgroundTimer.stopBackgroundTimer();
    setMinutesReminder(0);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.minutes}>
          <Text style={styles.highlightText}>{minutesReminder || 0}</Text>
          <Text style={isDarkMode ? styles.lightText : styles.darkText}>
            {' '}
            minutes
          </Text>
        </Text>
        <Text style={styles.label}>Minutes</Text>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          onChangeText={_minutesText => setMinutesText(_minutesText)}
          value={minutesText}
          maxLength={15}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lightBackground: {
    backgroundColor: colors.lighter,
  },
  darkBackground: {
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
    color: colors.white,
    backgroundColor: colors.dark,
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
  minutes: {
    marginVertical: 16,
    fontSize: 56,
  },
});

export default App;
