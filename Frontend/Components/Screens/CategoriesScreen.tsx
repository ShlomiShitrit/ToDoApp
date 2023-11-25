import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@rneui/themed';
import Tasks from '../Tasks/Tasks';
import {CategoryScreenProps, ITask} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {API_HOST} from '@env';

export default function CategoriesScreen({
  category,
  isSubCategory,
}: CategoryScreenProps): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const userToken = useAppSelector(state => state.user.token);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = isSubCategory
          ? `SubCategory/${category?.id}/tasks`
          : `Category/${category?.id}/tasks`;
        const response = await fetch(`${API_HOST}api/` + url, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [userToken, category, isSubCategory]);

  return (
    <View style={styles.container}>
      <Text h2 h2Style={styles.text}>
        {`Category: ${category?.name}`}
      </Text>
      <ScrollView style={styles.scrollView}>
        <Tasks
          tasks={tasks}
          category={category}
          isSubCategory={isSubCategory}
        />
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
