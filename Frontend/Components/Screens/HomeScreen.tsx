import React from 'react';
import {Text} from '@rneui/themed';
import {useAppSelector} from '../../hooks/store';
import {View, StyleSheet} from 'react-native';

export default function HomeScreen(): JSX.Element {
  const userFirstName = useAppSelector(state => state.user.firstName);
  const userLastName = useAppSelector(state => state.user.lastName);
  return (
    <View style={styles.container}>
      <Text h1>{`Welcome ${userFirstName} ${userLastName}`}</Text>
      <Text h4 h4Style={styles.text}>
        Home Page
      </Text>
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
