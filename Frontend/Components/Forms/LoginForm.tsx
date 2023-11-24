import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from '@rneui/themed';
import {useAppDispatch, useAppSelector} from '../../hooks/store';
import {userAction} from '../../store/userSlice';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const userToken = useAppSelector(state => state.user.token);
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    try {
      const response = await fetch('http://192.168.1.173:8080/api/Auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      const token = await response.text();
      dispatch(userAction.setToken(token));
      dispatch(userAction.setLoggedIn(true));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          'http://192.168.1.173:8080/api/User/userinfo',
          {
            headers: {Authorization: `Bearer ${userToken}`},
          },
        );
        const userInfo = await response.json();
        dispatch(userAction.setUser(userInfo));
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [userToken, dispatch]);

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
          onPress={loginUser}
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
