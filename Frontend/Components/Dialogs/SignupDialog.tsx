import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {Dialog} from '@rneui/themed';
import SignupForm from '../Forms/SignupForm';
import {IUser, SignupDialogProps} from '../../general/interfaces';
import {EMPTY_USER} from '../../general/resources';
import {signupUser} from '../../general/api';

export default function SignupDialog({
  open,
  onBackPress,
}: SignupDialogProps): JSX.Element {
  const [data, setData] = useState<IUser>(EMPTY_USER);

  const dataHandler = useCallback((newData: IUser) => {
    setData(newData);
  }, []);

  return (
    <View>
      <Dialog isVisible={open} onBackdropPress={onBackPress}>
        <Dialog.Title title="Sign Up" />
        <SignupForm dataHandler={dataHandler} />
        <Dialog.Actions>
          <Dialog.Button title="Cancel" onPress={onBackPress} />
          <Dialog.Button
            title="Submit"
            onPress={() => signupUser(data, onBackPress)}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}
