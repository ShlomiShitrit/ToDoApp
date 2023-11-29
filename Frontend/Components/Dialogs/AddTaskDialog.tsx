import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Input} from '@rneui/themed';
import {AddTaskDialogProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {createTask} from '../../general/api';
import {
  postOrPutTaskObj,
  createTaskDataObj,
  createTaskObjCallback,
} from '../../general/types';

export default function AddTaskDialog({
  open,
  isSubCategory,
  onBackPress,
  onUpdate,
  category,
  method,
  task,
}: AddTaskDialogProps): JSX.Element {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskSubTitle, setTaskSubTitle] = useState<string>('');

  const userToken = useAppSelector(state => state.user.token);

  const generalData: postOrPutTaskObj = {
    isSubCategory,
    category,
    userToken,
    task,
    method,
  };

  const taskData: createTaskDataObj = {
    taskTitle,
    taskSubTitle,
  };

  const callbackObj: createTaskObjCallback = {
    setTaskTitle,
    setTaskSubTitle,
    onUpdate,
    onBackPress,
  };

  return (
    <Dialog isVisible={open} onBackdropPress={onBackPress}>
      <Dialog.Title title={'Add task'} />
      <Input
        labelStyle={styles.label}
        label={'Task name'}
        placeholder={'Grocery shopping'}
        onChangeText={setTaskTitle}
        value={taskTitle}
      />
      <Input
        labelStyle={styles.label}
        label={'Task description'}
        placeholder={'Buy milk, eggs, bread, etc.'}
        onChangeText={setTaskSubTitle}
        value={taskSubTitle}
      />
      <Dialog.Actions>
        <Dialog.Button title="Cancel" onPress={onBackPress} />
        <Dialog.Button
          title="Submit"
          onPress={() => createTask(generalData, taskData, callbackObj)}
        />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
});
