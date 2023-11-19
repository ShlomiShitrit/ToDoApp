import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@rneui/themed';
import {SignupFormProps} from '../../general/interfaces';

export default function SignupForm({
  dataHandler,
}: SignupFormProps): JSX.Element {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    dataHandler({firstName, lastName, email, password});
  }, [firstName, lastName, email, password, dataHandler]);

  return (
    <>
      <Input
        labelStyle={styles.label}
        label="First Name"
        inputStyle={styles.input}
        placeholder="John"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        labelStyle={styles.label}
        label="Last Name"
        inputStyle={styles.input}
        placeholder="Doe"
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        labelStyle={styles.label}
        label="Email"
        inputStyle={styles.input}
        placeholder="JohnDoe@gmail.com"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        labelStyle={styles.label}
        label="Password"
        inputStyle={styles.input}
        placeholder="guest123"
        value={password}
        onChangeText={setPassword}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
  },
  input: {
    height: 1,
  },
});
