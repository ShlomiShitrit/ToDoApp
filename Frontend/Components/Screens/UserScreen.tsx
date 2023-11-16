import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function UserScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>User Page</Text>
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
