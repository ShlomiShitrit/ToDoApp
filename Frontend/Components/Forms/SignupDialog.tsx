import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Dialog} from '@rneui/themed';
import SignupForm from './SignupForm';
import {IUser, SignupDialogProps} from '../../general/interfaces';

export default function SignupDialog({
  open,
  onBackPress,
}: SignupDialogProps): JSX.Element {
  const [data, setData] = useState<IUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dataHandler = useCallback((newData: IUser) => {
    setData(newData);
  }, []);

  const submitHandler = () => {
    fetch('http://192.168.1.173:8080/api/User', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(err => console.log(err));
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
