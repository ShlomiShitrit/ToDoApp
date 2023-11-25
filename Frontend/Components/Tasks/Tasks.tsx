import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Text} from '@rneui/themed';
import {ITask, TasksProps} from '../../general/interfaces';
import useLang from '../../hooks/useLang';
import {API_HOST} from '@env';

export default function Tasks({
  tasks: initialTasks,
  category,
  isSubCategory,
}: TasksProps): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const {dir} = useLang();

  useEffect(() => {
    if (initialTasks && initialTasks.length > 0) {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  const checkTaskHandler = async (task: ITask) => {
    const updatedTasks = tasks.map(t =>
      t?.id === task?.id ? {...t, checked: !t?.checked} : t,
    );

    setTasks(updatedTasks);

    const taskToUpdate = isSubCategory
      ? {
          ...task,
          checked: !task?.checked,
          subCategoryId: category?.id,
        }
      : {
          ...task,
          checked: !task?.checked,
          categoryId: category?.id,
        };

    try {
      const response = await fetch(`${API_HOST}api/Task/${task?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToUpdate),
      });
      if (response.ok) {
        console.log('Task updated successfully');
      } else {
        console.log('Task update failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {tasks.map(task => (
        <ListItem
          key={task?.id}
          containerStyle={[
            styles.container,
            dir === 'rtl' ? styles.alignItemsRtl : styles.alignItemsLtr,
          ]}>
          <ListItem.Content>
            <View style={styles.rowContainer}>
              {dir === 'ltr' ? (
                <ListItem.CheckBox
                  containerStyle={styles.checkBoxContainerLtr}
                  checkedColor="white"
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={task?.checked}
                  onPress={() => checkTaskHandler(task)}
                />
              ) : null}
              <ListItem.Title>
                <Text
                  style={
                    task?.checked ? styles.listTitleChecked : styles.listTitle
                  }>
                  {task?.title}
                </Text>
              </ListItem.Title>
              {dir === 'rtl' ? (
                <ListItem.CheckBox
                  containerStyle={styles.checkBoxContainerRtl}
                  checkedColor="white"
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon="checkbox-blank-outline"
                  checked={task?.checked}
                  onPress={() => checkTaskHandler(task)}
                />
              ) : null}
            </View>
            <ListItem.Subtitle
              style={
                task?.checked ? styles.listSubtitleChecked : styles.listSubtitle
              }>
              {task?.subTitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  alignItemsRtl: {
    alignItems: 'flex-end',
  },
  alignItemsLtr: {
    alignItems: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listTitleChecked: {
    color: 'grey',
    fontSize: 16,
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  listSubtitle: {
    color: 'white',
    fontSize: 14,
    marginRight: '10%',
    paddingTop: '2%',
  },
  listSubtitleChecked: {
    color: 'grey',
    fontSize: 14,
    paddingTop: '2%',
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginRight: '10%',
  },
  checkBoxContainerLtr: {
    backgroundColor: '#262c2e',
    paddingRight: '5%',
  },
  checkBoxContainerRtl: {
    backgroundColor: '#262c2e',
    paddingLeft: '5%',
  },
});
