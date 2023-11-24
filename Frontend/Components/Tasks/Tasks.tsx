import React from 'react';
import {StyleSheet} from 'react-native';
import {ListItem} from '@rneui/themed';
import {TasksProps} from '../../general/interfaces';

export default function Tasks({tasks}: TasksProps): JSX.Element {
  return (
    <>
      {tasks.map(task => (
        <ListItem key={task?.id} containerStyle={styles.listItem}>
          <ListItem.Content>
            <ListItem.Title style={styles.listTitle}>
              {task?.title}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.listSubtitle}>
              {task?.subTitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listSubtitle: {
    color: 'white',
    fontSize: 14,
  },
});
