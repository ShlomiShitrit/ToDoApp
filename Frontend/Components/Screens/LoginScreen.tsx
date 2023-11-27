import React, {useState} from 'react';
import {Text, Button} from '@rneui/themed';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import LoginForm from '../Forms/LoginForm';
import SignupDialog from '../Dialogs/SignupDialog';

export default function LoginScreen() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text h1 h1Style={styles.text}>
          Welcome!
        </Text>
        <Text h4 h4Style={styles.text}>
          Please Login
        </Text>
        <LoginForm />
        <Text h4 h4Style={styles.text2}>
          Don't have an account?
        </Text>
        <Button
          title="Sign up"
          containerStyle={styles.button}
          onPress={() => setOpen(true)}
        />
        <SignupDialog open={open} onBackPress={() => setOpen(false)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: '20%',
  },
  text: {
    textAlign: 'center',
    marginBottom: '10%',
  },
  text2: {
    textAlign: 'center',
    marginTop: '15%',
    fontSize: 20,
  },
  button: {
    marginTop: '10%',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 20,
  },
});
