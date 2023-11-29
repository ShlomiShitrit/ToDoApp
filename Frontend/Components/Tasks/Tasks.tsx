import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Icon, ListItem, Text} from '@rneui/themed';
import {ITask, TasksProps} from '../../general/interfaces';
import useLang from '../../hooks/useLang';
import {API_HOST} from '@env';
import AddTaskDialog from '../Dialogs/AddTaskDialog';
import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';
import {useAppSelector} from '../../hooks/store';

const windowWidth = Dimensions.get('window').width;

export default function Tasks({
  isUpdate,
  category,
  isSubCategory,
  isEditMode,
  onUpdate,
}: TasksProps): JSX.Element {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [openEditDialogs, setOpenEditDialogs] = useState<boolean[]>([]);
  const [openDeleteDialogs, setOpenDeleteDialogs] = useState<boolean[]>([]);

  const userToken = useAppSelector(state => state.user.token);

  const {dir} = useLang();

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

  useEffect(() => {
    setOpenEditDialogs(Array(tasks.length).fill(false));
    setOpenDeleteDialogs(Array(tasks.length).fill(false));
  }, [tasks]);

  const toggleEditDialog = (index: number, toggleTo: boolean) => {
    const updatedOpenDialogs = [...openEditDialogs];
    updatedOpenDialogs[index] = toggleTo;
    setOpenEditDialogs(updatedOpenDialogs);
  };
  const toggleDeleteDialog = (index: number, toggleTo: boolean) => {
    const updatedOpenDialogs = [...openDeleteDialogs];
    updatedOpenDialogs[index] = toggleTo;
    setOpenDeleteDialogs(updatedOpenDialogs);
  };

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
          Authorization: `Bearer ${userToken}`,
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

  const deleteHandler = async (task: ITask) => {
    const updatedTasks = tasks.filter(t => t?.id !== task?.id);
    setTasks(updatedTasks);

    try {
      const response = await fetch(`${API_HOST}api/Task/${task?.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (response.ok) {
        console.log('Task deleted successfully');
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {tasks && Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <View key={index}>
            <ListItem
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
                  {isEditMode && dir === 'rtl' ? (
                    <View style={styles.editIconContainerRtl}>
                      <Icon
                        name="edit"
                        type="materialIcon"
                        style={styles.editIcon}
                        onPress={() => toggleEditDialog(index, true)}
                      />
                      <Icon
                        name="delete"
                        type="materialIcon"
                        onPress={() => toggleDeleteDialog(index, true)}
                      />
                    </View>
                  ) : null}
                  <ListItem.Title>
                    <Text
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      style={
                        task?.checked
                          ? styles.listTitleChecked
                          : styles.listTitle
                      }>
                      {task?.title}
                    </Text>
                  </ListItem.Title>
                  {isEditMode && dir === 'ltr' ? (
                    <View style={styles.editIconContainerLtr}>
                      <Icon
                        name="edit"
                        type="materialIcon"
                        style={styles.editIcon}
                        onPress={() => toggleEditDialog(index, true)}
                      />
                      <Icon
                        name="delete"
                        type="materialIcon"
                        onPress={() => toggleDeleteDialog(index, true)}
                      />
                    </View>
                  ) : null}
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
                <View style={styles.subTitleContainer}>
                  <ListItem.Subtitle
                    style={
                      task?.checked
                        ? styles.listSubtitleChecked
                        : styles.listSubtitle
                    }>
                    {task?.subTitle}
                  </ListItem.Subtitle>
                </View>
              </ListItem.Content>
            </ListItem>
            <AddTaskDialog
              open={openEditDialogs[index]}
              onBackPress={() => toggleEditDialog(index, false)}
              onUpdate={onUpdate}
              category={category}
              isSubCategory={isSubCategory}
              method={'PUT'}
              task={task}
            />
            <DeleteCategoryDialog
              open={openDeleteDialogs[index]}
              onBackPress={() => toggleDeleteDialog(index, false)}
              editHandler={() => deleteHandler(task)}
            />
          </View>
        ))
      ) : (
        <ListItem containerStyle={styles.noItemContainer}>
          <ListItem.Content>
            <ListItem.Title>
              <Text style={styles.listTitle}>No tasks yet</Text>
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      )}
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
    paddingBottom: 40,
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
  subTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '85%',
    right: 0,
  },
  editIconContainerRtl: {
    flexDirection: 'row',
    marginRight: windowWidth * 0.05,
  },
  editIconContainerLtr: {
    flexDirection: 'row',
    marginLeft: windowWidth * 0.05,
  },
  editIcon: {
    marginRight: windowWidth * 0.04,
  },
  noItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
