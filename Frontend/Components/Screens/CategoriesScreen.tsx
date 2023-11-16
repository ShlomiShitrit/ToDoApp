import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@rneui/themed';
import Tasks from '../Tasks/Tasks';
import {EMPTY_TASKS} from '../../general/resources';

export default function CategoriesScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text h1 h1Style={styles.text}>
        Categories Page
      </Text>
      <Text h2 h2Style={styles.text}>
        Category:
      </Text>
      <ScrollView style={styles.scrollView}>
        <Tasks tasks={EMPTY_TASKS} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  list: {
    flexGrow: 1,
    paddingTop: '10%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    marginTop: '10%',
    marginBottom: '20%',
  },
});
