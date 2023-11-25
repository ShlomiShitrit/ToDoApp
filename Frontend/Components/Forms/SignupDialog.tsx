import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Dialog} from '@rneui/themed';
import SignupForm from './SignupForm';
import {IUser, SignupDialogProps} from '../../general/interfaces';
import {EMPTY_USER} from '../../general/resources';
import {API_HOST} from '@env';

export default function SignupDialog({
  open,
  onBackPress,
}: SignupDialogProps): JSX.Element {
  const [data, setData] = useState<IUser>(EMPTY_USER);

  const dataHandler = useCallback((newData: IUser) => {
    setData(newData);
  }, []);

  const submitHandler = async () => {
    try {
      const response = await fetch(`${API_HOST}api/User`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      const resData = response.json();
      console.log(resData);
    } catch (error) {
      // TODO: Add error handling
      console.log(error);
    }
    onBackPress();
  };
  return (
    <View>
      <Dialog isVisible={open} onBackdropPress={onBackPress}>
        <Dialog.Title title="Sign Up" />
        <SignupForm dataHandler={dataHandler} />
        <Dialog.Actions>
          <Dialog.Button title="Cancel" onPress={onBackPress} />
          <Dialog.Button title="Submit" onPress={submitHandler} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
