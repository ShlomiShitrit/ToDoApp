import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Text, ListItem, Icon, Button} from '@rneui/themed';
import Tasks from '../Tasks/Tasks';
import {CategoryScreenProps, ITask} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import AddTaskDialog from '../Dialogs/AddTaskDialog';
import {API_HOST} from '@env';

const windowHeight = Dimensions.get('window').height;

export default function CategoriesScreen({
  category,
  isSubCategory,
}: CategoryScreenProps): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [iaEditMode, setIsEditMode] = useState<boolean>(false);

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
        data.reverse();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [userToken, category, isSubCategory, isUpdate]);

  return (
    <View style={styles.container}>
      <Text h2 h2Style={styles.text}>
        {category?.name}
      </Text>
      <View style={styles.iconscontainer}>
        <Icon
          style={styles.plusIcon}
          onPress={() => setOpen(true)}
          name="plus"
          type="ant-design"
        />
        <Button
          size="sm"
          containerStyle={styles.button}
          title="Edit mode"
          titleStyle={styles.buttonTitle}
          onPress={() => setIsEditMode(!iaEditMode)}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {Array.isArray(tasks) && tasks.length > 0 && tasks ? (
          <Tasks
            tasks={tasks}
            category={category}
            isSubCategory={isSubCategory}
            isEditMode={iaEditMode}
            onUpdate={() => setIsUpdate(!isUpdate)}
          />
        ) : (
          <>
            <ListItem containerStyle={styles.listItemContainer}>
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={styles.listTitle}>No tasks yet</Text>
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </>
        )}
        <AddTaskDialog
          open={open}
          onBackPress={() => setOpen(false)}
          onUpdate={() => setIsUpdate(!isUpdate)}
          category={category}
          isSubCategory={isSubCategory}
          method={'POST'}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.8,
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: '10%',
    paddingHorizontal: '10%',
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
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
  listTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconscontainer: {
    flexDirection: 'row',
  },
  plusIcon: {},
  button: {
    marginLeft: '75%',
    borderRadius: 20,
  },
  buttonTitle: {
    fontSize: 13,
    color: 'white',
  },
});
