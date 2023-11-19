import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {useAppDispatch} from '../../hooks/store';
import {userAction} from '../../store/userSlice';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const fetchUserId = async () => {
    const response = await fetch(
      `http://192.168.1.173:8080/api/User/email/${email}`,
    );
    const userData = await response.json();
    dispatch(userAction.setUser(userData));
  };

  return (
    <>
      <View style={styles.container}>
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          containerStyle={styles.button}
          title="Login"
          onPress={fetchUserId}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: '10%',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
