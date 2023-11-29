import React, {useState, useEffect} from 'react';
import {Text, ListItem} from '@rneui/themed';
import {useAppSelector} from '../../hooks/store';
import {EMPTY_WEEKLY_TASKS} from '../../general/resources';
import {ITask} from '../../general/interfaces';
import {View, ScrollView, StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

export default function HomeScreen(): JSX.Element {
  const [weeklyTasks, setWeeklyTasks] = useState<ITask[]>(EMPTY_WEEKLY_TASKS);
  const [categoryTasks, setCategoryTasks] =
    useState<ITask[]>(EMPTY_WEEKLY_TASKS);
  const [subCategoryTasks, setSubCategoryTasks] =
    useState<ITask[]>(EMPTY_WEEKLY_TASKS);

  const userFirstName = useAppSelector(state => state.user.userInfo.firstName);
  const userLastName = useAppSelector(state => state.user.userInfo.lastName);

  useEffect(() => {
    // TODO: Get all tasks of the user from API
    // callback to setCategoryTasks and setSubCategoryTasks
    // filter the tasks by date - only the upcoming week tasks
  }, []);

  useEffect(() => {
    setWeeklyTasks([...categoryTasks, ...subCategoryTasks]);
  }, [categoryTasks, subCategoryTasks]);

  const date = new Date();
  return (
    <View style={styles.container}>
      <Text
        h1
        h1Style={
          styles.title
        }>{`Welcome ${userFirstName} ${userLastName}`}</Text>
      <Text h4 h4Style={styles.date}>
        {date.toLocaleDateString()}
      </Text>
      <View style={styles.taskContainer}>
        {weeklyTasks && Array.isArray(weeklyTasks) && weeklyTasks.length > 0 ? (
          <ScrollView style={styles.scrollViewContainer}>
            {weeklyTasks.map((task, index) => (
              <ListItem key={index} bottomDivider>
                <ListItem.Content>
                  <ListItem.Title style={styles.itemTitle}>
                    {task?.title}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.itemSubTitle}>
                    {task?.subTitle}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.itemDate}>
                    {date.toLocaleDateString()}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        ) : (
          <ListItem style={styles.noItemsContainer} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={styles.noItemTitle}>
                No more tasks this week!
              </ListItem.Title>
              <ListItem.Subtitle style={styles.noItemSubTitle}>
                Good job!
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: '8%',
    marginBottom: windowHeight * 0.7,
  },
  taskContainer: {
    width: '100%',
    marginTop: windowHeight * 0.05,
  },
  noItemsContainer: {
    width: '100%',
    height: windowHeight * 0.5,
    marginTop: windowHeight * 0.2,
  },
  scrollViewContainer: {
    width: '100%',
    height: windowHeight * 0.5,
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
  noItemTitle: {
    color: 'white',
    alignSelf: 'center',
    padding: '5%',
  },
  noItemSubTitle: {
    color: 'white',
    alignSelf: 'center',
    padding: '5%',
  },
  itemTitle: {
    color: 'white',
    alignSelf: 'flex-end',
    padding: '5%',
  },
  itemSubTitle: {
    color: 'white',
    alignSelf: 'flex-end',
    padding: '5%',
  },
  itemDate: {
    color: 'white',
    alignSelf: 'flex-end',
    padding: '5%',
  },
  date: {
    color: 'white',
    textAlign: 'center',
    marginTop: windowHeight * 0.05,
  },
});
