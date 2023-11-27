import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Input} from '@rneui/themed';
import {AddTaskDialogProps} from '../../general/interfaces';
import {useAppSelector} from '../../hooks/store';
import {API_HOST} from '@env';

export default function AddTaskDialog({
  open,
  isSubCategory,
  onBackPress,
  onUpdate,
  category,
}: AddTaskDialogProps): JSX.Element {
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskSubTitle, setTaskSubTitle] = useState<string>('');

  const userToken = useAppSelector(state => state.user.token);

  const onSubmit = async () => {
    const url = isSubCategory
      ? `subcategory?subCategoryId=${category?.id}`
      : `category?categoryId=${category?.id}`;

    try {
      const response = await fetch(`${API_HOST}api/Task/${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          title: taskTitle,
          subTitle: taskSubTitle,
        }),
      });

      if (response.ok) {
        console.log('Task added successfully');
        setTaskTitle('');
        setTaskSubTitle('');
        onUpdate();
        onBackPress();
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('Error adding task: ');
      console.log(error);
    }
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
        <Dialog.Button title="Submit" onPress={onSubmit} />
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
});
