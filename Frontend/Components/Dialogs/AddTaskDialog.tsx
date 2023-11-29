import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Input, Button} from '@rneui/themed';
import {AddTaskDialogProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {createTask} from '../../general/api';
import {
  postOrPutTaskObj,
  createTaskDataObj,
  createTaskObjCallback,
} from '../../general/types';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const userToken = useAppSelector(state => state.user.token);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };
  console.log(date);

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
    taskDate: date.toISOString(),
  };

  const callbackObj: createTaskObjCallback = {
    setTaskTitle,
    setTaskSubTitle,
    onUpdate,
    onBackPress,
  };

  const showDatepicker = () => {
    setShowPicker(true);
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
      <Button
        containerStyle={styles.button}
        onPress={showDatepicker}
        title="Add date"
      />
      {showPicker ? (
        <DateTimePicker
          value={date}
          mode="date"
          minimumDate={new Date(2023, 11, 29)}
          maximumDate={new Date(2050, 11, 29)}
          positiveButton={{label: 'Confirm', textColor: 'green'}}
          negativeButton={{label: 'Cancel', textColor: 'red'}}
          onChange={onChange}
        />
      ) : null}
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
  button: {
    marginTop: '5%',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
