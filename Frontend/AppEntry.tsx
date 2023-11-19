import React, {useRef, useState} from 'react';
import {DrawerLayoutAndroid, StyleSheet} from 'react-native';
import {ThemeProvider, createTheme} from '@rneui/themed';
import Header from './Components/UI/Header';
import HomeScreen from './Components/Screens/HomeScreen';
import UserScreen from './Components/Screens/UserScreen';
import CategoriesScreen from './Components/Screens/CategoriesScreen';
import DrawerContent from './Components/UI/DrawerContent';
import {screens} from './general/types';
import LoginScreen from './Components/Screens/LoginScreen';
import {useAppSelector} from './hooks/store';

export default function AppEntry() {
  const [currentScreen, setCurrentScreen] = useState('Home' as screens);

  const isLoggedIn = useAppSelector(state => state.user.loggedIn);

  const drawer = useRef<DrawerLayoutAndroid>(null);

  const darkTheme = createTheme({
    mode: 'dark',
    lightColors: {
      primary: '#BB86FC',
      secondary: '#03DAC6',
    },
    darkColors: {
      primary: '#439ce0',
      secondary: '#aa49eb',
    },
    components: {
      Text: {
        style: {
          color: '#FFFFFF',
        },
      },
      Button: {
        containerStyle: {
          backgroundColor: '#BB86FC',
        },
        buttonStyle: {},
        titleStyle: {
          color: '#FFFFFF',
        },
      },
    },
  });

  const changeScreen = (screen: screens) => {
    setCurrentScreen(screen);
    drawer.current?.closeDrawer();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <DrawerLayoutAndroid
        style={styles.layout}
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={() => (
          <DrawerContent
            screenChanger={changeScreen}
            closeDrawer={() => drawer.current?.closeDrawer()}
          />
        )}>
        <Header openDrawer={() => drawer.current?.openDrawer()} />
        {isLoggedIn ? null : <LoginScreen />}
        {currentScreen === 'Home' && isLoggedIn ? <HomeScreen /> : null}
        {currentScreen === 'User' && isLoggedIn ? <UserScreen /> : null}
        {currentScreen === 'Categories' && isLoggedIn ? (
          <CategoriesScreen />
        ) : null}
      </DrawerLayoutAndroid>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: '#262c2e',
  },
});
