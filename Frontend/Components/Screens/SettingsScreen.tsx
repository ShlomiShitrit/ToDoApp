import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function SettingsScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
