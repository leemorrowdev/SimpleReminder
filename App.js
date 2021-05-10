/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

const colors = {
  primary: '#1292B4',
  white: '#FFF',
  lighter: '#F3F3F3',
  light: '#DAE1E7',
  dark: '#444',
  darker: '#222',
  black: '#000',
};

const App: () => Node = () => {
  const [interval, setInterval] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const onPress = () => {};

  return (
    <SafeAreaView
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.label}>Minutes</Text>
        <TextInput
          style={styles.input}
          keyboardType={'numeric'}
          onChangeText={_interval => setInterval(_interval)}
          value={interval}
          maxLength={15}
          selectionColor={colors.primary}
          disableFullscreenUI={true}
        />
        <Button onPress={onPress} title="Set Reminder" color={colors.primary} />
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
});

export default App;
