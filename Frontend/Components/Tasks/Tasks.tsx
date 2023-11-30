import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Icon, ListItem, Text} from '@rneui/themed';
import {ITask, TasksProps} from '../../general/interfaces';
import useLang from '../../hooks/useLang';
import AddTaskDialog from '../Dialogs/AddTaskDialog';
import DeleteCategoryDialog from '../Dialogs/DeleteCategoryDialog';
import {useAppSelector} from '../../hooks/store';
import {getTasks, checkTask, deleteTask} from '../../general/api';

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
    getTasks(category, userToken, isSubCategory, setTasks);
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
                <View>
                  <View style={styles.rowContainer}>
                    {dir === 'ltr' ? (
                      <ListItem.CheckBox
                        containerStyle={styles.checkBoxContainerLtr}
                        checkedColor="white"
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checked={task?.checked}
                        onPress={() =>
                          checkTask(
                            task,
                            tasks,
                            setTasks,
                            isSubCategory,
                            category,
                            userToken,
                          )
                        }
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
                    <ListItem.Title style={styles.listTitleContainer}>
                      <Text
                        numberOfLines={3}
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
                        onPress={() =>
                          checkTask(
                            task,
                            tasks,
                            setTasks,
                            isSubCategory,
                            category,
                            userToken,
                          )
                        }
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
                  <ListItem.Subtitle
                    style={
                      task?.checked
                        ? styles.listSubtitleChecked
                        : styles.listSubtitle
                    }>
                    {task?.date === undefined
                      ? ''
                      : `Date: ${task?.date
                          .split('T')[0]
                          .split('-')
                          .reverse()
                          .join('/')}`}
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
              editHandler={() => deleteTask(task, tasks, setTasks, userToken)}
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
    paddingBottom: 20,
  },
  alignItemsRtl: {
    alignItems: 'flex-end',
  },
  alignItemsLtr: {
    alignItems: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
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
    paddingTop: '2%',
    paddingBottom: '5%',
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
    justifyContent: 'flex-end',
  },
  editIconContainerRtl: {
    flexDirection: 'row',
  },
  editIconContainerLtr: {
    flexDirection: 'row',
  },
  editIcon: {
    marginRight: windowWidth * 0.04,
  },
  listTitleContainer: {
    width: '70%',
  },
  noItemContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#262c2e',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
