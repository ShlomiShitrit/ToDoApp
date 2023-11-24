import React from 'react';
import {Text} from '@rneui/themed';
import {useAppSelector} from '../../hooks/store';
import {View, StyleSheet} from 'react-native';

export default function HomeScreen(): JSX.Element {
  const userFirstName = useAppSelector(state => state.user.userInfo.firstName);
  const userLastName = useAppSelector(state => state.user.userInfo.lastName);
  const tasksNumber = 3; // TODO: get tasks number from store
  return (
    <View style={styles.container}>
      <Text
        h1
        h1Style={
          styles.title
        }>{`Welcome ${userFirstName} ${userLastName}`}</Text>
      <Text h4 h4Style={styles.text}>
        {`You have ${tasksNumber} tasks to complete`}
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
  title: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
